import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";

const navItems = [
  { label: "About",     href: "#about" },
  { label: "Skills",    href: "#skills" },
  { label: "Projects",  href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact",   href: "#contact" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      let cur = "";
      navItems.forEach(item => {
        const el = document.querySelector(item.href);
        if (el && el.getBoundingClientRect().top <= 130) cur = item.href;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-[hsl(20,12%,7%)] border-b border-[hsl(20,8%,14%)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand — styled wordmark */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-serif text-xl tracking-tight"
          style={{ fontFamily: "'DM Serif Display', serif", color: "hsl(36,25%,93%)" }}
        >
          shreya<span style={{ color: "hsl(340,55%,68%)" }}>.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.label}
              onClick={() => go(item.href)}
              className="relative text-sm font-medium transition-colors duration-200 group"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: active === item.href ? "hsl(340,55%,68%)" : "hsl(30,10%,60%)",
              }}
            >
              {item.label}
              <span
                className="absolute -bottom-0.5 left-0 h-px bg-[hsl(340,55%,68%)] transition-all duration-300 origin-left"
                style={{ width: active === item.href ? "100%" : "0%", display: "block" }}
              />
            </button>
          ))}
        </div>

        {/* Resume */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download="Shreya_Singh_Resume.pdf"
          className="hidden md:flex btn-primary text-xs py-2 px-5"
        >
          <Download className="w-3.5 h-3.5" />
          Resume
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[hsl(30,10%,60%)] hover:text-[hsl(36,25%,93%)] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${open ? "max-h-80 border-b border-[hsl(20,8%,14%)]" : "max-h-0"}`}
        style={{ background: "hsl(20,12%,7%)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
          {navItems.map(item => (
            <button
              key={item.label}
              onClick={() => go(item.href)}
              className="text-left px-3 py-3 text-sm font-medium rounded transition-colors"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: active === item.href ? "hsl(340,55%,68%)" : "hsl(30,10%,60%)",
                background: active === item.href ? "hsl(340,55%,68%,0.08)" : "transparent",
              }}
            >
              {item.label}
            </button>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Shreya_Singh_Resume.pdf"
            className="btn-primary justify-center mt-3 text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            Download Resume
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
