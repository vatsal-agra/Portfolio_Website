import { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { useSmoothScroll } from '@/components/effects/SmoothScroll';
import Magnetic from '@/components/effects/Magnetic';
import profilePic from '../assets/profile-pic.jpg';

const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Arcade', id: 'arcade' },
  { name: 'Contact', id: 'contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [active, setActive] = useState('home');
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view. Track all intersecting
  // sections and pick the topmost one so the highlight never latches onto a lower
  // section when several report intersection in the same callback batch.
  useEffect(() => {
    const sections = navItems
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        const topmost = navItems.find((i) => visible.get(i.id));
        if (topmost) setActive(topmost.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setIsMobileOpen(false);
    if (id === 'home') scrollTo(0);
    else scrollTo(`#${id}`, { offset: -10 });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-2.5' : 'py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-2 transition-all duration-500 ${
            isScrolled ? 'glass-strong border-gradient shadow-lg shadow-black/40' : 'bg-transparent'
          }`}
        >
          <button onClick={() => go('home')} className="flex items-center gap-3 group" aria-label="Back to top">
            <img
              src={profilePic}
              alt="Vatsal Agrawal"
              width={36}
              height={36}
              decoding="async"
              className="w-9 h-9 rounded-full object-cover border-2 border-primary/40 group-hover:border-primary transition-all duration-300"
            />
            <span className="block font-mono text-sm tracking-wide text-foreground/90">
              vatsal<span className="text-primary">.</span>dev
            </span>
          </button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                  active === item.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {active === item.id && (
                  <span className="absolute inset-0 rounded-full bg-primary/10 border border-primary/30" />
                )}
                <span className="relative z-10">{item.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:block">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-black transition-all duration-300 hover:bg-white hover:shadow-[0_0_24px_hsl(var(--primary)/0.5)]"
              >
                <FileText size={15} />
                Resume
              </a>
            </Magnetic>

            <button
              onClick={() => setIsMobileOpen((v) => !v)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile */}
        {isMobileOpen && (
          <div className="md:hidden mt-2 glass-strong border-gradient rounded-2xl p-3 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base transition-colors ${
                  active === item.id ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                {item.name}
              </button>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-base font-semibold text-black"
            >
              <FileText size={16} />
              Resume
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
