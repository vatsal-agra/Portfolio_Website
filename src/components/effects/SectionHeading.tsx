import { ReactNode } from 'react';
import Reveal, { RevealWords } from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  /** word(s) inside `title` to wrap in the cyan→pink gradient */
  highlight?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
  className?: string;
}

/**
 * Standard section header: mono eyebrow + a big word-by-word reveal title.
 * `highlight` gets the gradient treatment if it appears in `title`.
 */
const SectionHeading = ({
  eyebrow,
  title,
  highlight,
  align = 'center',
  children,
  className,
}: SectionHeadingProps) => {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  const renderTitle = () => {
    if (!highlight || !title.includes(highlight)) {
      return <RevealWords text={title} />;
    }
    const [before, after] = title.split(highlight);
    return (
      <>
        {before && <RevealWords text={before.trimEnd() + ' '} />}
        <span className="text-gradient">
          <RevealWords text={highlight} />
        </span>
        {after && <RevealWords text={' ' + after.trimStart()} />}
      </>
    );
  };

  return (
    <div className={`flex flex-col ${alignCls} ${className ?? ''}`}>
      <Reveal direction="up">
        <span className="eyebrow flex items-center gap-3">
          <span className="h-px w-8 bg-primary/60" />
          {eyebrow}
        </span>
      </Reveal>
      <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
        {renderTitle()}
      </h2>
      {children && <div className="mt-5 max-w-2xl text-muted-foreground text-base md:text-lg">{children}</div>}
    </div>
  );
};

export default SectionHeading;
