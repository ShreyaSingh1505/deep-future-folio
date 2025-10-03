import { GraduationCap, Briefcase } from "lucide-react";

const Experience = () => {
  const timeline = [
    {
      type: "education",
      title: "B. Tech in Computer Science and Engineering",
      organization: "Noida Institute of Engineering and Technology (NIET), Greater Noida",
      period: "2024 - 2028",
      description: "Currently pursuing B. Tech in Computer Science and Engineering. Key coursework includes Data Structures, Algorithms, Artificial Intelligence, Machine Learning, and Web Development. Active member of coding clubs and hackathons. Achievements: Top 10 in NIET Coding Challenge 2025, participated in Smart India Hackathon.",
      icon: GraduationCap,
      highlight: true,
    },
    {
      type: "experience",
      title: "Fresher",
      organization: "No professional experience yet",
      period: "2024 - Present",
      description: "Currently focused on learning, building projects, and participating in hackathons and coding competitions.",
      icon: Briefcase,
    },
  ];

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Education & Experience
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Dedicated to building a strong foundation in computer science, engineering principles, and real-world problem solving through academic excellence and hands-on projects.
        </p>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary"></div>

          {timeline.map((item, index) => (
            <div
              key={index}
              className={`relative mb-12 animate-fade-in-up ${
                index % 2 === 0 ? "md:pr-[50%] md:pl-0" : "md:pl-[50%] md:pr-0"
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${
                  item.type === "education" ? "from-primary to-primary" : "from-secondary to-secondary"
                } transform -translate-x-1/2 border-4 border-background animate-glow-pulse`}
              ></div>

              {/* Content card */}
              <div
                className={`ml-20 md:ml-0 ${
                  index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                } p-6 rounded-2xl bg-card border border-border transition-all duration-300 group ${item.highlight ? "border-2 border-primary shadow-lg" : "hover:border-primary/50 hover:shadow-[0_0_30px_hsl(190,100%,50%,0.2)]"} ${item.title === "Fresher" ? "pb-8" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      item.type === "education" ? "bg-primary/20" : "bg-secondary/20"
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon
                      className={`w-6 h-6 ${item.type === "education" ? "text-primary" : "text-secondary"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-primary font-medium mb-1">{item.period}</p>
                    <h3 className="text-xl font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-muted-foreground font-medium mb-2">{item.organization}</p>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
