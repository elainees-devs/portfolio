// src/components/portfolio/HeroSection.tsx
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import heroWorkspace from "@/assets/hero-workspace.jpg";

const HeroSection = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${heroWorkspace})` }}
      />
      <div className="absolute inset-0 bg-hero-gradient opacity-5" />
      
      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-in-up">
          <div className="mb-6">
            <span className="text-lg text-muted-foreground">Hi, I'm</span>
            <h1 className="text-6xl md:text-7xl font-bold bg-hero-gradient bg-clip-text text-transparent mb-2">
              Jane Lenny
            </h1>
            <div className="text-xl md:text-2xl text-muted-foreground mb-2">
              Aspiring Full-Stack Developer
            </div>
            <div className="text-lg text-primary font-medium">
              MERN Stack Enthusiast
            </div>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            🔨 I build responsive web apps with <span className="text-primary font-medium">MongoDB</span>, 
            <span className="text-primary font-medium"> Express</span>, 
            <span className="text-primary font-medium"> React</span>, and 
            <span className="text-primary font-medium"> Node.js</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={scrollToProjects}
              className="text-lg px-8 py-3"
            >
              View My Projects
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={scrollToContact}
              className="text-lg px-8 py-3"
            >
              Contact Me
            </Button>
          </div>

          <div className="flex justify-center gap-6 mb-8">
            <a 
              href="https://github.com" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://linkedin.com" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="mailto:jane@example.com" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <ArrowDown size={24} className="text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;