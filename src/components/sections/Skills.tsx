import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaPython,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaDocker,
  FaLinux,
  FaGitAlt,
  FaProjectDiagram,
  FaNetworkWired,
  FaLink,
  FaEye,
} from 'react-icons/fa';
import { FaFigma } from 'react-icons/fa6';
import {
  SiCplusplus,
  SiBlender,
  SiAdobepremierepro,
  SiLeetcode,
  SiTypescript,
  SiFlutter,
  SiFirebase,
  SiTailwindcss,
  SiFlask,
  SiGoogle,
} from 'react-icons/si';
import { IoAnalytics } from 'react-icons/io5';
import skills from '@/data/skillsData.json';
import n8nLogo from '@/assets/n8n-removebg-preview.png';
import SectionHeading from '@/components/effects/SectionHeading';
import Reveal from '@/components/effects/Reveal';
import Marquee from '@/components/effects/Marquee';

/** Exact icon map carried over from the original SkillsSection. */
const skillIcons: Record<string, JSX.Element> = {
  Python: <FaPython className="text-3xl" />,
  Java: <FaJava className="text-3xl" />,
  'C/C++': <SiCplusplus className="text-3xl" />,
  'HTML/CSS': (
    <>
      <FaHtml5 className="inline text-orange-500" /> <FaCss3Alt className="inline text-blue-500" />
    </>
  ),
  React: <FaReact className="text-3xl text-blue-400" />,
  n8n: <img src={n8nLogo} alt="n8n" className="h-10 w-10 object-contain" />,
  Pygame: <div className="text-3xl">🎮</div>,
  Docker: <FaDocker className="text-3xl text-blue-400" />,
  Linux: <FaLinux className="text-3xl text-yellow-600" />,
  Git: <FaGitAlt className="text-3xl text-orange-500" />,
  'Web Development': <div className="text-3xl">🌐</div>,
  DSA: <SiLeetcode className="text-3xl text-orange-500" />,
  Prototyping: <div className="text-3xl">🧪</div>,
  Debugging: <div className="text-3xl">🐞</div>,
  'AI/ML': <IoAnalytics className="text-3xl text-purple-500" />,
  Prompting: <div className="text-3xl">💬</div>,
  'Agent Development': (
    <div className="text-3xl" title="Agent Development">
      🤖<span className="sr-only">Agent Development</span>
    </div>
  ),
  'Vibe Coding': <div className="text-3xl">🎧</div>,
  Figma: <FaFigma className="text-3xl text-pink-500" />,
  Blender: <SiBlender className="text-3xl text-orange-400" />,
  'Video Editing': <SiAdobepremierepro className="text-3xl text-blue-400" />,
  'Problem Solving': <div className="text-3xl">🧩</div>,
  Leadership: <div className="text-3xl">👥</div>,
  '120 WPM': <div className="text-3xl">⌨️</div>,
  TypeScript: <SiTypescript className="text-3xl text-blue-500" />,
  'REST APIs': <div className="text-3xl">🔌</div>,
  OOP: <div className="text-3xl">🧬</div>,
  'System Design': <FaProjectDiagram className="text-3xl text-zinc-400" />,
  Flutter: <SiFlutter className="text-3xl text-blue-400" />,
  Firebase: <SiFirebase className="text-3xl text-yellow-500" />,
  'Tailwind CSS': <SiTailwindcss className="text-3xl text-cyan-400" />,
  Flask: <SiFlask className="text-3xl text-white" />,
  'Neural Networks': <FaNetworkWired className="text-3xl text-purple-400" />,
  LangChain: <FaLink className="text-3xl text-emerald-500" />,
  'Gemini API': <SiGoogle className="text-3xl text-blue-500" />,
  'Computer Vision': <FaEye className="text-3xl text-teal-400" />,
  'Self-learning': <div className="text-3xl">📚</div>,
  'Cross-domain': <div className="text-3xl">🌉</div>,
};

interface CategoryStyle {
  /** text color for the category label */
  color: string;
  /** solid background for the color dot / fill */
  bg: string;
  /** hover border color */
  hover: string;
  /** rgba used for the glow + sheen so it tints to the category */
  glow: string;
}

/** Exact category color map carried over from the original SkillsSection (+ glow tints). */
const categories: Record<string, CategoryStyle> = {
  Language: {
    color: 'text-yellow-400',
    bg: 'bg-yellow-500',
    hover: 'hover:border-yellow-400/70',
    glow: 'rgba(234,179,8,0.55)',
  },
  Development: {
    color: 'text-cyan-400',
    bg: 'bg-cyan-500',
    hover: 'hover:border-cyan-400/70',
    glow: 'rgba(34,211,238,0.55)',
  },
  Design: {
    color: 'text-pink-400',
    bg: 'bg-pink-500',
    hover: 'hover:border-pink-400/70',
    glow: 'rgba(236,72,153,0.55)',
  },
  'AI/ML': {
    color: 'text-purple-400',
    bg: 'bg-purple-500',
    hover: 'hover:border-purple-400/70',
    glow: 'rgba(168,85,247,0.55)',
  },
  'Soft Skills': {
    color: 'text-emerald-400',
    bg: 'bg-emerald-500',
    hover: 'hover:border-emerald-400/70',
    glow: 'rgba(16,185,129,0.55)',
  },
};

