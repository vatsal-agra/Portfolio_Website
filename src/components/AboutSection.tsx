import { Brain, Code, Lightbulb, Rocket } from 'lucide-react';

const stats = [
  { value: '2nd', label: 'Year Student', icon: Rocket },
  { value: '10+', label: 'Projects Built', icon: Code },
  { value: '5+', label: 'Tech Stacks', icon: Brain },
  { value: '∞', label: 'Ideas to Build', icon: Lightbulb },
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

        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Hey there! I'm <span className="text-foreground font-semibold">Vatsal Agrawal</span>, a passionate tech enthusiast currently navigating my sophomore year at{' '}
              <span className="text-primary">VIT Chennai</span>.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              I'm pursuing my B.Tech in Computer Science with a specialization in{' '}
              <span className="text-secondary">Artificial Intelligence & Machine Learning</span>. The intersection of intelligent systems and practical applications is where I love to explore.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              When I'm not training models or debugging code, you'll find me exploring new technologies, contributing to open source, or brainstorming the next big idea.
            </p>

            <div className="pt-2">
              <span className="font-mono text-sm text-primary">{'> Currently learning:'}</span>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                Deep Learning, Computer Vision, NLP, and Full-Stack Development
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-5 text-center group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="w-7 h-7 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
