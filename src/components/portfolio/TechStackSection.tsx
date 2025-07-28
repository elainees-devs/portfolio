// src/components/portfolio/TechStackSection.tsx
import { Card } from "@/components/ui/card";

const TechStackSection = () => {
  const techStack = {
    "Languages": {
      icon: "🧠",
      techs: ["JavaScript", "TypeScript", "Python (learning)"]
    },
    "Frontend": {
      icon: "🧱",
      techs: ["React.js", "TailwindCSS", "HTML/CSS", "Responsive Design"]
    },
    "Backend": {
      icon: "🧰",
      techs: ["Node.js", "Express.js", "REST APIs", "Authentication"]
    },
    "Database": {
      icon: "🗃️",
      techs: ["MongoDB", "Mongoose", "Data Modeling"]
    },
    "Tools": {
      icon: "🔧",
      techs: ["Git", "GitHub", "VS Code", "Postman", "npm/yarn"]
    },
    "Learning": {
      icon: "☁️",
      techs: ["Docker", "AWS", "Django", "CI/CD", "Microservices"]
    }
  };

  return (
    <section id="tech-stack" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">My Tech Stack</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Object.entries(techStack).map(([category, { icon, techs }], index) => (
            <Card 
              key={category} 
              className="p-6 bg-card-gradient shadow-card hover:shadow-elegant transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">{icon}</div>
                <h3 className="text-xl font-semibold text-foreground">{category}</h3>
              </div>
              
              <div className="space-y-2">
                {techs.map((tech) => (
                  <div 
                    key={tech}
                    className="px-3 py-2 bg-tech-badge text-tech-badge-foreground rounded-lg text-center text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground">
            Always exploring new technologies and best practices to stay current in the ever-evolving world of web development.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;