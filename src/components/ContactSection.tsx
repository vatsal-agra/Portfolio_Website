import { Github, Linkedin, Mail, Send, MapPin, Code, Coffee } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/config/emailConfig';

const socialLinks = [
  { 
    icon: Github, 
    href: 'https://github.com/vatsal-agra', 
    label: 'GitHub',
    gradient: 'from-gray-800 to-gray-600',
    description: 'Check out my projects on GitHub'
  },
  { 
    icon: Linkedin, 
    href: 'https://www.linkedin.com/in/vatsal-agrawal-a7a9641b0', 
    label: 'LinkedIn',
    gradient: 'from-blue-600 to-blue-800',
    description: 'Connect with me professionally'
  },
  { 
    icon: Mail, 
    href: 'mailto:agrawal.vatsal@gmail.com', 
    label: 'Email',
    gradient: 'from-rose-500 to-pink-600',
    description: 'Send me an email directly'
  },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean, message: string} | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (formRef.current) {
      const rect = formRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCursorPosition({ x, y });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS
      await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        e.target as HTMLFormElement,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      
      setSubmitStatus({
        success: true,
        message: 'Your message has been sent! I\'ll get back to you soon.'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to send your message. Please try again or email me directly at agrawal.vatsal@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
      // Clear status message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset form status when user starts typing
  useEffect(() => {
    if (submitStatus) {
      setSubmitStatus(null);
    }
  }, [formData]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-16 pb-20 px-4 sm:px-6">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Contact Info */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <span className="text-primary font-mono text-sm">{'// Contact'}</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2">
                Let's <span className="text-gradient">Connect</span>
              </h2>
              <p className="text-muted-foreground mt-4 text-base md:text-lg">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 glass rounded-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Email Me</h3>
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=agrawal.vatsal@gmail.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    agrawal.vatsal@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 glass rounded-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-muted-foreground">Chennai, India</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-medium mb-4">Connect with me</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-3 rounded-lg bg-gradient-to-br ${social.gradient} text-white transition-all duration-300 hover:shadow-lg hover:scale-105`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <social.icon className="w-5 h-5" />
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {social.description}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div 
            className="relative group"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div 
              className={`absolute inset-0.5 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-2xl blur-sm transition-all duration-500 ${isHovering ? 'opacity-100' : 'opacity-50'}`}
              style={{
                transform: isHovering 
                  ? `perspective(1000px) rotateX(${(cursorPosition.y / 20) - 10}deg) rotateY(${(cursorPosition.x / 20) - 10}deg)`
                  : 'none',
                boxShadow: isHovering 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
                  : '0 10px 30px -10px rgba(0, 0, 0, 0.1)'
              }}
            />
            
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative glass p-8 rounded-2xl backdrop-blur-sm border border-white/10 shadow-xl transition-all duration-500"
              style={{
                transform: isHovering 
                  ? `perspective(1000px) rotateX(${-(cursorPosition.y / 40) + 5}deg) rotateY(${(cursorPosition.x / 40) - 5}deg)`
                  : 'none',
              }}
            >
              <h3 className="text-2xl font-bold mb-2">Send me a message</h3>
              <p className="text-muted-foreground mb-8">Have a question or want to work together? Drop me a line!</p>
              
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-500/10 border border-green-500/30 text-green-500' : 'bg-red-500/10 border border-red-500/30 text-red-500'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all duration-200"
                      placeholder="Your name"
                      required
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all duration-200"
                      placeholder="your.email@example.com"
                      required
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all duration-200 resize-none"
                      placeholder="Hi Vatsal, I'd like to chat about..."
                      required
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-primary/10 to-secondary/10"
            style={{
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-white/10 text-center">
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <Code className="w-4 h-4" />
          <span>with</span>
          <Coffee className="w-4 h-4 text-amber-500" />
          <span>by</span>
          <a href="#" className="text-primary hover:underline">Vatsal Agrawal</a>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          © {new Date().getFullYear()} // Made with 💜 and lots of ☕
        </p>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(20px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
