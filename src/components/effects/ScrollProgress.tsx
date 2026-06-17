import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin neon spine across the top of the viewport, tracking page scroll. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-primary via-secondary to-[hsl(var(--neon-pink))]"
    />
  );
};

export default ScrollProgress;
