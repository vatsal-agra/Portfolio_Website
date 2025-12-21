import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, User, Code, FolderOpen, Send } from 'lucide-react';

const roles = [
  'AI/ML Enthusiast',
  'Problem Solver',
  'Future Innovator',
  'Code Craftsman',
];

const floatingIcons = [
  { icon: User, label: 'About', to: '/about', position: 'top-[15%] left-[10%]', delay: '0s' },
  { icon: Code, label: 'Skills', to: '/skills', position: 'top-[20%] right-[12%]', delay: '0.5s' },
  { icon: FolderOpen, label: 'Projects', to: '/projects', position: 'bottom-[25%] left-[8%]', delay: '1s' },
  { icon: Send, label: 'Contact', to: '/contact', position: 'bottom-[20%] right-[10%]', delay: '1.5s' },
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
    <section className="h-full flex items-center justify-center relative">
      {/* Gradient Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent blur-3xl animate-pulse-glow pointer-events-none" />

      {/* Floating Navigation Icons */}
      {floatingIcons.map(({ icon: Icon, label, to, position, delay }) => (
        <Link
          key={label}
          to={to}
          className={`absolute ${position} group z-20`}
          style={{ animationDelay: delay }}
        >
          <div className="relative animate-float" style={{ animationDelay: delay }}>
            <div className="p-4 md:p-5 rounded-2xl glass border border-primary/30 hover:border-primary hover:bg-primary/20 transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-primary/25 cursor-pointer">
              <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs md:text-sm font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {label}
            </span>
          </div>
        </Link>
      ))}

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Greeting */}
          <p className="text-primary font-mono text-sm md:text-base mb-4 animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            {'<Hello World />'}
          </p>

          {/* Name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-slide-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            I'm{' '}
            <span className="text-gradient">Vatsal Agrawal</span>
          </h1>

          {/* Typing Effect */}
          <div className="h-10 md:h-12 flex items-center justify-center mb-6">
            <span className="text-lg md:text-2xl text-muted-foreground font-light">
              {displayText}
              <span className="inline-block w-0.5 h-5 md:h-6 bg-primary ml-1 animate-typing-cursor" />
            </span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            Sophomore at <span className="text-foreground font-medium">VIT Chennai</span> pursuing B.Tech in CSE with specialization in{' '}
            <span className="text-primary font-medium">AI & Machine Learning</span>.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 animate-fade-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
