import { useEffect, useRef } from "react";

/* ── Only 3 education entries as requested ── */
const education = [
  {
    period:   "2024 — 2028",
    degree:   "B.Tech — Computer Science & Engineering",
    inst:     "NIET, Greater Noida",
    detail:   "Core subjects: Data Structures, Algorithms, AI/ML, DBMS, Web Development. Active participant in coding clubs, hackathons, and competitive programming.",
    highlight: true,
  },
  {
    period:   "2023 — 2024",
    degree:   "Senior Secondary (Class XII)",
    inst:     "PCM + Computer Science",
    detail:   "Studied Physics, Chemistry, Mathematics and Computer Science as core subjects.",
    highlight: false,
  },
  {
    period:   "2021 — 2022",
    degree:   "Secondary (Class X)",
    inst:     "All Subjects",
    detail:   "Completed secondary education with a strong academic foundation.",
    highlight: false,
  },
];

/* ── Certifications ── */
const certifications = [
  { year: "Oct 2024", title: "Programming Fundamentals using Python",                         issuer: "Infosys Springboard",              credentialId: "" },
  { year: "Apr 2025", title: "Programming in C",                                               issuer: "Infosys Springboard",              credentialId: "" },
  { year: "Oct 2025", title: "New Oracle Academy Java for AP Computer Science A — English",   issuer: "Oracle",                           credentialId: "" },
  { year: "Dec 2025", title: "AI Tools Workshop",                                              issuer: "United Latino Students Association", credentialId: "0270772f-3809-4400-b29b-1e1c61cd0997888082" },
];

/* ── Achievements ── */
const achievements = [
  { year: "2025", text: "Smart India Hackathon — National Participant" },
  { year: "2025", text: "Top 10 — NIET Coding Challenge" },
];

const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle("revealed", e.isIntersecting)),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="education"
      className="py-28 relative"
      style={{ background: "hsl(20,10%,9%)" }}
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Section marker */}
        <div className="flex items-center gap-3 mb-6 reveal">
          <span className="section-rule" />
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ fontFamily: "'DM Sans',sans-serif", color: "hsl(340,55%,68%)" }}
          >
            04 / Education
          </span>
        </div>

        {/* Heading */}
        <h2
          className="mb-16 reveal"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
            lineHeight: 1.12,
            color: "hsl(36,25%,93%)",
            transitionDelay: "0.05s",
          }}
        >
          Academic{" "}
          <em style={{ color: "hsl(38,80%,60%)" }}>foundations.</em>
        </h2>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16">

          {/* ── Education timeline ── */}
          <div>
            <p
              className="mb-8"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "hsl(30,10%,45%)",
              }}
            >
              Qualifications
            </p>

            <div>
              {education.map((e, i) => (
                <div
                  key={e.degree}
                  className="edu-card reveal"
                  style={{ transitionDelay: `${0.08 + i * 0.08}s` }}
                >
                  {/* Year column */}
                  <div style={{ minWidth: "7rem" }}>
                    <span
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "0.85rem",
                        color: e.highlight ? "hsl(340,55%,68%)" : "hsl(30,10%,42%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {e.period}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "1.12rem",
                        color: "hsl(36,25%,90%)",
                        marginBottom: "0.25rem",
                        lineHeight: 1.25,
                      }}
                    >
                      {e.degree}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: e.highlight ? "hsl(38,80%,60%)" : "hsl(30,10%,50%)",
                        marginBottom: "0.5rem",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {e.inst}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.83rem",
                        color: "hsl(30,10%,52%)",
                        lineHeight: 1.6,
                      }}
                    >
                      {e.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column: Certifications + Achievements ── */}
          <div
            className="reveal"
            style={{ transitionDelay: "0.24s" }}
          >
            {/* Certifications */}
            <p
              className="mb-6"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "hsl(30,10%,45%)",
              }}
            >
              Certifications
            </p>

            <div className="flex flex-col gap-0" style={{ marginBottom: "2rem" }}>
              {certifications.map((c, i) => (
                <div
                  key={c.title}
                  className="flex gap-4 py-4"
                  style={{ borderBottom: "1px solid hsl(20,8%,16%)" }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "0.75rem",
                      color: "hsl(340,55%,55%)",
                      minWidth: "4.5rem",
                      paddingTop: "0.1rem",
                      flexShrink: 0,
                    }}
                  >
                    {c.year}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.88rem",
                        color: "hsl(36,25%,80%)",
                        lineHeight: 1.4,
                        marginBottom: "0.18rem",
                      }}
                    >
                      {c.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.72rem",
                        color: "hsl(30,10%,42%)",
                        letterSpacing: "0.02em",
                        marginBottom: c.credentialId ? "0.2rem" : "0",
                      }}
                    >
                      {c.issuer}
                    </p>
                    {c.credentialId && (
                      <p
                        style={{
                          fontFamily: "monospace",
                          fontSize: "0.62rem",
                          color: "hsl(30,10%,32%)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        ID: {c.credentialId}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <p
              className="mb-6"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "hsl(30,10%,45%)",
              }}
            >
              Highlights
            </p>

            <div className="flex flex-col gap-0">
              {achievements.map((a, i) => (
                <div
                  key={a.text}
                  className="flex gap-6 py-5"
                  style={{
                    borderBottom: "1px solid hsl(20,8%,16%)",
                    animationDelay: `${i * 0.07}s`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "0.85rem",
                      color: "hsl(340,55%,55%)",
                      minWidth: "3rem",
                    }}
                  >
                    {a.year}
                  </span>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.92rem",
                      color: "hsl(36,25%,80%)",
                      lineHeight: 1.4,
                    }}
                  >
                    {a.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Decorative quote */}
            <blockquote
              className="mt-12 pl-5 border-l-2"
              style={{ borderColor: "hsl(340,55%,55%)" }}
            >
              <p
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontStyle: "italic",
                  fontSize: "1.1rem",
                  color: "hsl(30,10%,55%)",
                  lineHeight: 1.5,
                }}
              >
                "Learning is not the filling of a pail,
                but the lighting of a fire."
              </p>
              <cite
                style={{
                  display: "block",
                  marginTop: "0.5rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.08em",
                  color: "hsl(30,10%,40%)",
                  textTransform: "uppercase",
                  fontStyle: "normal",
                }}
              >
                — W.B. Yeats
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