const categoryKeys = Object.keys(categories);

type SkillEntry = {
  name: string;
  icon: JSX.Element;
  cat: string;
  num: number;
  style: CategoryStyle;
};

const Skills = () => {
  const [filter, setFilter] = useState<string>('All');

  /** Only skills that have BOTH an icon and a data record — exactly like the original. */
  const renderableSkills = useMemo<SkillEntry[]>(() => {
    return Object.entries(skillIcons)
      .map(([name, icon]) => {
        const skill = skills.find((s) => s.name === name);
        if (!skill) return null;
        return {
          name,
          icon,
          cat: skill.cat,
          num: skill.num,
          style: categories[skill.cat] ?? categories.Development,
        } satisfies SkillEntry;
      })
      .filter((s): s is SkillEntry => s !== null);
  }, []);

  return (
    <section
      id="skills"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* faint neural grid backdrop */}
      <div className="neural-grid pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="// Skills"
          title="The Tech Arsenal"
          highlight="Arsenal"
          align="center"
        >
          A living toolkit spanning languages, full-stack development, design and AI/ML —
          filter by discipline to see what lights up.
        </SectionHeading>

        {/* Category filter pills */}
        <Reveal direction="up" delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <FilterPill
              label="All"
              active={filter === 'All'}
              onClick={() => setFilter('All')}
              count={renderableSkills.length}
            />
            {categoryKeys.map((cat) => {
              const style = categories[cat];
              const count = renderableSkills.filter((s) => s.cat === cat).length;
              return (
                <FilterPill
                  key={cat}
                  label={cat}
                  active={filter === cat}
                  onClick={() => setFilter(cat)}
                  dotClass={style.bg}
                  activeColorClass={style.color}
                  count={count}
                />
              );
            })}
          </div>
        </Reveal>

        {/* Skill grid */}
        <motion.div
          className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.025 }}
        >
          {renderableSkills.map((skill) => {
            const dimmed = filter !== 'All' && skill.cat !== filter;
            return (
              <motion.div
                key={skill.name}
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.92 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.5, ease: [0.21, 0.5, 0.27, 0.99] }}
              >
                <div
                  className={`group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-card p-2 transition-all duration-300 ${
                    dimmed
                      ? 'scale-95 opacity-20 grayscale'
                      : `cursor-default hover:z-20 hover:-translate-y-1 hover:scale-110 hover:border-white/20 ${skill.style.hover}`
                  }`}
                  style={
                    dimmed
                      ? undefined
                      : ({ '--glow': skill.style.glow } as React.CSSProperties)
                  }
                >
                  {/* gradient sheen on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(120% 90% at 50% 0%, var(--glow, rgba(34,211,238,0.5)) 0%, transparent 60%)',
                    }}
                    aria-hidden
                  />
                  {/* hover ring glow */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ boxShadow: '0 0 22px -2px var(--glow, rgba(34,211,238,0.5))' }}
                    aria-hidden
                  />

                  {/* corner number */}
                  <span className="font-mono absolute left-2 top-1.5 text-[9px] text-muted-foreground transition-colors group-hover:text-foreground">
                    {String(skill.num).padStart(2, '0')}
                  </span>
                  {/* corner category dot */}
                  <span
                    className={`absolute right-2 top-2 h-1.5 w-1.5 rounded-full ${skill.style.bg} opacity-60 transition-opacity group-hover:opacity-100`}
                    aria-hidden
                  />

                  {/* icon */}
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center text-foreground transition-transform duration-300 group-hover:scale-110">
                    {skill.icon}
                  </div>

                  {/* name */}
                  <span className="relative z-10 mt-2 line-clamp-1 px-1 text-center text-[11px] font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* full-bleed marquee of skill names */}
      <Reveal direction="up" className="mt-16">
        <div className="mask-fade-x select-none border-y border-white/5 py-4">
          <Marquee speed={40}>
            {renderableSkills.map((skill) => (
              <span
                key={`marquee-${skill.name}`}
                className="font-mono mx-5 text-sm uppercase tracking-[0.2em] text-muted-foreground/50"
              >
                {skill.name}
                <span className="ml-5 text-primary/40">/</span>
              </span>
            ))}
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
};

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
  dotClass?: string;
  activeColorClass?: string;
  count: number;
}

const FilterPill = ({ label, active, onClick, dotClass, activeColorClass, count }: FilterPillProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`font-mono inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300 ${
        active
          ? 'border-white/20 bg-white/10 text-foreground glow-cyan'
          : 'border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground'
      }`}
    >
      {dotClass && (
        <span className={`h-2 w-2 rounded-full ${dotClass} ${active ? '' : 'opacity-70'}`} aria-hidden />
      )}
      <span className={active && activeColorClass ? activeColorClass : ''}>{label}</span>
      <span className="text-[10px] text-muted-foreground/60">{count}</span>
    </button>
  );
};

export default Skills;
