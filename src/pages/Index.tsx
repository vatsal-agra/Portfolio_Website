import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  return (
    <div className="h-screen bg-background text-foreground overflow-hidden">
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10 h-full">
        <HeroSection />
      </main>
    </div>
  );
};

export default Index;
