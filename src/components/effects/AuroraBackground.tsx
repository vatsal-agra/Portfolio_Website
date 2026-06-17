/**
 * Soft drifting aurora blobs + dot grid. Sits behind a section's content
 * (position the parent `relative` and give content a higher z-index).
 */
const AuroraBackground = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div
        className="absolute -top-1/4 left-[8%] h-[42vw] w-[42vw] rounded-full blur-[120px] animate-aurora"
        style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.30), transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 right-[4%] h-[38vw] w-[38vw] rounded-full blur-[120px] animate-aurora"
        style={{ background: 'radial-gradient(circle, hsl(var(--secondary) / 0.28), transparent 70%)', animationDelay: '-6s' }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[34vw] w-[34vw] rounded-full blur-[120px] animate-aurora"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.18), transparent 70%)', animationDelay: '-11s' }}
      />
    </div>
  );
};

export default AuroraBackground;
