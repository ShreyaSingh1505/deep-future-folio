
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { useEffect, useState } from "react";

const typewriterTexts = [
  "AI & Machine Learning Enthusiast | Web Developer",
  "Building the future, one project at a time",
  "Transforming ideas into intelligent solutions"
];

const Hero = () => {
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Lazy loading for hero background image for performance */}
      <img src={heroBg} alt="Hero Background" loading="lazy" style={{display: 'none'}} />
      <div className="container mx-auto px-4 py-20 text-center relative z-10 animate-fade-in md:px-8 md:py-24 sm:px-2 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
            <span style={{lineHeight: 1.2, paddingBottom: '0.25em', display: 'inline-block', overflow: 'visible'}}>Shreya Singh</span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-4 font-semibold">
            AI & Machine Learning Enthusiast | Web Developer
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transforming ideas into intelligent solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button variant="hero" size="lg" onClick={scrollToProjects} className="group">
              View My Work
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glowOutline" size="lg">
              <Download className="mr-2" />
              Download Resume
            </Button>
          </div>
          <div className="flex gap-4 justify-center text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-glow-pulse"></span>
              Available for opportunities
            </span>
          </div>
        </div>
      </div>
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse"></div>
    </section>
  );
}

export default Hero;
