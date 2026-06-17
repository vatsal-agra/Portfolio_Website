import { motion } from 'framer-motion';
import { Play, Joystick } from 'lucide-react';

import Reveal from '@/components/effects/Reveal';
import SectionHeading from '@/components/effects/SectionHeading';
import Marquee from '@/components/effects/Marquee';
import Magnetic from '@/components/effects/Magnetic';
import { useGameLauncher } from '@/components/games/GameLauncher';
import { playableProjects, getProjectImage, type Project } from '@/data/projects';

/** Full-bleed neon marquee that runs along the top of the arcade floor. */
const StartMarquee = () => (
  <div className="-mx-[10vw] w-[120vw]">
    <div className="dot-grid border-y border-primary/15 bg-card/30 py-4 backdrop-blur-sm">
      <div className="mask-fade-x">
        <Marquee speed={28} pauseOnHover={false}>
          <span className="flex shrink-0 items-center whitespace-nowrap pr-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="flex shrink-0 items-center">
                <span className="text-xl font-bold uppercase tracking-[0.25em] text-primary glow-text md:text-2xl">
                  Press Start
                </span>
                <span aria-hidden="true" className="mx-6 text-2xl text-accent glow-text">
                  &#10022;
                </span>
              </span>
            ))}
          </span>
        </Marquee>
      </div>
    </div>
  </div>
);

/** A single playable arcade cabinet. */
const Cabinet = ({ project, index }: { project: Project; index: number }) => {
  const { playGame } = useGameLauncher();
  const Icon = project.icon;
  const gameKey = project.gameKey;

  return (
    <Reveal direction="up" delay={index * 0.08} className="h-full">
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="border-gradient group relative flex h-full flex-col overflow-hidden rounded-2xl glass-strong transition-shadow duration-500 hover:glow-cyan"
      >
        {/* CRT screen */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
          <img
            src={getProjectImage(project)}
            alt={`${project.title} gameplay screen`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />

          {/* Scanlines */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, transparent 1px, transparent 3px)',
            }}
          />
          {/* CRT vignette + neon tint */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(2,4,12,0.85) 100%)',
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />

          {/* Playable indicator */}
          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-emerald-400/30 bg-black/55 px-3 py-1 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
              Playable
            </span>
          </div>

          {/* Icon badge */}
          <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-xl border border-primary/30 bg-black/55 text-primary backdrop-blur-md">
            <Icon size={16} aria-hidden="true" />
          </div>

          {/* Blinking insert coin */}
          <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.22em] text-accent/90 animate-pulse-glow">
            Insert Coin
          </span>
        </div>

        {/* Cabinet body */}
        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold leading-tight tracking-tight text-foreground md:text-xl">
              {project.title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* PLAY button */}
          <div className="mt-auto pt-1">
            <Magnetic strength={0.35} className="inline-block w-full">
              <button
                type="button"
                onClick={() => gameKey && playGame(gameKey)}
                aria-label={`Play ${project.title}`}
                className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-primary/40 bg-primary/10 px-5 py-3 font-bold uppercase tracking-[0.15em] text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-background hover:glow-cyan"
              >
                <Play size={16} className="fill-current" aria-hidden="true" />
                <span className="text-sm">Play</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
                />
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
};

/**
 * The Arcade — Vatsal's Python games, ported and playable in-browser.
 * A retro neon arcade floor where each project is a CRT cabinet you can run.
 */
const Arcade = () => {
  return (
    <section
      id="arcade"
      aria-label="The Arcade — playable games"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Neon arcade floor */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 dot-grid opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            'radial-gradient(80% 120% at 50% 120%, hsl(var(--primary) / 0.16), transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[60rem] max-w-[90vw] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, hsl(var(--secondary) / 0.18), transparent)' }}
      />

      <div className="relative z-10">
        <Reveal direction="up" className="mb-12 md:mb-16">
          <StartMarquee />
        </Reveal>

        <div className="container mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="// Insert Coin"
            title="The Arcade"
            highlight="Arcade"
            align="center"
            className="mx-auto"
          >
            <p className="mx-auto text-center">
              These aren't screenshots — they're the real thing. Built in Python, ported to your
              browser. Pick a cabinet and play.
            </p>
          </SectionHeading>

          {/* Insert coin / cabinet count strip */}
          <Reveal direction="up" delay={0.1}>
            <div className="mt-8 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <Joystick size={16} className="text-accent" aria-hidden="true" />
              <span className="text-accent animate-pulse-glow">Insert Coin</span>
              <span className="h-px w-6 bg-primary/40" />
              <span>{playableProjects.length} Cabinets Online</span>
            </div>
          </Reveal>

          {/* Cabinet grid */}
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {playableProjects.map((project, i) => (
              <Cabinet key={project.repoName} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Arcade;
