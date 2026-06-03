import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Volume2, VolumeX, Mic, MicOff, Trash2, Gauge } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

/* ─── Types ─────────────────────────────────────────────── */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

interface SpeechState {
  fullText: string;
  charIndex: number;
  isPaused: boolean;
  msgId: string;
}

/* ─── Quick reply chips ──────────────────────────────────── */
const ALL_CHIPS = [
  "Tell me about Shreya's projects 🚀",
  "What are her top skills? 💻",
  "How can I contact her? 📩",
  "Her educational background 🎓",
  "What is she currently working on? 🔬",
  "Tell me about her AI/ML work 🤖",
  "Any internship experience? 🏢",
  "What makes Shreya stand out? ✨",
];

/* ─── Inline style helpers ───────────────────────────────── */
const iconBtn = (active = false, danger = false): React.CSSProperties => ({
  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
  background: active ? "hsl(340,40%,20%)" : danger ? "hsl(0,45%,18%)" : "transparent",
  border: `1px solid ${active ? "hsl(340,40%,35%)" : danger ? "hsl(0,40%,28%)" : "hsl(340,15%,22%)"}`,
  color: danger ? "hsl(0,60%,62%)" : "hsl(340,30%,58%)",
  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
  transition: "background .15s, border-color .15s",
});

const sendBtn = (active: boolean): React.CSSProperties => ({
  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
  background: active ? "hsl(340,55%,44%)" : "hsl(20,12%,18%)",
  border: `1.5px solid ${active ? "hsl(340,55%,58%)" : "hsl(20,12%,28%)"}`,
  cursor: active ? "pointer" : "not-allowed",
  display: "flex", alignItems: "center", justifyContent: "center",
  transition: "background .2s, border-color .2s",
});

