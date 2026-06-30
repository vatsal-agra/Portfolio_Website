import { Rocket, Sparkles, Brain, Trophy, MapPin, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/effects/Reveal';
import SectionHeading from '@/components/effects/SectionHeading';
import Counter from '@/components/effects/Counter';
import Magnetic from '@/components/effects/Magnetic';
import profilePic from '@/assets/profile-pic.jpg';

interface Stat {
  icon: typeof Rocket;
  value?: number;
  suffix?: string;
  /** static text shown instead of a counting number */
  display?: string;
  label: string;
}

const stats: Stat[] = [
  { icon: Rocket, value: 30, suffix: '+', label: 'Projects Shipped' },
  { icon: Brain, value: 120, label: 'WPM Typing' },
  { icon: Trophy, value: 2, suffix: 'nd', label: 'GDG Hackathon' },
  { icon: Sparkles, display: 'Co-Founder', label: 'AISkillBench' },
];

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      {/* ambient grid backdrop */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="// About Me"
          title="The Story So Far"
          highlight="Story"
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* ---- LEFT: Profile photo ---- */}
          <Reveal direction="left" className="lg:col-span-4">
            <div className="group relative mx-auto w-fit">
              {/* blurred gradient glow ring */}
              <div
                className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary via-secondary to-accent opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <img
                  src={profilePic}
                  alt="Portrait of Vatsal Agrawal"
                  loading="lazy"
                  className="aspect-[4/5] w-full max-w-sm object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                {/* subtle top-to-bottom darkening for depth */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* floating mono badge */}
              <div className="glass-strong animate-float absolute -bottom-4 -right-4 flex items-center gap-2 rounded-full border border-white/10 px-4 py-2">
                <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <span className="font-mono text-xs tracking-wide text-foreground">
                  VIT Chennai &middot; CSE (AI/ML)
                </span>
              </div>
            </div>
          </Reveal>

          {/* ---- CENTER: Bio ---- */}
          <div className="lg:col-span-5">
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <Reveal direction="up" delay={0.05}>
                <p>
                  Hey — I&rsquo;m{' '}
                  <span className="text-foreground font-semibold">Vatsal Agrawal</span>, a Computer
                  Science <span className="text-primary">(AI &amp; ML)</span> undergrad at VIT Chennai and{' '}
                  <span className="text-secondary font-semibold">co-founder of AISkillBench</span>.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.12}>
                <p>
                  I design and ship <span className="text-foreground font-semibold">production-grade AI
                  systems end-to-end</span> — from a{' '}
                  <span className="text-primary">transformer language model built from scratch in
                  PyTorch</span>, to autonomous{' '}
                  <span className="text-primary">multi-agent LLM platforms</span> and full-stack SaaS,
                  several already deployed to production.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.19}>
                <p>
                  My work spans <span className="text-primary">deep learning</span>,{' '}
                  <span className="text-primary">LLM agents &amp; RAG</span>,{' '}
                  <span className="text-secondary">computer vision</span>, and full-stack + mobile
                  development. I love taking a raw idea all the way to a live, polished product — and
                  obsessing over the details in between.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.26}>
                <p>
                  A relentless solo builder with{' '}
                  <span className="text-foreground font-semibold">30+ projects shipped</span>, I recently
                  took{' '}
                  <span className="text-foreground font-semibold">2nd Place at the GDG FlutterSprint
                  Hackathon</span>{' '}
                  with <span className="text-gradient font-semibold">MockMate</span>, a multimodal
                  AI interview coach.
                </p>
              </Reveal>
            </div>

            <Reveal direction="up" delay={0.33} className="mt-9">
              <Magnetic strength={0.35} className="w-fit">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-medium text-black shadow-lg shadow-primary/20 transition-colors duration-300 hover:bg-transparent hover:text-primary hover:ring-2 hover:ring-primary"
                >
                  View Full Resume
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </Magnetic>
            </Reveal>
          </div>

          {/* ---- RIGHT: Stats ---- */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Reveal key={stat.label} direction="up" delay={0.1 + i * 0.08}>
                    <div className="glass group rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </div>
                      {stat.display ? (
                        <span className="text-gradient block text-2xl font-bold leading-none md:text-3xl">
                          {stat.display}
                        </span>
                      ) : (
                        <Counter
                          to={stat.value!}
                          suffix={stat.suffix}
                          className="text-gradient block text-3xl font-bold leading-none md:text-4xl"
                        />
                      )}
                      <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
