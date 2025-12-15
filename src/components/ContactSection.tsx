import { Github, Linkedin, Mail, Twitter, Send, MapPin } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:vatsal@example.com', label: 'Email' },
];

const ContactSection = () => {
  return (
    <section className="h-full flex flex-col items-center justify-center pt-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-8 animate-fade-in">
            <span className="text-primary font-mono text-sm">{'// Contact'}</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm md:text-base">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Chennai, India</span>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 glass rounded-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {social.label}
                </span>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a
              href="mailto:vatsal@example.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 group"
            >
              <span>Let's Build Something Together</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Email */}
          <p className="mt-6 font-mono text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.5s' }}>
            or reach me at{' '}
            <a href="mailto:vatsal@example.com" className="text-primary hover:underline">
              vatsal@example.com
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 py-6 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <div className="border-t border-border pt-6 mx-6">
          <p className="text-muted-foreground text-sm">
            Designed & Built by{' '}
            <span className="text-primary">Vatsal Agrawal</span>
          </p>
          <p className="text-muted-foreground text-xs mt-1 font-mono">
            © {new Date().getFullYear()} // Made with 💜 and lots of ☕
          </p>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
