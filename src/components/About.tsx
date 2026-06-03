import { useEffect, useRef } from "react";
import shreyaImg from "@/assets/shreya.jpeg";

const About = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle("revealed", e.isIntersecting)),
      { threshold: 0.12 }
    );
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="py-28 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Section marker row */}
        <div className="flex items-center gap-3 mb-16 reveal">
          <span className="section-rule" />
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ fontFamily: "'DM Sans',sans-serif", color: "hsl(340,55%,68%)" }}
          >
            01 / About
          </span>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">

          {/* ── Left: big serif heading + portrait on mobile ── */}
          <div className="reveal" style={{ transitionDelay: "0.05s" }}>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                lineHeight: 1.1,
                color: "hsl(36,25%,93%)",
                marginBottom: "2rem",
              }}
            >
              The person
              <br />
              <em style={{ color: "hsl(340,55%,68%)" }}>behind the code.</em>
            </h2>

            {/* Mobile portrait */}
            <div className="lg:hidden mb-8">
              <img
                src={shreyaImg}
                alt="Shreya Singh"
                style={{
                  width: "180px",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "4px",
                  border: "1px solid hsl(20,8%,22%)",
                }}
              />
            </div>

            {/* Highlight stats — minimal, no card boxes */}
            <div
              className="grid grid-cols-3 gap-0 mt-2"
              style={{ borderTop: "1px solid hsl(20,8%,18%)" }}
            >
              {[
                { val: "4+",     sub: "Repositories" },
                { val: "3+",      sub: "Certifications" },
                { val: "SIH",    sub: "Hackathon '25" },
              ].map(s => (
                <div
                  key={s.sub}
                  className="py-5 pr-4"
                  style={{ borderBottom: "1px solid hsl(20,8%,18%)" }}
                >
                  <p
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "2rem",
                      color: "hsl(340,55%,68%)",
                      lineHeight: 1,
                    }}
                  >
                    {s.val}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      color: "hsl(30,10%,52%)",
                      marginTop: "0.3rem",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {s.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: bio text ── */}
          <div
            className="reveal"
            style={{ transitionDelay: "0.12s" }}
          >
            <p
              className="leading-relaxed mb-5"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.05rem",
                color: "hsl(30,10%,68%)",
              }}
            >
              Hello! I'm a{" "}
              <strong style={{ color: "hsl(36,25%,88%)", fontWeight: 500 }}>
                B.Tech CSE student at NIET, Greater Noida
              </strong>{" "}
              with a deep interest in artificial intelligence and machine learning.
              I love building things that think — from chatbots to predictive models.
            </p>
            <p
              className="leading-relaxed mb-5"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.05rem",
                color: "hsl(30,10%,68%)",
              }}
            >
              My approach blends technical rigour with a human-centric perspective.
              I don't just train models — I think about{" "}
              <em style={{ color: "hsl(36,25%,85%)" }}>why</em> they work and{" "}
              <em style={{ color: "hsl(36,25%,85%)" }}>who</em> they serve. That's
              what drives me toward real-world, impactful AI.
            </p>
            <p
              className="leading-relaxed mb-10"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.05rem",
                color: "hsl(30,10%,68%)",
              }}
            >
              When I'm not coding, I'm reading ML research, participating in
              hackathons like{" "}
              <strong style={{ color: "hsl(38,80%,62%)", fontWeight: 500 }}>
                Smart India Hackathon
              </strong>
              , or competitive coding — where I finished{" "}
              <strong style={{ color: "hsl(38,80%,62%)", fontWeight: 500 }}>
                Top 10 at NIET's 2025 Coding Challenge.
              </strong>
            </p>

            {/* Subtle tag row */}
            <div className="flex flex-wrap gap-2">
              {["Oracle SQL Certified", "SIH 2025 Participant", "Top 10 Coder", "AI/ML Focus"].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
