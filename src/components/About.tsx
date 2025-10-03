import { User } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          About Me
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo Placeholder */}
            <div className="relative group">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30 flex items-center justify-center overflow-hidden hover:border-primary/60 transition-all duration-300">
                <User className="w-32 h-32 text-muted-foreground/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <p className="text-muted-foreground text-sm">Your photo will go here</p>
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
            </div>

            {/* About Text */}
            <div className="space-y-6 animate-fade-in-up">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hello! I'm a passionate <span className="text-primary font-semibold">AI & Machine Learning enthusiast</span> with
                a strong foundation in web development. I love exploring the intersection of artificial intelligence and practical
                applications.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My journey in tech has been driven by curiosity and a desire to create intelligent solutions that make a
                difference. From building predictive models to crafting intuitive web experiences, I'm constantly learning and
                pushing boundaries.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring the latest AI research, contributing to open-source projects, or
                experimenting with new technologies.
              </p>

              <div className="flex gap-4 pt-4">
                <div className="flex-1 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
                  <p className="text-3xl font-bold text-primary">2+</p>
                  <p className="text-sm text-muted-foreground">Years Learning</p>
                </div>
                <div className="flex-1 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
                  <p className="text-3xl font-bold text-secondary">10+</p>
                  <p className="text-sm text-muted-foreground">Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
