import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Sparkles } from 'lucide-react';
import { useSmoothScroll } from '@/components/effects/SmoothScroll';
import Magnetic from '@/components/effects/Magnetic';

const roles = ['AI / ML Enthusiast', 'Problem Solver', 'Game Builder', 'Future Innovator', 'Code Craftsman'];

const letter = {
  hidden: { y: '120%', opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.25 + i * 0.04, duration: 0.7, ease: [0.21, 0.5, 0.27, 0.99] as const },
  }),
};

const KineticLine = ({ text, className, startIndex = 0 }: { text: string; className?: string; startIndex?: number }) => (
  <span className={`inline-flex overflow-hidden ${className ?? ''}`}>
    {text.split('').map((ch, i) => (
      <motion.span
        key={i}
        custom={startIndex + i}
        variants={letter}
        className="inline-block"
        style={{ willChange: 'transform' }}
      >
        {ch === ' ' ? ' ' : ch}
      </motion.span>
    ))}
  </span>
);

const Hero = () => {
  const { scrollTo } = useSmoothScroll();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'], layoutEffect: false });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // Typewriter for the roles line
  const [display, setDisplay] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const t = setTimeout(
      () => {
        if (!deleting) {
          if (display.length < current.length) setDisplay(current.slice(0, display.length + 1));
          else setTimeout(() => setDeleting(true), 1800);
        } else {
          if (display.length > 0) setDisplay(display.slice(0, -1));
          else {
            setDeleting(false);
            setRoleIdx((p) => (p + 1) % roles.length);
          }
        }
      },
      deleting ? 45 : 95
    );
    return () => clearTimeout(t);
  }, [display, deleting, roleIdx]);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layered glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.18),transparent_60%)] blur-2xl animate-pulse-glow" />
        <div className="absolute left-[15%] top-[22%] h-40 w-40 rounded-full bg-secondary/20 blur-[90px] animate-float" />
        <div className="absolute right-[14%] bottom-[24%] h-52 w-52 rounded-full bg-accent/15 blur-[100px] animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="font-mono text-sm md:text-base text-primary mb-5 flex items-center justify-center gap-2"
        >
          <Sparkles size={15} className="text-accent" />
          {'<Hello World />'}
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="visible"
          className="font-bold leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(2.75rem, 11vw, 9rem)' }}
        >
          <span className="block">
            <KineticLine text="VATSAL" />
          </span>
          <span className="block overflow-hidden align-bottom">
            <motion.span
              className="inline-block text-gradient glow-text"
              variants={{ hidden: { y: '115%' }, visible: { y: 0 } }}
              transition={{ delay: 0.55, duration: 0.8, ease: [0.21, 0.5, 0.27, 0.99] }}
              style={{ willChange: 'transform' }}
            >
              AGRAWAL
            </motion.span>
          </span>
        </motion.h1>

        {/* Roles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-6 h-8 md:h-10 flex items-center justify-center"
        >
          <span className="font-mono text-base md:text-2xl text-muted-foreground">
            <span className="text-foreground/50">{'> '}</span>
            {display}
            <span className="inline-block w-[2px] h-5 md:h-6 bg-primary ml-1 align-middle animate-typing-cursor" />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="mx-auto mt-6 max-w-xl text-muted-foreground text-sm md:text-base"
        >
          Sophomore at <span className="text-foreground font-medium">VIT Chennai</span>, building intelligent &amp; playful
          software at the intersection of <span className="text-primary font-medium">AI / ML</span>, full-stack, and game dev.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <button
              onClick={() => scrollTo('#projects', { offset: -10 })}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]"
            >
              View My Work
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </button>
          </Magnetic>
          <Magnetic>
            <button
              onClick={() => scrollTo('#contact', { offset: -10 })}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-all duration-300 hover:border-primary/50 hover:bg-white/10"
            >
              Get in Touch
            </button>
          </Magnetic>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-9 flex items-center justify-center gap-3"
        >
          {[
            { Icon: Github, href: 'https://github.com/vatsal-agra', label: 'GitHub' },
            { Icon: Linkedin, href: 'https://www.linkedin.com/in/vatsal-agrawal-a7a9641b0', label: 'LinkedIn' },
            { Icon: Mail, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=agrawal.vatsal@gmail.com', label: 'Email' },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group rounded-full glass p-3 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
            >
              <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo('#about', { offset: -10 })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Scroll down"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-primary"
            animate={reduceMotion ? undefined : { y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.button>
    </section>
  );
};

export default Hero;
