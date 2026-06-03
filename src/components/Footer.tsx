import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative py-12 border-t"
      style={{ borderColor: "hsl(20,8%,16%)" }}
    >
      {/* Warm gradient rule at very top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(340,55%,55%) 30%, hsl(38,80%,55%) 70%, transparent 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div>
            <p
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "1.4rem",
                color: "hsl(36,25%,90%)",
              }}
            >
              shreya<span style={{ color: "hsl(340,55%,68%)" }}>.</span>
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                color: "hsl(30,10%,42%)",
                marginTop: "0.3rem",
              }}
            >
              Built with React + TypeScript &amp; a lot of chai ☕
            </p>
          </div>

          {/* Social links — icons only */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ShreyaSingh1505"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="GitHub"
            >
              <Github style={{ width: "1rem", height: "1rem" }} />
            </a>
            <a
              href="https://www.linkedin.com/in/shreya-singh-8ab20b311/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="LinkedIn"
            >
              <Linkedin style={{ width: "1rem", height: "1rem" }} />
            </a>
            <a
              href="mailto:singhshreya1505@gmail.com"
              className="social-btn"
              aria-label="Email"
            >
              <Mail style={{ width: "1rem", height: "1rem" }} />
            </a>
          </div>

          {/* Copyright + Back to top */}
          <div className="flex items-center gap-4">
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                color: "hsl(30,10%,40%)",
              }}
            >
              © {new Date().getFullYear()} Shreya Singh
            </p>
            <button
              onClick={scrollTop}
              className="social-btn"
              aria-label="Back to top"
            >
              <ArrowUp style={{ width: "1rem", height: "1rem" }} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
