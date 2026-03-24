import { Brain, Code, Lightbulb, Rocket } from 'lucide-react';
import profilePic from '../assets/profile-pic.png.png';

const stats = [
  { value: '2nd', label: 'Year Student', icon: Rocket },
  { value: '15+', label: 'Projects Built', icon: Code },
  { value: '120', label: 'WPM Typing', icon: Brain },
  { value: '2nd', label: 'GDG Hackathon', icon: Lightbulb },
];

const AboutSection = () => {
  return (
    <section className="h-full flex items-center justify-center pt-16">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10 animate-fade-in">
          <span className="text-primary font-mono text-sm">{'// About Me'}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            The <span className="text-gradient">Story</span> So Far
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start max-w-7xl mx-auto">
          {/* Left Column - Profile Picture */}
          <div className="flex justify-center w-full lg:w-auto">
            <div className="w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 relative group animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-50 transition-all duration-300"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 group-hover:border-primary/50 transition-all duration-300">
                <img 
                  src={profilePic} 
                  alt="Vatsal Agrawal" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Middle Column - Text Content */}
          <div className="flex-1 space-y-4 animate-slide-up max-w-2xl" style={{ animationDelay: '0.3s' }}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Hey there! I'm <span className="text-foreground font-semibold">Vatsal Agrawal</span>, a passionate tech enthusiast currently navigating my sophomore year at{' '}
              <span className="text-primary">VIT Chennai</span>.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              I'm pursuing my B.Tech in Computer Science with a specialization in{' '}
              <span className="text-secondary">Artificial Intelligence & Machine Learning</span>. The intersection of intelligent systems and practical applications is where I love to explore.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              When I'm not training models or debugging code, you'll find me exploring new technologies, contributing to open source, or brainstorming the next big idea. I'm deeply passionate about applying my skills in Deep Learning, Computer Vision, and Full-Stack Development to create impactful solutions.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              I'm constantly expanding my knowledge and love diving into new challenges. Recently, I secured <strong>2nd Place at the GDG FlutterSprint Hackathon</strong> by building MockMate, an AI-powered mock interview app. Whether it's building intelligent systems or crafting beautiful user experiences, I'm always excited to create impactful solutions.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary text-black font-semibold rounded-full hover:bg-white hover:text-black transition-all hover:scale-105 shadow-[0_0_20px_rgba(var(--primary),0.3)]"
              >
                View Full Resume
              </a>
            </div>
          </div>

          {/* Right Column - Stats Grid */}
          <div className="w-full lg:w-auto">
            <div className="grid grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass rounded-2xl p-8 text-center group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-center"
                  style={{ animationDelay: `${index * 100}ms`, minHeight: '160px', minWidth: '160px' }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
