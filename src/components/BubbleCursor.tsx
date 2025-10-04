import React, { useEffect, useRef } from "react";

const BubbleCursor: React.FC = () => {
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.getElementById('bubblePulseKeyframes')) {
      const style = document.createElement('style');
      style.id = 'bubblePulseKeyframes';
      style.innerHTML = `@keyframes bubblePulse {
        0% { transform: scale(1.1); box-shadow: 0 0 30px 10px #a78bfa44; }
        50% { transform: scale(0.8); box-shadow: 0 0 40px 20px #a78bfa66; }
        100% { transform: scale(1.1); box-shadow: 0 0 30px 10px #a78bfa44; }
      }`;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (bubbleRef.current) {
        bubbleRef.current.style.left = `${e.clientX - 20}px`;
        bubbleRef.current.style.top = `${e.clientY - 20}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={bubbleRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 48,
        height: 48,
        pointerEvents: "none",
        zIndex: 9999,
        transition: "left 0.1s, top 0.1s",
      }}
    >
      {/* Subtle hollow animated ring */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "2px solid #a78bfa88",
          boxSizing: "border-box",
          opacity: 0.22,
          animation: "bubblePulse 1.4s infinite cubic-bezier(.4,0,.6,1)",
        }}
      />
      {/* Small subtle bubble at top left inside ring */}
      <div
        style={{
          position: "absolute",
          left: 8,
          top: 8,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #4f8cff 40%, #a78bfa 60%, #d946ef 100%)",
          boxShadow: "0 0 6px 2px #a78bfa44",
          opacity: 0.55,
        }}
      />
    </div>
  );
};

export default BubbleCursor;
