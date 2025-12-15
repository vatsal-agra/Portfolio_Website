import { useState } from 'react';
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
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.featured);

  return (
    <section className="h-full flex items-center justify-center pt-16">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-6 animate-fade-in">
          <span className="text-primary font-mono text-sm">{'// Projects'}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            What I've <span className="text-gradient">Built</span>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {(['all', 'featured'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className="group glass rounded-xl p-4 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 relative animate-slide-up"
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <Folder className="w-8 h-8 text-primary" />
                <div className="flex gap-2">
                  <a
                    href={project.github}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={project.demo}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2 py-0.5 rounded-md bg-muted text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-mono text-accent">★</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
