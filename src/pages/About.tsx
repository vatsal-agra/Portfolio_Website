import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import AboutSection from '@/components/AboutSection';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10 pt-24">
        <AboutSection />
      </main>
    </div>
  );
};

export default About;
