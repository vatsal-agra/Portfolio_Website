import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

const roles = [
  'AI/ML Enthusiast',
  'Problem Solver',
  'Future Innovator',
  'Code Craftsman',
];

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section className="h-full flex items-center justify-center">
      {/* Gradient Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent blur-3xl animate-pulse-glow pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <p className="text-primary font-mono text-sm md:text-base mb-4 animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            {'<Hello World />'}
          </p>

          {/* Name */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 animate-slide-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            I'm{' '}
            <span className="text-gradient">Vatsal Agrawal</span>
          </h1>

          {/* Typing Effect */}
          <div className="h-12 md:h-16 flex items-center justify-center mb-8">
            <span className="text-xl md:text-3xl text-muted-foreground font-light">
              {displayText}
              <span className="inline-block w-0.5 h-6 md:h-8 bg-primary ml-1 animate-typing-cursor" />
            </span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 animate-fade-in opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            Sophomore at <span className="text-foreground font-medium">VIT Chennai</span> pursuing B.Tech in CSE with specialization in{' '}
            <span className="text-primary font-medium">AI & Machine Learning</span>. Building the future, one line of code at a time.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mb-12 animate-fade-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:bg-primary/20 transition-all duration-300 group"
            >
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:bg-primary/20 transition-all duration-300 group"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="mailto:vatsal@example.com"
              className="p-3 rounded-full glass hover:bg-primary/20 transition-all duration-300 group"
            >
              <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
            <Link
              to="/projects"
              className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
            >
              Explore My Work
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 glass font-medium rounded-full hover:bg-muted/50 transition-all duration-300 border border-border/50"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
