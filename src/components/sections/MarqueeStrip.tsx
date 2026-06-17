import Marquee from '@/components/effects/Marquee';

/** Keyword cycle for the transition band. */
const KEYWORDS = [
  'ARTIFICIAL INTELLIGENCE',
  'MACHINE LEARNING',
  'GAME DEV',
  'FULL-STACK',
  'COMPUTER VISION',
  'AI AGENTS',
  'NEURAL NETWORKS',
  'PYTHON',
  'REACT',
  'AUTOMATION',
  'DEEP LEARNING',
  'PROBLEM SOLVING',
] as const;

/** Cycle of word treatments so each chip reads with a different visual weight. */
type Treatment = 'solid' | 'stroke' | 'gradient';
const TREATMENTS: Treatment[] = ['solid', 'stroke', 'gradient', 'stroke', 'solid', 'gradient'];

const treatmentClass = (t: Treatment): string => {
  switch (t) {
    case 'stroke':
      return 'stroke-text text-foreground/90';
    case 'gradient':
      return 'text-gradient';
    default:
      return 'text-foreground';
  }
};

/** A glowing separator between chips; color alternates between cyan and ember. */
const Separator = ({ index }: { index: number }) => {
  const isAccent = index % 2 === 1;
  return (
    <span
      aria-hidden="true"
      className={`mx-6 select-none text-2xl md:text-4xl ${
        isAccent ? 'text-accent glow-text' : 'text-primary glow-text'
      }`}
    >
      &#10022;
    </span>
  );
};

/** One full inline run of keyword chips + separators. */
const Row = ({ offset = 0 }: { offset?: number }) => (
  <div className="flex shrink-0 items-center whitespace-nowrap pr-6">
    {KEYWORDS.map((word, i) => {
      const treatment = TREATMENTS[(i + offset) % TREATMENTS.length];
      return (
        <span key={`${word}-${i}`} className="flex shrink-0 items-center">
          <span
            className={`text-3xl font-bold uppercase leading-none tracking-tight md:text-5xl ${treatmentClass(
              treatment,
            )}`}
          >
            {word}
          </span>
          <Separator index={i + offset} />
        </span>
      );
    })}
  </div>
);

/**
 * Full-bleed transition band between the hero and about sections.
 * Two opposing marquee rows of keyword chips on a slightly rotated band.
 */
const MarqueeStrip = () => {
  return (
    <section
      id="marquee"
      aria-label="Areas of focus"
      className="relative my-12 w-full overflow-hidden md:my-16"
    >
      <div className="-mx-[10vw] w-[120vw] -rotate-2">
        <div className="dot-grid border-y border-white/10 bg-card/30 py-6 backdrop-blur-sm md:py-8">
          {/* fade the marquee edges so chips bleed off-screen cleanly */}
          <div className="mask-fade-x flex flex-col gap-2 md:gap-3">
            <Marquee speed={34} pauseOnHover={false}>
              <Row offset={0} />
            </Marquee>
            <Marquee speed={40} reverse pauseOnHover={false}>
              <Row offset={3} />
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarqueeStrip;
