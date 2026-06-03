import { useEffect, useRef } from "react";

/* ── Skill data grouped by domain ── */
const groups = [
  {
    label: "Languages",
    color: "hsl(340,55%,68%)",
    items: [
      { name: "Python",      note: "Primary language for ML" },
      { name: "JavaScript",  note: "ES6+ / frontend logic" },
      { name: "SQL",         note: "Oracle certified" },
      { name: "HTML / CSS",  note: "Semantic & responsive" },
      { name: "C",           note: "Fundamentals & DSA" },
    ],
  },
  {
    label: "AI / ML",
    color: "hsl(38,80%,60%)",
    items: [
      { name: "scikit-learn",    note: "Classification & regression" },
      { name: "TensorFlow",      note: "Deep learning basics" },
      { name: "Pandas",          note: "Data manipulation" },
      { name: "NumPy",           note: "Numerical computing" },
      { name: "Matplotlib",      note: "Data visualisation" },
      { name: "NLP Basics",      note: "Text processing & models" },
    ],
  },
  {
    label: "Tools & Tech",
    color: "hsl(172,38%,52%)",
    items: [
      { name: "React + TypeScript", note: "Component-driven UI" },
      { name: "Git / GitHub",       note: "Version control" },
      { name: "Supabase",           note: "Backend as a service" },
      { name: "Jupyter Notebook",   note: "Exploratory analysis" },
      { name: "VS Code",            note: "Primary editor" },
      { name: "Figma (basics)",     note: "UI wireframing" },
    ],
  },
];

const Skills = () => {
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
      id="skills"
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
            02 / Skills
          </span>
        </div>

        {/* Heading */}
        <div className="max-w-xl mb-16 reveal" style={{ transitionDelay: "0.05s" }}>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
              lineHeight: 1.12,
              color: "hsl(36,25%,93%)",
            }}
          >
            A growing{" "}
            <em style={{ color: "hsl(38,80%,60%)" }}>toolkit</em>,
            <br />
            built through{" "}
            <em style={{ color: "hsl(340,55%,68%)" }}>real projects.</em>
          </h2>
        </div>

        {/* 3 columns — one per domain */}
        <div className="grid md:grid-cols-3 gap-12">
          {groups.map((group, gi) => (
            <div
              key={group.label}
              className="reveal"
              style={{ transitionDelay: `${0.08 + gi * 0.08}s` }}
            >
              {/* Domain header */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: group.color }}
                />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: group.color,
                  }}
                >
                  {group.label}
                </span>
              </div>

              {/* Skill list */}
              <div className="flex flex-col gap-2">
                {group.items.map((item, ii) => (
                  <div
                    key={item.name}
                    className="skill-item"
                    style={{
                      animationDelay: `${ii * 0.04}s`,
                    }}
                  >
                    {/* Colour dot */}
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: group.color, opacity: 0.7 }}
                    />
                    <div>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.88rem",
                          fontWeight: 600,
                          color: "hsl(36,25%,88%)",
                          lineHeight: 1.2,
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.7rem",
                          color: "hsl(30,10%,50%)",
                          marginTop: "0.15rem",
                        }}
                      >
                        {item.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
