import { useEffect, useRef, useState } from 'react';

/**
 * Custom two-part cursor: a precise dot that tracks 1:1, and a lagging ring
 * that swells + inverts (mix-blend-mode) over interactive elements.
 * Only renders on fine-pointer devices; touch users keep native behaviour.
 */
const Cursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Decide whether to enable (fine pointer only, and not under reduced-motion —
  // a lerping blend-mode ring that follows the cursor is exactly the kind of
  // motion those users opt out of, so we fall back to the native cursor).
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.body.classList.add('has-custom-cursor');
    return () => document.body.classList.remove('has-custom-cursor');
  }, []);

  // Wire up movement + the lagging ring once the nodes are mounted.
  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      const t = e.target as HTMLElement;
      const interactive = !!t.closest?.('a, button, [role="button"], input, textarea, .cursor-target, [data-cursor]');
      setHovering(interactive);
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-primary -ml-[3px] -mt-[3px]" />
      </div>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ willChange: 'transform', mixBlendMode: 'difference' }}
      >
        <div
          className="rounded-full border border-white transition-[width,height,opacity] duration-200 ease-out"
          style={{
            width: hovering ? 56 : 30,
            height: hovering ? 56 : 30,
            marginLeft: hovering ? -28 : -15,
            marginTop: hovering ? -28 : -15,
            opacity: hovering ? 1 : 0.6,
          }}
        />
      </div>
    </>
  );
};

export default Cursor;
