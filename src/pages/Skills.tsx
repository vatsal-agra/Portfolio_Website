import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import SkillsSection from '@/components/SkillsSection';

const Skills = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10 pt-24">
        <SkillsSection />
      </main>
    </div>
  );
};

export default Skills;
