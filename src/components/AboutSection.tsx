import { useEffect, useRef, useState } from 'react';
import { Brain, Code, Lightbulb, Rocket } from 'lucide-react';

const stats = [
  { value: '2nd', label: 'Year Student', icon: Rocket },
  { value: '10+', label: 'Projects Built', icon: Code },
  { value: '5+', label: 'Tech Stacks', icon: Brain },
  { value: '∞', label: 'Ideas to Build', icon: Lightbulb },
];

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 relative"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-primary font-mono text-sm">{'// About Me'}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            The <span className="text-gradient">Story</span> So Far
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hey there! I'm <span className="text-foreground font-semibold">Vatsal Agrawal</span>, a passionate tech enthusiast currently navigating my sophomore year at{' '}
              <span className="text-primary">VIT Chennai</span>.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm pursuing my B.Tech in Computer Science with a specialization in{' '}
              <span className="text-secondary">Artificial Intelligence & Machine Learning</span>. The intersection of intelligent systems and practical applications is where I love to explore and create.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not training models or debugging code, you'll find me exploring new technologies, contributing to open source, or brainstorming the next big idea that could make a difference.
            </p>

            <div className="pt-4">
              <span className="font-mono text-sm text-primary">{'> Currently learning:'}</span>
              <p className="text-muted-foreground mt-2">
                Deep Learning, Computer Vision, Natural Language Processing, and Full-Stack Development
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-6 text-center group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
