import { useState, useRef } from 'react';
import { Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/config/emailConfig';
import Reveal, { RevealWords } from '@/components/effects/Reveal';
import Magnetic from '@/components/effects/Magnetic';
import AuroraBackground from '@/components/effects/AuroraBackground';

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/vatsal-agra',
    label: 'GitHub',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/vatsal2006',
    label: 'LinkedIn',
  },
  {
    icon: Mail,
    href: 'mailto:agrawal.vatsal@gmail.com',
    label: 'Email',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(
    null
  );
  const formRef = useRef<HTMLFormElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    // gentle, on-brand tilt
    setTilt({ rx: (0.5 - y) * 8, ry: (x - 0.5) * 8 });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

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
        message: "Your message has been sent! I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus({
        success: false,
        message:
          'Failed to send your message. Please try again or email me directly at agrawal.vatsal@gmail.com',
      });
    } finally {
      setIsSubmitting(false);
      // Clear status message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear any stale status the moment the user actually edits a field — NOT on
    // the programmatic reset after a successful send (which would wipe the banner).
    if (submitStatus) setSubmitStatus(null);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <AuroraBackground />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — heading + info + socials */}
          <div className="flex flex-col">
            <Reveal direction="up">
              <span className="eyebrow text-primary">{'// Contact'}</span>
            </Reveal>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <RevealWords text="Let's" className="block" />{' '}
              <RevealWords text="Connect" className="block text-gradient" />
            </h2>

            <Reveal direction="up" delay={0.1}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                I'm always open to discussing new projects, creative ideas, or opportunities to be
                part of your vision.
              </p>
            </Reveal>

            {/* Info cards */}
            <div className="mt-10 space-y-4">
              <Reveal direction="up" delay={0.15}>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=agrawal.vatsal@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass group flex items-start gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Email
                    </span>
                    <span className="mt-1 block break-all font-medium text-foreground transition-colors group-hover:text-primary">
                      agrawal.vatsal@gmail.com
                    </span>
                  </span>
                </a>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <div className="glass flex items-start gap-4 rounded-2xl p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Location
                    </span>
                    <span className="mt-1 block font-medium text-foreground">Chennai, India</span>
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Social buttons */}
            <Reveal direction="up" delay={0.25}>
              <div className="mt-10">
                <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Find me online
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <Magnetic key={social.label} strength={0.35}>
                      <a
                        href={social.href}
                        target={social.href.startsWith('http') ? '_blank' : undefined}
                        rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        aria-label={social.label}
                        className="glass group flex h-12 w-12 items-center justify-center rounded-xl text-foreground/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:text-primary hover:glow-cyan"
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — form card with 3D tilt */}
          <Reveal direction="up" delay={0.15}>
            <div
              ref={cardRef}
              className="group relative [perspective:1200px]"
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
            >
              {/* glow aura behind the card */}
              <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/30 via-transparent to-secondary/30 opacity-60 blur-md transition-opacity duration-500 group-hover:opacity-100" />

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="glass-strong relative rounded-3xl border border-white/10 p-6 shadow-xl transition-transform duration-200 ease-out will-change-transform sm:p-8"
                style={{
                  transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <h3 className="text-2xl font-bold tracking-tight">Send me a message</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Have a question or want to work together? Drop me a line.
                </p>

                {submitStatus && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`mt-6 rounded-xl border p-4 text-sm ${
                      submitStatus.success
                        ? 'border-primary/30 bg-primary/10 text-primary'
                        : 'border-accent/40 bg-accent/10 text-accent'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <div className="mt-6 space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-foreground/90"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/80 focus:border-primary/50 focus:ring-2 focus:ring-primary/40"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-foreground/90"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/80 focus:border-primary/50 focus:ring-2 focus:ring-primary/40"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-foreground/90"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/80 focus:border-primary/50 focus:ring-2 focus:ring-primary/40"
                      placeholder="Hi Vatsal, I'd like to chat about..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-4 font-medium text-background shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="-ml-1 mr-1 h-5 w-5 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
