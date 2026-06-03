import React, { useEffect, useRef, useState } from "react";

const BubbleCursor: React.FC = () => {
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Inject keyframes once
    if (!document.getElementById("warmCursorKeyframes")) {
      const style = document.createElement("style");
      style.id = "warmCursorKeyframes";
      style.innerHTML = `
        @keyframes ringPulse {
          0%,100% { transform: scale(1);   opacity: 0.55; }
          50%      { transform: scale(1.25); opacity: 0.28; }
        }
        @keyframes dotBreath {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.15); }
        }
      `;
      document.head.appendChild(style);
    }

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);

      // Dot follows exactly
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX - 4}px`;
        dotRef.current.style.top  = `${e.clientY - 4}px`;
      }
    };

    // Ring lags behind with lerp
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX - 16}px`;
        ringRef.current.style.top  = `${ringY - 16}px`;
      }
      raf = requestAnimationFrame(animate);
    };

    // Grow ring on hover over interactive elements
    const onEnterLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width  = "44px";
        ringRef.current.style.height = "44px";
        ringRef.current.style.borderColor = "hsl(38,80%,60%)";
        ringRef.current.style.opacity = "0.7";
      }
    };
    const onLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width  = "32px";
        ringRef.current.style.height = "32px";
        ringRef.current.style.borderColor = "hsl(340,55%,68%)";
        ringRef.current.style.opacity = "0.55";
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Attach to all interactive elements
    const attach = () => {
      document.querySelectorAll("a, button, [role=button]").forEach(el => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
    };
    attach();

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.querySelectorAll("a, button, [role=button]").forEach(el => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer:coarse)").matches) {
    return null; // Don't show on touch devices
  }

  return (
    <>
      {/* Dot — snaps exactly to cursor */}
      <div
        ref={dotRef}
        style={{
          position:      "fixed",
          width:         "8px",
          height:        "8px",
          borderRadius:  "50%",
          background:    "hsl(340,55%,68%)",
          pointerEvents: "none",
          zIndex:        9999,
          opacity:       visible ? 1 : 0,
          transition:    "opacity 0.3s",
          mixBlendMode:  "normal",
        }}
      />

      {/* Ring — lags behind with lerp */}
      <div
        ref={ringRef}
        style={{
          position:      "fixed",
          width:         "32px",
          height:        "32px",
          borderRadius:  "50%",
          border:        "1.5px solid hsl(340,55%,68%)",
          pointerEvents: "none",
          zIndex:        9998,
          opacity:       visible ? 0.55 : 0,
          transition:    "opacity 0.3s, width 0.2s, height 0.2s, border-color 0.2s",
          animation:     "ringPulse 2.2s ease-in-out infinite",
        }}
      />
    </>
  );
};

export default BubbleCursor;
