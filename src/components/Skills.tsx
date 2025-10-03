import { Brain, Database, Code, TrendingUp, Cpu, Globe } from "lucide-react";

const Skills = () => {
  const skills = [
    {
      icon: Brain,
      title: "Artificial Intelligence",
      description: "Building intelligent systems and exploring AI applications",
      color: "from-primary to-primary/50",
    },
    {
      icon: Cpu,
      title: "Machine Learning",
      description: "Developing predictive models and ML algorithms",
      color: "from-secondary to-secondary/50",
    },
    {
      icon: TrendingUp,
      title: "Deep Learning Basics",
      description: "Neural networks and deep learning fundamentals",
      color: "from-primary to-secondary",
    },
    {
      icon: Database,
      title: "Data Analysis",
      description: "Extracting insights from complex datasets",
      color: "from-secondary to-primary",
    },
    {
      icon: Code,
      title: "Python",
      description: "Core language for AI/ML development",
      color: "from-primary to-primary/50",
    },
    {
      icon: Globe,
      title: "Web Development",
      description: "HTML, CSS, JavaScript for modern web applications",
      color: "from-secondary to-secondary/50",
    },
  ];

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Skills & Expertise
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A blend of AI/ML knowledge and web development skills to create intelligent, user-friendly solutions
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <div
              key={skill.title}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(190,100%,50%,0.2)] animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <skill.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{skill.title}</h3>
              <p className="text-muted-foreground">{skill.description}</p>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
