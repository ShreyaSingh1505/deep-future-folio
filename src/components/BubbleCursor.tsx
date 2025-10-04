import { useEffect, useRef } from "react";

const BubbleCursor: React.FC = () => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!document.getElementById('bubbleCursorKeyframes')) {
      const style = document.createElement('style');
      style.id = 'bubbleCursorKeyframes';
      style.innerHTML = `
        @keyframes bubbleFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.05); }
        }
        @keyframes bubbleGlow {
          0%, 100% { 
            box-shadow: 0 0 20px 4px hsl(190, 100%, 50%, 0.6), 
                        0 0 40px 8px hsl(270, 80%, 60%, 0.4),
                        inset 0 0 20px hsl(190, 100%, 50%, 0.3);
          }
          50% { 
            box-shadow: 0 0 30px 8px hsl(190, 100%, 50%, 0.8), 
                        0 0 60px 12px hsl(270, 80%, 60%, 0.6),
                        inset 0 0 30px hsl(270, 80%, 60%, 0.4);
          }
        }
        @keyframes trailFade {
          0% { opacity: 0.6; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.3); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const trail: Array<{ x: number; y: number; timestamp: number }> = [];
    const maxTrailLength = 5;

    const handleMouseMove = (e: MouseEvent) => {
      if (bubbleRef.current) {
        bubbleRef.current.style.left = `${e.clientX}px`;
        bubbleRef.current.style.top = `${e.clientY}px`;
      }

      trail.push({ x: e.clientX, y: e.clientY, timestamp: Date.now() });
      if (trail.length > maxTrailLength) {
        trail.shift();
      }

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        trail.forEach((point, index) => {
          if (trailRefs.current[index]) {
            const opacity = (index + 1) / maxTrailLength;
            trailRefs.current[index].style.left = `${point.x}px`;
            trailRefs.current[index].style.top = `${point.y}px`;
            trailRefs.current[index].style.opacity = `${opacity * 0.4}`;
          }
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Trail bubbles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          style={{
            position: "fixed",
            left: -100,
            top: -100,
            width: 32 - i * 4,
            height: 32 - i * 4,
            pointerEvents: "none",
            zIndex: 9998,
            transform: "translate(-50%, -50%)",
            transition: "opacity 0.3s ease-out",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: `linear-gradient(135deg, 
                hsl(190, 100%, 50%, ${0.3 - i * 0.05}), 
                hsl(270, 80%, 60%, ${0.2 - i * 0.04}))`,
              filter: "blur(8px)",
            }}
          />
        </div>
      ))}

      {/* Main cursor bubble */}
      <div
        ref={bubbleRef}
        style={{
          position: "fixed",
          left: -100,
          top: -100,
          width: 56,
          height: 56,
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      >
        {/* Outer glow ring */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "120%",
            height: "120%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: "radial-gradient(circle, hsl(190, 100%, 50%, 0.3) 0%, transparent 70%)",
            animation: "bubbleFloat 2s ease-in-out infinite",
          }}
        />

        {/* Main bubble */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "100%",
            height: "100%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: "linear-gradient(135deg, hsl(190, 100%, 50%, 0.25), hsl(270, 80%, 60%, 0.25))",
            border: "2px solid hsl(190, 100%, 50%, 0.6)",
            backdropFilter: "blur(10px)",
            animation: "bubbleGlow 2s ease-in-out infinite",
          }}
        />

        {/* Inner highlight */}
        <div
          style={{
            position: "absolute",
            left: "28%",
            top: "28%",
            width: "35%",
            height: "35%",
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, hsl(190, 100%, 70%, 0.8), transparent)",
            filter: "blur(4px)",
          }}
        />

        {/* Center dot */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "20%",
            height: "20%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: "linear-gradient(135deg, hsl(190, 100%, 60%), hsl(270, 80%, 70%))",
            boxShadow: "0 0 10px hsl(190, 100%, 50%, 0.8)",
          }}
        />
      </div>
    </>
  );
};

export default BubbleCursor;