/* ═══════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════ */
const Chatbot = () => {
  /* state */
  const [isOpen,          setIsOpen]          = useState(false);
  const [messages,        setMessages]        = useState<Message[]>([{
    id: "aria-0", role: "assistant", timestamp: new Date(),
    content: "Hi! I'm Aria 🌸 — Shreya's personal AI assistant. Ask me anything about her projects, skills, or how to reach her!",
  }]);
  const [input,           setInput]           = useState("");
  const [isLoading,       setIsLoading]       = useState(false);
  const [isSpeaking,      setIsSpeaking]      = useState(false);
  const [voiceEnabled,    setVoiceEnabled]    = useState(true);
  const [isListening,     setIsListening]     = useState(false);
  const [speechRate,      setSpeechRate]      = useState(0.9);
  const [showSpeed,       setShowSpeed]       = useState(false);
  const [speakingMsgId,   setSpeakingMsgId]   = useState<string | null>(null);
  const [speakingChar,    setSpeakingChar]    = useState(0);
  const [chips,           setChips]           = useState(ALL_CHIPS.slice(0, 3));

  /* refs */
  const recognitionRef  = useRef<any>(null);
  const synthRef        = useRef<SpeechSynthesis | null>(null);
  const utteranceRef    = useRef<SpeechSynthesisUtterance | null>(null);
  const speechState     = useRef<SpeechState>({ fullText: "", charIndex: 0, isPaused: false, msgId: "" });
  const pendingMsgRef   = useRef<{ text: string; msgId: string } | null>(null); // latest answer while muted
  const voiceEnabledRef = useRef(true);
  const speechRateRef   = useRef(0.9);
  const scrollEnd       = useRef<HTMLDivElement>(null);
  const { toast }       = useToast();

  /* sync refs */
  useEffect(() => { voiceEnabledRef.current = voiceEnabled; }, [voiceEnabled]);
  useEffect(() => { speechRateRef.current   = speechRate;   }, [speechRate]);

  /* ── Inject keyframes once ─────────────────────────────── */
  useEffect(() => {
    if (document.getElementById("aria-kf")) return;
    const s = document.createElement("style");
    s.id = "aria-kf";
    s.innerHTML = `
      @keyframes ariaBar   { 0%,100%{height:5px} 50%{height:18px} }
      @keyframes ariaIn    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      @keyframes ariaScale { from{opacity:0;transform:scale(.88)} to{opacity:1;transform:scale(1)} }
      @keyframes ariaGlow  { 0%,100%{box-shadow:0 0 0 3px hsl(340,55%,68%,.18)} 50%{box-shadow:0 0 0 7px hsl(340,55%,68%,.38)} }
      @keyframes ariaBlink { 0%,100%{opacity:1} 50%{opacity:0} }
      .aria-bar  { display:inline-block;width:3px;border-radius:3px;background:hsl(340,55%,68%);animation:ariaBar .65s ease-in-out infinite }
      .aria-in   { animation:ariaIn .28s ease forwards }
      .aria-win  { animation:ariaScale .22s cubic-bezier(.34,1.56,.64,1) forwards }
      .aria-glow { animation:ariaGlow 1.1s ease-in-out infinite }
      .aria-hl   { background:hsl(340,55%,68%,.26);border-radius:3px;padding:0 2px }
      .aria-cur::after { content:"|";animation:ariaBlink .8s step-end infinite;color:hsl(340,55%,68%);margin-left:1px }
      .aria-scroll::-webkit-scrollbar{width:3px}
      .aria-scroll::-webkit-scrollbar-thumb{background:hsl(340,30%,28%);border-radius:4px}
      .aria-chip:hover{background:hsl(340,35%,20%) !important}
    `;
    document.head.appendChild(s);
  }, []);

  /* ── Init speech APIs ──────────────────────────────────── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SR = (window as any).webkitSpeechRecognition ?? (window as any).SpeechRecognition;
      const rec = new SR();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";
      rec.onresult = (e: any) => {
        let transcript = "";
        for (let i = e.resultIndex; i < e.results.length; i++) transcript += e.results[i][0].transcript;
        setInput(transcript);
        if (e.results[e.results.length - 1].isFinal) {
          setIsListening(false);
          setTimeout(() => sendMessage(transcript), 300);
        }
      };
      rec.onerror = () => {
        setIsListening(false);
        toast({ title: "Voice Error", description: "Could not recognise speech.", variant: "destructive" });
      };
      rec.onend = () => setIsListening(false);
      recognitionRef.current = rec;
    }
    if (window.speechSynthesis) synthRef.current = window.speechSynthesis;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* auto-scroll */
  useEffect(() => { scrollEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isLoading]);

  /* ── Core speak ────────────────────────────────────────── */
  const speakFrom = useCallback((text: string, msgId: string) => {
    if (!synthRef.current || !text.trim()) return;
    synthRef.current.cancel();

    const utt = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utt;

    const voices = synthRef.current.getVoices();
    const best = voices.find(v =>
      ["samantha","karen","victoria","zira","female"].some(k => v.name.toLowerCase().includes(k))
    ) ?? voices.find(v => v.name.toLowerCase().includes("google"));
    if (best) utt.voice = best;
    utt.rate   = speechRateRef.current;
    utt.pitch  = 1.1;
    utt.volume = 1;

    utt.onboundary = (e: SpeechSynthesisEvent) => {
      if (e.name === "word") {
        speechState.current.charIndex = e.charIndex;
        setSpeakingChar(e.charIndex);
      }
    };
    utt.onstart = () => { setIsSpeaking(true);  setSpeakingMsgId(msgId); };
    utt.onend   = () => { setIsSpeaking(false); setSpeakingMsgId(null); setSpeakingChar(0); speechState.current.isPaused = false; utteranceRef.current = null; };
    utt.onerror = () => { setIsSpeaking(false); setSpeakingMsgId(null); utteranceRef.current = null; };

    setIsSpeaking(true);
    setSpeakingMsgId(msgId);
    synthRef.current.speak(utt);
  }, []);

  const speak = useCallback((text: string, msgId: string) => {
    speechState.current = { fullText: text, charIndex: 0, isPaused: false, msgId };
    setSpeakingChar(0);
    speakFrom(text, msgId);
  }, [speakFrom]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    synthRef.current?.cancel();
    utteranceRef.current = null;
    setIsSpeaking(false);
    setSpeakingMsgId(null);
    setSpeakingChar(0);
  }, []);

  /* ── Mute / Unmute with resume ─────────────────────────── */
  const handleMuteToggle = useCallback(() => {
    const turningOff = voiceEnabledRef.current;
    setVoiceEnabled(v => !v);

    if (turningOff) {
      /* muting — save position and stop */
      speechState.current.isPaused = isSpeaking;
      stopSpeaking();
    } else {
      /* unmuting — play pending NEW answer first; fall back to resume old */
      const pending = pendingMsgRef.current;
      if (pending) {
        /* a new answer arrived while muted — speak it from scratch */
        pendingMsgRef.current = null;
        speechState.current = { fullText: pending.text, charIndex: 0, isPaused: false, msgId: pending.msgId };
        setTimeout(() => speakFrom(pending.text, pending.msgId), 150);
      } else {
        /* no new answer — resume old paused position */
        const st = speechState.current;
        if (st.isPaused && st.fullText) {
          const remaining = st.fullText.slice(st.charIndex).trim();
          st.isPaused = false;
          if (remaining) setTimeout(() => speakFrom(remaining, st.msgId), 150);
        }
      }
    }
  }, [isSpeaking, stopSpeaking, speakFrom]);

  /* ── Stream Aria's reply word-by-word ──────────────────── */
  const streamReply = useCallback((text: string, msgId: string) => {
    const words = text.split(" ");
    let built = "";
    words.forEach((w, i) => {
      setTimeout(() => {
        built += (i > 0 ? " " : "") + w;
        const streaming = i < words.length - 1;
        setMessages(prev => prev.map(m =>
          m.id === msgId ? { ...m, content: built, isStreaming: streaming } : m
        ));
        if (!streaming) {
          /* streaming done → speak if voice on; else queue as pending */
          if (voiceEnabledRef.current) {
            setTimeout(() => speak(text, msgId), 180);
          } else {
            /* voice is muted — save as pending so unmute plays THIS answer */
            pendingMsgRef.current = { text, msgId };
          }
          /* refresh chips avoiding repeats */
          const lower = text.toLowerCase();
          const filtered = ALL_CHIPS.filter(c => {
            if (lower.includes("project") && c.includes("project")) return false;
            if (lower.includes("skill")   && c.includes("skill"))   return false;
            if (lower.includes("contact") && c.includes("contact")) return false;
            return true;
          });
          setChips(filtered.slice(0, 3));
        }
      }, i * 52);
    });
  }, [speak]);

  /* ── Send message ──────────────────────────────────────── */
  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    stopSpeaking();
    // Clear both saved resume position AND any pending queued answer
    speechState.current  = { fullText: "", charIndex: 0, isPaused: false, msgId: "" };
    pendingMsgRef.current = null;

    const uid = `u-${Date.now()}`;
    const aid = `a-${Date.now()}`;

    setMessages(prev => [
      ...prev,
      { id: uid, role: "user",      content: trimmed, timestamp: new Date() },
      { id: aid, role: "assistant", content: "",       timestamp: new Date(), isStreaming: true },
    ]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat-with-aria", {
        body: {
          message: trimmed,
          history: messages.map(m => ({ role: m.role, content: m.content })),
        },
      });
      if (error) throw error;
      setIsLoading(false);
      streamReply(data.response as string, aid);
    } catch (err) {
      console.error("Aria error:", err);
      setMessages(prev => prev.filter(m => m.id !== aid));
      toast({ title: "Error", description: "Failed to get response. Try again.", variant: "destructive" });
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, messages, stopSpeaking, streamReply, toast]);

  /* ── Render message text with word highlight ───────────── */
  const renderContent = (msg: Message) => {
    const text = msg.content;
    const speaking = msg.id === speakingMsgId && isSpeaking;

    if (!speaking) return <span className={msg.isStreaming ? "aria-cur" : ""}>{text}</span>;

    const before = text.slice(0, speakingChar);
    const rest   = text.slice(speakingChar);
    const wEnd   = rest.search(/[\s]|$/);
    const word   = rest.slice(0, wEnd < 0 ? rest.length : wEnd);
    const after  = rest.slice(word.length);
    return (
      <span>
        {before}<span className="aria-hl">{word}</span>{after}
      </span>
    );
  };

  const fmt = (d: Date) => d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

  const clearChat = () => {
    stopSpeaking();
    setMessages([{ id: "aria-0", role: "assistant", timestamp: new Date(),
      content: "Chat cleared! I'm Aria 🌸. What would you like to know about Shreya?" }]);
    setChips(ALL_CHIPS.slice(0, 3));
  };

  /* ══════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════ */
  return (
    <>
      {/* ── Floating trigger ──────────────────────────── */}
      {!isOpen && (
        <button
          id="aria-trigger"
          onClick={() => setIsOpen(true)}
          title="Chat with Aria"
          style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 9990,
            width: 58, height: 58, borderRadius: "50%",
            background: "hsl(340,55%,36%)",
            border: "2.5px solid hsl(340,55%,55%)",
            boxShadow: "0 6px 28px hsl(340,55%,20%,.55)",
            cursor: "pointer", fontSize: 28, lineHeight: 1,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "transform .2s, box-shadow .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.14)"; e.currentTarget.style.boxShadow = "0 8px 36px hsl(340,55%,25%,.7)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)";    e.currentTarget.style.boxShadow = "0 6px 28px hsl(340,55%,20%,.55)"; }}
        >
          👩‍💻
        </button>
      )}

      {/* ── Chat window ───────────────────────────────── */}
      {isOpen && (
        <div
          className="aria-win"
          style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 9990,
            width: "min(93vw, 408px)", height: 585,
            background: "hsl(20,12%,8%)",
            border: "1px solid hsl(340,25%,18%)",
            borderRadius: 22,
            boxShadow: "0 28px 90px hsl(0,0%,0%,.65), 0 0 0 1px hsl(340,20%,14%)",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {/* ── Header ──────────────────────────────── */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "13px 15px", flexShrink: 0,
            background: "hsl(20,12%,10%)",
            borderBottom: "1px solid hsl(340,18%,16%)",
          }}>
            {/* Avatar + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                className={isSpeaking ? "aria-glow" : ""}
                style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "hsl(340,40%,16%)",
                  border: "2px solid hsl(340,50%,32%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, flexShrink: 0,
                  transition: "box-shadow .3s",
                }}
              >
                🌸
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "hsl(30,55%,86%)" }}>Aria</span>
                  {/* Waveform when speaking */}
                  {isSpeaking && (
                    <div style={{ display: "flex", alignItems: "center", gap: 2, height: 20 }}>
                      {[0, .14, .28, .10, .22].map((d, i) => (
                        <span key={i} className="aria-bar" style={{ animationDelay: `${d}s` }} />
                      ))}
                    </div>
                  )}
                </div>
                <span style={{ fontSize: 11, color: "hsl(340,25%,50%)" }}>
                  {isSpeaking ? "Speaking…" : isLoading ? "Thinking…" : "Shreya's AI Assistant"}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", gap: 4 }}>
              <button style={iconBtn(showSpeed)} title="Speech speed" onClick={() => setShowSpeed(p => !p)}>
                <Gauge size={14} />
              </button>
              <button style={iconBtn(false, !voiceEnabled)} title={voiceEnabled ? "Mute (saves position)" : "Unmute & Resume"} onClick={handleMuteToggle}>
                {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              </button>
              <button style={iconBtn()} title="Clear chat" onClick={clearChat}>
                <Trash2 size={13} />
              </button>
              <button style={iconBtn()} title="Close" onClick={() => { setIsOpen(false); stopSpeaking(); }}>
                <X size={14} />
              </button>
            </div>
          </div>

          {/* ── Speed slider ────────────────────────── */}
          {showSpeed && (
            <div style={{
              padding: "9px 16px", flexShrink: 0,
              background: "hsl(20,12%,10%)",
              borderBottom: "1px solid hsl(340,15%,15%)",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ fontSize: 12, color: "hsl(340,25%,52%)", whiteSpace: "nowrap" }}>Speed</span>
              <input type="range" min={0.5} max={2} step={0.1} value={speechRate}
                onChange={e => setSpeechRate(+e.target.value)}
                style={{ flex: 1, accentColor: "hsl(340,55%,60%)" }} />
              <span style={{ fontSize: 12, color: "hsl(30,55%,80%)", minWidth: 30 }}>{speechRate}×</span>
            </div>
          )}

          {/* ── Messages ────────────────────────────── */}
          <div
            className="aria-scroll"
            style={{ flex: 1, overflowY: "auto", padding: "14px 14px 4px", display: "flex", flexDirection: "column", gap: 12 }}
          >
            {messages.map(msg => (
              <div
                key={msg.id}
                className="aria-in"
                style={{ display: "flex", flexDirection: msg.role === "user" ? "row-reverse" : "row", alignItems: "flex-end", gap: 7 }}
              >
                {msg.role === "assistant" && (
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: "hsl(340,40%,14%)", border: "1.5px solid hsl(340,38%,26%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 15, flexShrink: 0,
                  }}>🌸</div>
                )}

                <div style={{ maxWidth: "78%", display: "flex", flexDirection: "column", gap: 3, alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  {/* Bubble */}
                  <div
                    title="Click to copy"
                    onClick={() => navigator.clipboard.writeText(msg.content).then(() =>
                      toast({ title: "✓ Copied", description: "Message copied." })
                    )}
                    style={{
                      padding: "9px 13px", cursor: "pointer",
                      borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      background: msg.role === "user"
                        ? "hsl(340,50%,34%)"
                        : msg.id === speakingMsgId && isSpeaking
                          ? "hsl(20,15%,14%)"
                          : "hsl(20,12%,13%)",
                      border: msg.role === "assistant"
                        ? `1px solid ${msg.id === speakingMsgId && isSpeaking ? "hsl(340,55%,40%)" : "hsl(20,12%,20%)"}`
                        : "none",
                      boxShadow: msg.id === speakingMsgId && isSpeaking ? "0 0 14px hsl(340,55%,38%,.22)" : "none",
                      transition: "background .3s, border-color .3s, box-shadow .3s",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.58, whiteSpace: "pre-wrap", wordBreak: "break-word",
                      color: msg.role === "user" ? "hsl(30,60%,93%)" : "hsl(30,35%,78%)" }}>
                      {renderContent(msg)}
                    </p>
                  </div>
                  {/* Timestamp */}
                  <span style={{ fontSize: 10, color: "hsl(340,12%,38%)", padding: "0 4px" }}>
                    {fmt(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {/* Thinking dots */}
            {isLoading && (
              <div className="aria-in" style={{ display: "flex", alignItems: "flex-end", gap: 7 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "hsl(340,40%,14%)", border: "1.5px solid hsl(340,38%,26%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🌸</div>
                <div style={{ padding: "11px 14px", borderRadius: "18px 18px 18px 4px", background: "hsl(20,12%,13%)", border: "1px solid hsl(20,12%,20%)", display: "flex", gap: 5, alignItems: "center" }}>
                  {[0, .2, .4].map((d, i) => (
                    <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(340,45%,52%)", display: "inline-block", animation: `ariaBar .9s ${d}s ease-in-out infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={scrollEnd} />
          </div>

          {/* ── Quick reply chips ────────────────────── */}
          <div style={{
            padding: "8px 12px 5px", flexShrink: 0,
            borderTop: "1px solid hsl(340,12%,14%)",
            background: "hsl(20,12%,9%)",
            display: "flex", gap: 6, flexWrap: "wrap",
          }}>
            {chips.map((c, i) => (
              <button
                key={i}
                className="aria-chip"
                onClick={() => sendMessage(c.replace(/\p{Emoji}/gu, "").trim())}
                style={{
                  fontSize: 11, padding: "4px 10px", borderRadius: 20,
                  background: "hsl(340,28%,14%)",
                  border: "1px solid hsl(340,28%,22%)",
                  color: "hsl(340,38%,65%)",
                  cursor: "pointer", whiteSpace: "nowrap",
                  transition: "background .18s",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* ── Input area ──────────────────────────── */}
          <div style={{
            padding: "10px 12px 12px", flexShrink: 0,
            borderTop: "1px solid hsl(340,12%,14%)",
            background: "hsl(20,12%,9%)",
          }}>
            <form
              onSubmit={e => { e.preventDefault(); sendMessage(input); }}
              style={{ display: "flex", gap: 7, alignItems: "center" }}
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={isListening ? "🎤 Listening…" : "Ask about Shreya…"}
                disabled={isLoading}
                style={{
                  flex: 1, padding: "9px 14px", borderRadius: 12,
                  background: "hsl(20,12%,13%)",
                  border: `1.5px solid ${isListening ? "hsl(340,55%,52%)" : "hsl(20,12%,22%)"}`,
                  color: "hsl(30,55%,86%)", fontSize: 13, outline: "none",
                  transition: "border-color .2s",
                  boxSizing: "border-box",
                }}
                onFocus={e => { if (!isListening) e.currentTarget.style.borderColor = "hsl(340,38%,38%)"; }}
                onBlur={e =>  { if (!isListening) e.currentTarget.style.borderColor = "hsl(20,12%,22%)"; }}
              />
              {/* Mic button */}
              <button
                type="button"
                title={isListening ? "Stop" : "Speak"}
                disabled={isLoading}
                onClick={() => {
                  if (isListening) { recognitionRef.current?.stop(); setIsListening(false); }
                  else if (recognitionRef.current) { setIsListening(true); recognitionRef.current.start(); }
                  else toast({ title: "Not supported", description: "Use Chrome for voice input.", variant: "destructive" });
                }}
                style={{
                  ...sendBtn(true),
                  background: isListening ? "hsl(340,65%,36%)" : "hsl(20,12%,17%)",
                  border: `1.5px solid ${isListening ? "hsl(340,55%,52%)" : "hsl(20,12%,28%)"}`,
                }}
              >
                {isListening ? <MicOff size={15} color="hsl(340,80%,82%)" /> : <Mic size={15} color="hsl(340,28%,52%)" />}
              </button>
              {/* Send button */}
              <button type="submit" disabled={isLoading || !input.trim()} style={sendBtn(!!input.trim())}>
                <Send size={14} color={input.trim() ? "hsl(30,60%,93%)" : "hsl(340,15%,38%)"} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;