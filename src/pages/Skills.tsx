import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import SkillsSection from '@/components/SkillsSection';

const Skills = () => {
  return (
    <div className="h-screen bg-background text-foreground overflow-hidden">
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10 h-full">
        <SkillsSection />
      </main>
    </div>
  );
};

export default Skills;
