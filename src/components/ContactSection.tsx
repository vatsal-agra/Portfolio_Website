import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, Twitter, Send, MapPin } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:vatsal@example.com', label: 'Email' },
];

const ContactSection = () => {
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
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 relative"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section Header */}
          <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-primary font-mono text-sm">{'// Contact'}</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
          </div>

          {/* Location */}
          <div className={`flex items-center justify-center gap-2 mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Chennai, India</span>
          </div>

          {/* Social Links */}
          <div className={`flex justify-center gap-4 mb-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 glass rounded-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {social.label}
                </span>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a
              href="mailto:vatsal@example.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 group"
            >
              <span>Let's Build Something Together</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Email */}
          <p className={`mt-8 font-mono text-sm text-muted-foreground transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            or reach me at{' '}
            <a href="mailto:vatsal@example.com" className="text-primary hover:underline">
              vatsal@example.com
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className={`mt-24 text-center transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="border-t border-border pt-8">
          <p className="text-muted-foreground text-sm">
            Designed & Built by{' '}
            <span className="text-primary">Vatsal Agrawal</span>
          </p>
          <p className="text-muted-foreground text-xs mt-2 font-mono">
            © {new Date().getFullYear()} // Made with 💜 and lots of ☕
          </p>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
