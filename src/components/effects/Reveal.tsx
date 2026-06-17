import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

/** Fade/slide a block into view on scroll. Honours reduced-motion via framer. */
const Reveal = ({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.3,
}: RevealProps) => {
  const off = offsets[direction];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...off }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.21, 0.5, 0.27, 0.99] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;

/**
 * Word-by-word reveal for headlines. Pass a plain string; each word rises
 * and fades in sequence as the block scrolls into view.
 */
export const RevealWords = ({
  text,
  className,
  wordClassName,
  stagger = 0.05,
  once = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  stagger?: number;
  once?: boolean;
}) => {
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.5 }}
      transition={{ staggerChildren: stagger }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${wordClassName ?? ''}`}
            variants={{
              hidden: { y: '110%' },
              visible: { y: 0 },
            }}
            transition={{ duration: 0.6, ease: [0.21, 0.5, 0.27, 0.99] }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};
