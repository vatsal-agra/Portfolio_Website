import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Folder } from 'lucide-react';

const projects = [
  {
    title: 'AI Image Classifier',
    description: 'Deep learning model for classifying images using CNN architecture with 95% accuracy.',
    tech: ['Python', 'TensorFlow', 'OpenCV'],
    github: '#',
    demo: '#',
    featured: true,
  },
  {
    title: 'Smart Portfolio',
    description: 'This very portfolio you\'re looking at! Built with React, TypeScript, and lots of love.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    github: '#',
    demo: '#',
    featured: true,
  },
  {
    title: 'Sentiment Analyzer',
    description: 'NLP-based sentiment analysis tool for social media posts and reviews.',
    tech: ['Python', 'NLTK', 'Flask'],
    github: '#',
    demo: '#',
    featured: false,
  },
  {
    title: 'Task Manager API',
    description: 'RESTful API for task management with authentication and real-time updates.',
    tech: ['Node.js', 'Express', 'MongoDB'],
    github: '#',
    demo: '#',
    featured: false,
  },
  {
    title: 'ML Model Dashboard',
    description: 'Interactive dashboard for visualizing ML model performance metrics.',
    tech: ['React', 'D3.js', 'Python'],
    github: '#',
    demo: '#',
    featured: true,
  },
  {
    title: 'Chat Application',
    description: 'Real-time chat app with WebSocket integration and message encryption.',
    tech: ['React', 'Socket.io', 'Node.js'],
    github: '#',
    demo: '#',
    featured: false,
  },
];

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-32 relative"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-primary font-mono text-sm">{'// Projects'}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            What I've <span className="text-gradient">Built</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for building
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex justify-center gap-4 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {(['all', 'featured'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'all' ? 'All Projects' : 'Featured'}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`group glass rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <Folder className="w-10 h-10 text-primary" />
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={project.demo}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2 py-1 rounded-md bg-muted text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-mono text-accent">★</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* More Projects Hint */}
        <div className={`text-center mt-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '800ms' }}>
          <p className="text-muted-foreground text-sm font-mono">
            {'// More projects coming soon...'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
