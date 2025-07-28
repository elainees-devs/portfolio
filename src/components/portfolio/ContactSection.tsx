// src/components/portfolio/ContactSection.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "jane@example.com",
      href: "mailto:jane@example.com"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/jane-lenny",
      href: "https://linkedin.com/in/jane-lenny"
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      value: "github.com/jane",
      href: "https://github.com/jane"
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Build Something Great</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate? I'm always excited to work on interesting projects and connect with fellow developers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Get in Touch</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Whether you're looking for a developer, have a project in mind, or just want to connect, 
                I'd love to hear from you. Let's discuss how we can work together to create something amazing.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((contact) => (
                <Card key={contact.label} className="p-4 bg-card-gradient shadow-card hover:shadow-elegant transition-all duration-300">
                  <a 
                    href={contact.href}
                    className="flex items-center gap-4 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="text-primary group-hover:text-accent transition-colors">
                      {contact.icon}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{contact.label}</div>
                      <div className="text-muted-foreground group-hover:text-primary transition-colors">
                        {contact.value}
                      </div>
                    </div>
                  </a>
                </Card>
              ))}
            </div>

            <div className="pt-6">
              <h4 className="text-lg font-semibold mb-4 text-foreground">What I'm Looking For:</h4>
              <ul className="space-y-2">
                {[
                  'Entry-level or junior developer positions',
                  'Freelance web development projects',
                  'Open source collaboration opportunities',
                  'Mentorship and learning partnerships'
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-card-gradient shadow-elegant">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-foreground">Send a Message</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or just say hello!"
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" variant="hero" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;