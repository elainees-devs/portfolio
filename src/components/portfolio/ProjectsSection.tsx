// src/components/portfolio/ProjectsSection.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Users, Shield, Smartphone, Calendar } from "lucide-react";
import edusynxPreview from "@/assets/edusynx-preview.jpg";
import blueCirclePreview from "@/assets/blue-circle-preview.jpg";

const ProjectsSection = () => {
  const projects = [
    {
      title: "EduSynx",
      description: "A comprehensive multi-role school platform for admin, teachers, principals, accountants and parents.",
      longDescription: "EduSynx streamlines school management with role-based dashboards, student tracking, grade management, and parent communication tools.",
      image: edusynxPreview,
      features: [
        "Multi-role authentication system",
        "Real-time dashboards for each role",
        "Student management & tracking",
        "Grade book & report generation",
        "Parent-teacher communication"
      ],
      tech: ["React", "Node.js", "Express", "MongoDB", "JWT Auth"],
      github: "https://github.com/jane/edusynx",
      demo: "https://edusynx-demo.vercel.app",
      status: "In Development",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Blue Circle",
      description: "A mobile-first application for ordering clean drinking water with location tracking.",
      longDescription: "Simplifying water delivery with user-friendly ordering, real-time tracking, and seamless payment integration.",
      image: blueCirclePreview,
      features: [
        "Mobile-responsive design",
        "Order management system",
        "Location-based services",
        "Payment integration (planned)",
        "Delivery tracking (planned)"
      ],
      tech: ["React Native", "Express API", "MongoDB", "Maps API"],
      github: "https://github.com/jane/blue-circle",
      demo: null,
      status: "Work in Progress",
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      title: "Portfolio Website",
      description: "This responsive portfolio website showcasing my projects and skills.",
      longDescription: "Built with modern web technologies, featuring smooth animations, responsive design, and optimized performance.",
      image: null,
      features: [
        "Responsive design",
        "Smooth animations",
        "Modern UI/UX",
        "Performance optimized",
        "SEO friendly"
      ],
      tech: ["React", "TypeScript", "TailwindCSS", "Vite"],
      github: "https://github.com/jane/portfolio",
      demo: "https://jane-portfolio.vercel.app",
      status: "Live",
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-accent text-accent-foreground';
      case 'In Development': return 'bg-primary text-primary-foreground';
      case 'Work in Progress': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section id="projects" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real applications that showcase my development skills and problem-solving approach
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <Card 
              key={project.title} 
              className="overflow-hidden bg-card-gradient shadow-card hover:shadow-elegant transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative bg-muted">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={`${project.title} preview`}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-64 md:h-full flex items-center justify-center bg-hero-gradient">
                      <div className="text-white text-6xl opacity-80">
                        {project.icon}
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getStatusColor(project.status)} font-medium`}>
                      {project.status}
                    </Badge>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-primary">
                      {project.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.longDescription}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Key Features:</h4>
                    <ul className="space-y-1">
                      {project.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    {project.demo && (
                      <Button variant="portfolio" size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            More projects coming soon! I'm constantly building and learning.
          </p>
          <Button variant="outline" asChild>
            <a href="https://github.com/jane" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              View All on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;