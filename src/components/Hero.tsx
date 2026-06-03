import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import shreyaImg from "@/assets/shreya.jpeg";

const ROLES = [
  "AI & ML Enthusiast",
  "Web Developer",
  "B.Tech CSE, NIET '28",
  "Oracle SQL Certified",
];

function useTypewriter(words: string[], typeSpeed = 65, pause = 2000) {
  const [text, setText] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [del, setDel]   = useState(false);

  useEffect(() => {
    const cur = words[wIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!del && cIdx < cur.length)
      t = setTimeout(() => setCIdx(c => c + 1), typeSpeed);
    else if (!del)
      t = setTimeout(() => setDel(true), pause);
    else if (del && cIdx > 0)
      t = setTimeout(() => setCIdx(c => c - 1), typeSpeed / 2);
    else {
      setDel(false);
      setWIdx(i => (i + 1) % words.length);
    }
    setText(cur.slice(0, cIdx));
    return () => clearTimeout(t);
  }, [cIdx, del, wIdx, words, typeSpeed, pause]);

  return text;
}

const Hero = () => {
  const role = useTypewriter(ROLES);

  const go = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">

      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(20,8%,20%) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
          opacity: 0.35,
        }}
      />

      {/* Warm colour wash — bottom right only */}
      <div
        className="absolute bottom-0 right-0 w-[60vw] h-[60vh] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom right, hsl(340,55%,55%,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">

          {/* ══ LEFT — Text content ══ */}
          <div className="animate-fade-up">

            {/* Section marker */}
            <div className="flex items-center gap-3 mb-8">
              <span className="section-rule" />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ fontFamily: "'DM Sans',sans-serif", color: "hsl(340,55%,68%)" }}
              >
                Portfolio
              </span>
            </div>

            {/* Name — huge serif display */}
            <h1
              className="font-serif leading-[1.05] mb-5"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(3.2rem, 7vw, 6rem)",
                color: "hsl(36,25%,93%)",
              }}
            >
              Shreya
              <br />
              <span
                style={{
                  fontStyle: "italic",
                  color: "hsl(340,55%,68%)",
                }}
              >
                Singh
              </span>
            </h1>

            {/* Typewriter role */}
            <div className="flex items-center gap-2 mb-6 h-7">
              <span
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "1.05rem",
                  fontWeight: 500,
                  color: "hsl(38,80%,60%)",
                }}
              >
                {role}
              </span>
              <span
                className="inline-block w-0.5 h-5 align-middle animate-pulse"
                style={{ background: "hsl(38,80%,60%)" }}
              />
            </div>

            {/* Bio */}
            <p
              className="leading-relaxed mb-10 max-w-lg"
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "1rem",
                color: "hsl(30,10%,58%)",
              }}
            >
              Pursuing B.Tech in Computer Science &amp; Engineering at{" "}
              <strong style={{ color: "hsl(36,25%,80%)", fontWeight: 500 }}>
                NIET, Greater Noida
              </strong>
              . Deeply interested in machine learning, building AI-powered
              applications, and turning data into meaningful insights.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button onClick={() => go("#projects")} className="btn-primary">
                View My Work
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Shreya_Singh_Resume.pdf"
                className="btn-outline"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>

            {/* Social icons — no email text */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/ShreyaSingh1505"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="GitHub"
              >
                <Github className="w-4.5 h-4.5" style={{ width: "1.1rem", height: "1.1rem" }} />
              </a>
              <a
                href="https://www.linkedin.com/in/shreya-singh-8ab20b311/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4.5 h-4.5" style={{ width: "1.1rem", height: "1.1rem" }} />
              </a>
              <a
                href="mailto:singhshreya1505@gmail.com"
                className="social-btn"
                aria-label="Email"
              >
                <Mail className="w-4.5 h-4.5" style={{ width: "1.1rem", height: "1.1rem" }} />
              </a>
              <div
                className="ml-1 h-px w-12"
                style={{ background: "hsl(20,8%,22%)" }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "hsl(30,10%,40%)",
                }}
              >
                Let's connect
              </span>
            </div>
          </div>

          {/* ══ RIGHT — Portrait ══ */}
          <div
            className="hidden lg:block animate-fade-in relative"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Frame: thin warm border, slight rotation on outer container */}
            <div
              className="relative"
              style={{ width: "320px" }}
            >
              {/* Decorative bracket lines */}
              <div
                className="absolute -top-4 -left-4 w-10 h-10 border-t-2 border-l-2"
                style={{ borderColor: "hsl(340,55%,55%)" }}
              />
              <div
                className="absolute -bottom-4 -right-4 w-10 h-10 border-b-2 border-r-2"
                style={{ borderColor: "hsl(38,80%,55%)" }}
              />

              {/* Photo */}
              <div
                className="overflow-hidden"
                style={{
                  borderRadius: "4px",
                  border: "1px solid hsl(20,8%,22%)",
                  aspectRatio: "3/4",
                }}
              >
                <img
                  src={shreyaImg}
                  alt="Shreya Singh"
                  className="w-full h-full object-cover"
                  style={{ filter: "contrast(1.03) saturate(0.92)" }}
                />
              </div>

              {/* Label beneath photo */}
              <div
                className="mt-4 px-1 flex items-center justify-between"
              >
                <div>
                  <p
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "0.9rem",
                      color: "hsl(36,25%,85%)",
                    }}
                  >
                    Shreya Singh
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.7rem",
                      color: "hsl(30,10%,50%)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    CSE · NIET, Greater Noida
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "hsl(340,55%,62%)",
                    background: "hsl(340,55%,68%,0.1)",
                    border: "1px solid hsl(340,55%,40%,0.4)",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "3px",
                  }}
                >
                  Open to work
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-6 flex flex-col items-center gap-2 opacity-40"
          style={{ writingMode: "vertical-lr" }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "hsl(30,10%,50%)",
            }}
          >
            Scroll
          </span>
          <div
            className="w-px h-12"
            style={{ background: "linear-gradient(to bottom, hsl(20,8%,30%), transparent)" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
