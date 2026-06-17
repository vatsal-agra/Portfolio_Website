import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Github, ArrowUpRight, Plus, Minus } from 'lucide-react';
import SectionHeading from '@/components/effects/SectionHeading';
import Reveal from '@/components/effects/Reveal';
import { useGameLauncher } from '@/components/games/GameLauncher';
import { projects, featuredProjects, getProjectImage, type Project } from '@/data/projects';

const ProjectCard = ({
  project,
  index,
  onOpen,
  variant = 'gallery',
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
  variant?: 'gallery' | 'grid';
}) => {
  const Icon = project.icon;
  const num = String(index + 1).padStart(2, '0');
  return (
    <button
      onClick={() => onOpen(project)}
      className={`group relative text-left overflow-hidden rounded-3xl border border-white/10 bg-card/60 backdrop-blur transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.45)] ${
        variant === 'gallery'
          ? 'shrink-0 w-[82vw] sm:w-[64vw] md:w-[46vw] lg:w-[34vw] xl:w-[30vw] h-full flex flex-col'
          : 'w-full flex flex-col'
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${variant === 'gallery' ? 'h-[52%]' : 'h-48'}`}>
        <img
          src={getProjectImage(project)}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <span className="absolute left-4 top-3 font-mono text-5xl font-bold text-white/15 mix-blend-overlay select-none">
          {num}
        </span>
        {project.featured && (
          <span className="absolute right-4 top-4 rounded-full bg-primary/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-black">
            Featured
          </span>
        )}
        {project.gameKey && (
          <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-green-400 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            Playable
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <Icon className="h-5 w-5" />
          </span>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <h3 className="text-xl font-bold transition-colors group-hover:text-primary">{project.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-1 py-0.5 font-mono text-[10px] text-muted-foreground/60">+{project.tech.length - 4}</span>
          )}
        </div>
      </div>
    </button>
  );
};

const Projects = () => {
  const { openProject } = useGameLauncher();
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const x = useMotionValue(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Measure how far the horizontal track must travel.
  useLayoutEffect(() => {
    if (!isDesktop) {
      setDistance(0);
      return;
    }
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 64));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [isDesktop]);

  // Drive the horizontal translate directly from scroll position (deterministic,
  // stays in sync with Lenis — viewport-relative so it needs no offset measuring).
  // The rAF loop only runs while the pinned section is near the viewport.
  useEffect(() => {
    if (!isDesktop) {
      x.set(0);
      return;
    }
    const pin = pinRef.current;
    if (!pin) return;
    let raf = 0;
    let active = false;
    const loop = () => {
      const rect = pin.getBoundingClientRect();
      const denom = pin.offsetHeight - window.innerHeight;
      const p = denom > 0 ? Math.min(1, Math.max(0, -rect.top / denom)) : 0;
      x.set(-distance * p);
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !active) {
          active = true;
          raf = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && active) {
          active = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: '200px 0px 200px 0px' }
    );
    io.observe(pin);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [isDesktop, distance, x]);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <SectionHeading eyebrow="// Selected Work" title="What I've Built" highlight="Built" align="center">
          <p className="mx-auto text-center">
            From browser-playable Python games to deployed AI SaaS — {projects.length} real projects.
            {isDesktop ? ' Scroll to glide through the highlights.' : ' Swipe through the highlights.'}
          </p>
        </SectionHeading>
      </div>

      {/* Desktop: horizontal scroll-pinned gallery */}
      {isDesktop ? (
        <div ref={pinRef} style={{ height: `calc(100vh + ${distance}px)` }} className="relative mt-12">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex h-[64vh] gap-6 pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-24"
            >
              {featuredProjects.map((p) => (
                <ProjectCard key={p.repoName} project={p} index={projects.indexOf(p)} onOpen={openProject} variant="gallery" />
              ))}
              {/* End card → reveal full grid */}
              <div className="flex h-full w-[40vw] lg:w-[26vw] shrink-0 items-center justify-center">
                <button
                  onClick={() => {
                    setShowAll(true);
                    setTimeout(() => document.getElementById('all-projects')?.scrollIntoView({ behavior: 'smooth' }), 60);
                  }}
                  className="group flex flex-col items-center gap-4 rounded-3xl border border-dashed border-white/15 px-10 py-14 transition-all hover:border-primary/50"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-primary/15">
                    <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
                  </span>
                  <span className="text-lg font-bold group-hover:text-primary">See all {projects.length}</span>
                  <span className="max-w-[12rem] text-center text-sm text-muted-foreground">Explore the complete portfolio</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        // Mobile / tablet: native horizontal swipe carousel (side padding lets edge cards center)
        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[9vw] pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featuredProjects.map((p) => (
            <div key={p.repoName} className="h-[58vh] min-h-[440px] snap-center">
              <ProjectCard project={p} index={projects.indexOf(p)} onOpen={openProject} variant="gallery" />
            </div>
          ))}
        </div>
      )}

      {/* Full grid (toggle) */}
      <div id="all-projects" className="container mx-auto px-6 pt-16">
        {!showAll && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold transition-all hover:border-primary/50 hover:bg-white/10"
            >
              <Plus className="h-4 w-4" /> See all {projects.length} projects
            </button>
          </div>
        )}

        {showAll && (
          <>
            <div className="mb-8 flex items-center justify-between">
              <h3 className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">// full archive</h3>
              <button
                onClick={() => setShowAll(false)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <Minus className="h-3.5 w-3.5" /> Collapse
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <Reveal key={p.repoName} direction="up" delay={(i % 3) * 0.05} amount={0.15}>
                  <ProjectCard project={p} index={i} onOpen={openProject} variant="grid" />
                </Reveal>
              ))}
            </div>
          </>
        )}

        {/* GitHub CTA */}
        <Reveal direction="up" className="mt-14 flex justify-center">
          <a
            href="https://github.com/vatsal-agra"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium transition-all hover:border-primary/40 hover:bg-white/10"
          >
            <Github className="h-5 w-5 text-primary" />
            More on GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Projects;
