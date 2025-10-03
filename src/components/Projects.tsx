import { ExternalLink, Github, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Projects = () => {
  const projects = [
    {
      title: "AI Prediction Model",
      description:
        "Machine learning model for predictive analytics using Python and scikit-learn. Achieved 92% accuracy on test data.",
      category: "Machine Learning",
      tags: ["Python", "ML", "Data Science"],
      github: "#",
      demo: "#",
    },
    {
      title: "Chatbot Assistant",
      description:
        "Intelligent conversational AI chatbot with natural language processing capabilities. Built with NLP libraries.",
      category: "Artificial Intelligence",
      tags: ["Python", "NLP", "AI"],
      github: "#",
      demo: "#",
    },
    {
      title: "Data Visualization Dashboard",
      description:
        "Interactive web dashboard for visualizing complex datasets with real-time updates and insights.",
      category: "Data Analysis",
      tags: ["JavaScript", "D3.js", "Python"],
      github: "#",
      demo: "#",
    },
    {
      title: "Portfolio Website",
      description: "Responsive personal portfolio website built with modern web technologies and best practices.",
      category: "Web Development",
      tags: ["HTML", "CSS", "JavaScript"],
      github: "#",
      demo: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p className="text-center text-muted-foreground mb-4 max-w-2xl mx-auto">
          Projects are under development. Below are some of my ongoing and planned works in AI, ML, and web development.
        </p>
        <p className="text-center text-primary font-semibold mb-8">More projects and details coming soon!</p>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(190,100%,50%,0.2)] animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Related Project Image + Placeholder */}
              <div className="flex flex-col items-center">
                {/* Related image for each project (replace src with your actual images) */}
                {/* No placeholder image, only icon and overlay */}
                <div className="aspect-video w-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <Image className="w-16 h-16 text-muted-foreground/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </div>
                  {/* Removed 'Project image will go here' text */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80"></div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button variant="default" size="sm" className="flex-1" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
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
