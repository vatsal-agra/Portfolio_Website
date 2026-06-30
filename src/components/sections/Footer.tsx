import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import Marquee from '@/components/effects/Marquee';
import Magnetic from '@/components/effects/Magnetic';
import Reveal from '@/components/effects/Reveal';
import { useSmoothScroll } from '@/components/effects/SmoothScroll';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Arcade', href: '#arcade' },
  { label: 'Contact', href: '#contact' },
];

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/vatsal-agra',
    icon: Github,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vatsal2006',
    icon: Linkedin,
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:agrawal.vatsal@gmail.com',
    icon: Mail,
    external: false,
  },
];

/** One repeating unit of the giant wordmark marquee. */
const WordmarkUnit = () => (
  <span className="flex items-center gap-8 pr-8 text-6xl font-bold uppercase leading-none tracking-tight md:text-8xl md:gap-12 md:pr-12">
    <span className="stroke-text">Vatsal Agrawal</span>
    <span className="text-primary/60" aria-hidden>
      ✦
    </span>
    <span className="text-gradient">Let&apos;s Build Something</span>
    <span className="text-secondary/60" aria-hidden>
      ✦
    </span>
  </span>
);

const Footer = () => {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-white/10 bg-background"
    >
      {/* Giant full-bleed marquee wordmark */}
      <div className="relative py-12 md:py-16">
        <div className="mask-fade-x">
          <Marquee speed={32} pauseOnHover>
            <div className="flex items-center" aria-label="Vatsal Agrawal — Let's build something">
              <WordmarkUnit />
              <WordmarkUnit />
            </div>
          </Marquee>
        </div>
        {/* soft glow underlay */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          aria-hidden
        />
      </div>

      {/* Content row */}
      <div className="glass border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
            {/* Left: logo + tagline + back to top */}
            <Reveal className="md:col-span-5" direction="up">
              <div className="flex flex-col items-start gap-6">
                <button
                  onClick={() => scrollTo(0)}
                  className="group flex items-center gap-3 text-left"
                  aria-label="Vatsal Agrawal — back to top"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 font-mono text-sm font-bold text-primary transition-colors group-hover:border-primary/50">
                    VA
                  </span>
                  <span className="text-lg font-bold tracking-tight text-foreground">
                    Vatsal Agrawal
                  </span>
                </button>

                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  AI/ML engineer &amp; co-founder of AISkillBench. Shipping production AI systems end-to-end.
                </p>

                <Magnetic strength={0.35}>
                  <button
                    onClick={() => scrollTo(0)}
                    aria-label="Scroll back to top"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:text-primary hover:glow-cyan"
                  >
                    <ArrowUp
                      className="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                    Back to top
                  </button>
                </Magnetic>
              </div>
            </Reveal>

            {/* Middle: quick nav */}
            <Reveal className="md:col-span-3" direction="up" delay={0.05}>
              <nav aria-label="Footer navigation" className="flex flex-col gap-4">
                <span className="eyebrow text-muted-foreground">// Navigate</span>
                <ul className="flex flex-col gap-3">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="group inline-flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-5" aria-hidden />
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>

            {/* Right: socials + say hello */}
            <Reveal className="md:col-span-4" direction="up" delay={0.1}>
              <div className="flex flex-col gap-6 md:items-end">
                <span className="eyebrow text-muted-foreground">// Connect</span>

                <div className="flex items-center gap-3">
                  {SOCIALS.map(({ label, href, icon: Icon, external }) => (
                    <Magnetic key={label} strength={0.4}>
                      <a
                        href={href}
                        aria-label={label}
                        {...(external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:glow-cyan"
                      >
                        <Icon className="h-5 w-5" aria-hidden />
                      </a>
                    </Magnetic>
                  ))}
                </div>

                <Magnetic strength={0.3}>
                  <a
                    href="mailto:agrawal.vatsal@gmail.com"
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent px-6 py-3 text-sm font-semibold text-background shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    Say hello
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-center font-mono text-xs text-muted-foreground sm:flex-row sm:text-left">
            <p>© 2026 Vatsal Agrawal</p>
            <p className="inline-flex items-center gap-1.5">
              Designed &amp; built with React, Tailwind
              <Heart className="h-3 w-3 fill-accent text-accent" aria-hidden />
              &amp; way too much coffee ☕
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
