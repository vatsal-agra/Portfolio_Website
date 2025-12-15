import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';

const Contact = () => {
  return (
    <div className="h-screen bg-background text-foreground overflow-hidden">
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10 h-full">
        <ContactSection />
      </main>
    </div>
  );
};

export default Contact;
