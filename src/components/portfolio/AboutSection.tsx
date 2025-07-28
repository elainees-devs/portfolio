// src/components/portfolio/AboutSection.tsx
import { Card } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building the future, one line of code at a time
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-card-gradient shadow-elegant">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-primary">My Journey</h3>
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    I'm a <span className="font-medium text-foreground">self-taught full stack developer</span> passionate 
                    about building practical web solutions that make a difference.
                  </p>
                  <p>
                    Currently rebuilding <span className="font-medium text-primary">EduSynx</span>, a comprehensive 
                    school platform, while expanding my skills in <span className="font-medium text-accent">DevOps</span> and 
                    <span className="font-medium text-accent"> Django</span>.
                  </p>
                  <p>
                    My focus is on creating <span className="font-medium text-foreground">scalable systems</span> and 
                    delivering exceptional user experiences through clean, maintainable code.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-foreground">What I'm Learning</h4>
                  <div className="flex flex-wrap gap-2">
                    {['ALX Program', 'GoMyCode', 'DevOps', 'Docker', 'AWS', 'Django'].map((item) => (
                      <span 
                        key={item}
                        className="px-3 py-1 bg-tech-badge text-tech-badge-foreground rounded-full text-sm font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3 text-foreground">Core Values</h4>
                  <ul className="space-y-2">
                    {[
                      'Clean, readable code',
                      'User-centered design',
                      'Continuous learning',
                      'Collaborative problem-solving'
                    ].map((value) => (
                      <li key={value} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;