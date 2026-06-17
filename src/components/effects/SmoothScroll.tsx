import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import Lenis from 'lenis';

interface ScrollAPI {
  scrollTo: (target: string | number | HTMLElement, opts?: { offset?: number }) => void;
}

const ScrollContext = createContext<ScrollAPI>({ scrollTo: () => {} });

export const useSmoothScroll = () => useContext(ScrollContext);

/**
 * Wraps the app in a Lenis inertia-scroll instance and exposes an imperative
 * scrollTo so the navbar / buttons can glide to section anchors.
 * Respects prefers-reduced-motion (falls back to native instant jumps).
 */
const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [api, setApi] = useState<ScrollAPI>({ scrollTo: () => {} });

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setApi({
        scrollTo: (target, opts) => {
          const el = typeof target === 'string' ? document.querySelector(target) : target;
          if (el instanceof HTMLElement) {
            window.scrollTo({ top: el.offsetTop - (opts?.offset ?? 0), behavior: 'auto' });
          } else if (typeof target === 'number') {
            window.scrollTo({ top: target, behavior: 'auto' });
          }
        },
      });
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    if (import.meta.env.DEV) {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    setApi({
      scrollTo: (target, opts) =>
        lenis.scrollTo(target as string, { offset: opts?.offset ?? 0, duration: 1.4 }),
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
      if (import.meta.env.DEV) {
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      }
    };
  }, []);

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>;
};

export default SmoothScroll;
