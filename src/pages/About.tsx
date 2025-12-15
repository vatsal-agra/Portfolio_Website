import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import AboutSection from '@/components/AboutSection';

const About = () => {
  return (
    <div className="h-screen bg-background text-foreground overflow-hidden">
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10 h-full">
        <AboutSection />
      </main>
    </div>
  );
};

export default About;
