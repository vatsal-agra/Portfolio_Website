import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

import SmoothScroll from '@/components/effects/SmoothScroll';
import { GameLauncherProvider } from '@/components/games/GameLauncher';
import Cursor from '@/components/effects/Cursor';
import ScrollProgress from '@/components/effects/ScrollProgress';
import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';

import Hero from '@/components/sections/Hero';
import MarqueeStrip from '@/components/sections/MarqueeStrip';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Arcade from '@/components/sections/Arcade';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <SmoothScroll>
      <GameLauncherProvider>
        <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
          {/* Global ambience */}
          <NeuralBackground />
          <div className="grain-overlay" aria-hidden />
          <ScrollProgress />
          <Cursor />

          <Navbar />

          <div className="relative z-10">
            <main>
              <Hero />
              <MarqueeStrip />
              <About />
              <Skills />
              <Projects />
              <Arcade />
              <Contact />
            </main>
            <Footer />
          </div>
        </div>
      </GameLauncherProvider>
    </SmoothScroll>
  </TooltipProvider>
);

export default App;
