// src/components/portfolio/Footer.tsx
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Jane Lenny</h3>
            <p className="text-background/80 max-w-md mx-auto">
              Full-Stack Developer passionate about creating impactful web solutions
            </p>
          </div>

          <div className="flex justify-center gap-6 mb-8">
            <a 
              href="https://github.com/jane" 
              className="text-background/70 hover:text-background transition-colors hover:scale-110 transform duration-200"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/jane-lenny" 
              className="text-background/70 hover:text-background transition-colors hover:scale-110 transform duration-200"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="mailto:jane@example.com" 
              className="text-background/70 hover:text-background transition-colors hover:scale-110 transform duration-200"
              aria-label="Email"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail size={24} />
            </a>
          </div>

          <div className="border-t border-background/20 pt-8">
            <p className="text-background/60 text-sm flex items-center justify-center gap-2">
              Built with <Heart size={16} className="text-red-400" /> using React, TypeScript & TailwindCSS
            </p>
            <p className="text-background/40 text-xs mt-2">
              © {currentYear} Jane Lenny. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;