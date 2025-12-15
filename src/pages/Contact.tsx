import NeuralBackground from '@/components/NeuralBackground';
import Navbar from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10 pt-24">
        <ContactSection />
      </main>
    </div>
  );
};

export default Contact;
