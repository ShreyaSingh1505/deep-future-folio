import { useEffect, useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    num:    "01",
    title:  "Women Safety Crime Analytics",
    desc:   "A machine learning dashboard that analyses crime pattern data to surface insights relevant to women's safety. Built with Python, pandas, and visualisation libraries.",
    tags:   ["Python", "ML", "pandas", "Data Viz"],
    cat:    "Machine Learning",
    github: "https://github.com/ShreyaSingh1505",
    demo:   null,
  },
  {
    num:    "02",
    title:  "Aria — AI Chatbot Assistant",
    desc:   "Full-stack conversational AI with voice input, NLP capabilities, and real-time context memory. Frontend in React/TypeScript, backend powered by Supabase edge functions.",
    tags:   ["React", "TypeScript", "NLP", "Supabase"],
    cat:    "Artificial Intelligence",
    github: "https://github.com/ShreyaSingh1505/deep-future-folio",
    demo:   "https://shreya-memento.vercel.app/",
  },
  {
    num:    "03",
    title:  "AI Prediction Model",
    desc:   "Supervised learning model for predictive analytics trained on real-world datasets. Explores classification and regression approaches using scikit-learn.",
    tags:   ["Python", "scikit-learn", "ML"],
    cat:    "Machine Learning",
    github: "https://github.com/ShreyaSingh1505",
    demo:   null,
  },
  {
    num:    "04",
    title:  "Portfolio Website",
    desc:   "This site — built with React, TypeScript, and TailwindCSS. Features an embedded AI chatbot (Aria), animated UI, direct resume download, and Supabase contact backend.",
    tags:   ["React", "TypeScript", "Tailwind", "Vercel"],
    cat:    "Web Development",
    github: "https://github.com/ShreyaSingh1505/deep-future-folio",
    demo:   "https://shreya-memento.vercel.app/",
  },
];

const Projects = () => {
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
    <section id="projects" className="py-28" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Section marker */}
        <div className="flex items-center gap-3 mb-6 reveal">
          <span className="section-rule" />
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ fontFamily: "'DM Sans',sans-serif", color: "hsl(340,55%,68%)" }}
          >
            03 / Projects
          </span>
        </div>

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4 reveal" style={{ transitionDelay: "0.05s" }}>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
              lineHeight: 1.12,
              color: "hsl(36,25%,93%)",
            }}
          >
            Selected{" "}
            <em style={{ color: "hsl(340,55%,68%)" }}>work.</em>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.88rem",
              color: "hsl(30,10%,52%)",
              maxWidth: "320px",
            }}
          >
            Projects across ML, AI, and web — more in progress.
          </p>
        </div>

        {/* Project list — editorial numbered list style */}
        <div className="flex flex-col gap-0">
          {projects.map((p, i) => (
            <div
              key={p.num}
              className="project-card mb-4 reveal"
              style={{ transitionDelay: `${0.08 + i * 0.07}s` }}
            >
              <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 items-start">

                {/* Number */}
                <span
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1rem",
                    color: "hsl(30,10%,35%)",
                    paddingTop: "0.15rem",
                    minWidth: "2rem",
                  }}
                >
                  {p.num}
                </span>

                {/* Main content */}
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "1.4rem",
                        color: "hsl(36,25%,93%)",
                        lineHeight: 1.2,
                      }}
                    >
                      {p.title}
                    </h3>
                    <span className="tag">{p.cat}</span>
                  </div>

                  <p
                    className="mb-4"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: "hsl(30,10%,56%)",
                      lineHeight: 1.65,
                      maxWidth: "560px",
                    }}
                  >
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-2 pt-0.5">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="GitHub"
                  >
                    <Github style={{ width: "1rem", height: "1rem" }} />
                  </a>
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn"
                      aria-label="Live demo"
                    >
                      <ExternalLink style={{ width: "1rem", height: "1rem" }} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
