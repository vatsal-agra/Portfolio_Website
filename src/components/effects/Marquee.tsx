import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  /** seconds per loop */
  speed?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}

/**
 * Seamless infinite marquee. Renders its children twice and slides the track
 * by -50% so the loop is invisible. Children should be a single inline row.
 */
const Marquee = ({ children, speed = 26, reverse = false, className, pauseOnHover = true }: MarqueeProps) => {
  return (
    <div className={`relative flex w-full overflow-hidden ${className ?? ''}`}>
      <div
        className={`flex shrink-0 items-center ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
          willChange: 'transform',
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
