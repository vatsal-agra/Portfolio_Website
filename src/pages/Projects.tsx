import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import ProjectsSection from '@/components/ProjectsSection';

const Projects = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10 h-full">
        <ProjectsSection />
      </main>
    </div>
  );
};

export default Projects;
