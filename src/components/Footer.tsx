import { Heart, Mail, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            © {new Date().getFullYear()} Shreya Singh. Built with{" "}
            <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" /> and passion
          </p>
          <div className="flex gap-6 items-center">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About</a>
            <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors text-sm">Projects</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</a>
            <span className="flex gap-3 ml-4">
              <a href="mailto:singhshreya1505@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://github.com/ShreyaSingh1505" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/shreya-singh-8ab20b311/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary">
                <Linkedin className="w-5 h-5" />
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
