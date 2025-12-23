import { useState } from 'react';
import { ExternalLink, Github, Folder, X, ShoppingBag, Youtube, Stethoscope, Gamepad2, Box, Bird, Blocks, PenTool, Car, Route, FileText, Rocket, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const projects = [
  {
    title: 'Shoes Aggregator Website',
    description: 'A comprehensive platform that aggregates shoes from multiple retailers for easy comparison and shopping.',
    tech: ['React', 'Node.js', 'Web Scraping'],
    github: '#',
    demo: '#',
    featured: true,
    icon: ShoppingBag,
    status: 'Completed',
    details: 'Full-stack web application that scrapes and aggregates shoe data from various e-commerce platforms, allowing users to compare prices and find the best deals.',
  },
  {
    title: 'YouTube Automation with n8n',
    description: 'Automated YouTube content workflow using n8n for scheduling, uploading, and analytics tracking.',
    tech: ['n8n', 'YouTube API', 'Automation'],
    github: '#',
    demo: '#',
    featured: true,
    icon: Youtube,
    status: 'In Progress',
    details: 'Workflow automation system that handles video scheduling, thumbnail generation, metadata optimization, and analytics reporting.',
  },
  {
    title: 'AI Insulin Management System',
    description: 'AI-powered platform for insulin patients and doctors to manage diabetes care effectively.',
    tech: ['Python', 'TensorFlow', 'Flask', 'ML'],
    github: '#',
    demo: '#',
    featured: true,
    icon: Stethoscope,
    status: 'In Progress',
    details: 'Machine learning system that helps predict insulin dosage, track glucose levels, and provide personalized recommendations for patients and healthcare providers.',
  },
  {
    title: 'Modern Tic Tac Toe',
    description: 'A beautifully designed Tic Tac Toe game with AI opponent built in Python.',
    tech: ['Python', 'Pygame', 'Minimax AI'],
    github: '#',
    demo: '#',
    featured: false,
    icon: Gamepad2,
    status: 'Completed',
    details: 'Classic game with modern UI, featuring an unbeatable AI opponent using the minimax algorithm with alpha-beta pruning.',
  },
  {
    title: '3D Game with Ursina',
    description: 'An immersive 3D game experience built using the Ursina Python game engine.',
    tech: ['Python', 'Ursina', '3D Graphics'],
    github: '#',
    demo: '#',
    featured: true,
    icon: Box,
    status: 'In Progress',
    details: '3D adventure game featuring custom models, physics engine integration, and interactive environments.',
  },
  {
    title: 'AI Flappy Bird',
    description: 'Flappy Bird clone with AI agent trained using NEAT neural evolution.',
    tech: ['Python', 'Pygame', 'NEAT-Python'],
    github: '#',
    demo: '#',
    featured: true,
    icon: Bird,
    status: 'Completed',
    details: 'Neural network that learns to play Flappy Bird through evolutionary algorithms, achieving superhuman performance.',
  },
  {
    title: 'Brick Breaker Game',
    description: 'Classic brick breaker arcade game with power-ups and multiple levels.',
    tech: ['Python', 'Pygame'],
    github: '#',
    demo: '#',
    featured: false,
    icon: Blocks,
    status: 'Completed',
    details: 'Retro-style arcade game with progressive difficulty, various power-ups, and high score tracking.',
  },
  {
    title: 'Hangman Game',
    description: 'Interactive hangman game with visual graphics using Tkinter and Turtle.',
    tech: ['Python', 'Tkinter', 'Turtle'],
    github: '#',
    demo: '#',
    featured: false,
    icon: PenTool,
    status: 'Completed',
    details: 'Word guessing game with animated hangman drawings and extensive word dictionary.',
  },
  {
    title: 'Car Racing Game',
    description: 'Fast-paced car racing game with obstacles and increasing difficulty.',
    tech: ['Python', 'Pygame'],
    github: '#',
    demo: '#',
    featured: false,
    icon: Car,
    status: 'Completed',
    details: 'Arcade-style racing game with smooth controls, collision detection, and progressive speed increases.',
  },
  {
    title: 'Pathfinder Visualizer',
    description: 'Visual pathfinding algorithm demonstration using priority queue implementation.',
    tech: ['Python', 'Algorithms', 'Data Structures'],
    github: '#',
    demo: '#',
    featured: true,
    icon: Route,
    status: 'Completed',
    details: 'Interactive visualization of Dijkstra\'s and A* pathfinding algorithms with customizable grids and obstacles.',
  },
  {
    title: 'Prescription OCR & Summary',
    description: 'AI system for detecting prescriptions and generating summaries using OCR and LangChain.',
    tech: ['Python', 'OCR', 'LangChain', 'AI'],
    github: '#',
    demo: '#',
    featured: true,
    icon: FileText,
    status: 'In Progress',
    details: 'Automated medical prescription reader that extracts text using OCR and generates patient-friendly summaries using LLMs.',
  },
  {
    title: 'Space Invaders',
    description: 'Classic Space Invaders arcade game recreation with modern enhancements.',
    tech: ['Python', 'Pygame'],
    github: '#',
    demo: '#',
    featured: false,
    icon: Rocket,
    status: 'Completed',
    details: 'Faithful recreation of the classic arcade game with added features like power-ups and boss battles.',
  },
  {
    title: 'Multiplayer Game Website',
    description: 'Real-time multiplayer gaming platform for various browser-based games.',
    tech: ['React', 'Socket.io', 'Node.js'],
    github: '#',
    demo: '#',
    featured: true,
    icon: Users,
    status: 'In Progress',
    details: 'Web platform hosting multiple multiplayer games with real-time synchronization, lobbies, and leaderboards.',
  },
];

type Project = typeof projects[0];

const ProjectsSection = () => {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.featured);

  return (
    <section className="min-h-screen py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-8 animate-fade-in">
          <span className="text-primary font-mono text-sm">{'// Projects'}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            What I've <span className="text-gradient">Built</span>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredProjects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <div
                key={project.title}
                onClick={() => setSelectedProject(project)}
                className="group glass rounded-xl p-5 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 relative animate-slide-up cursor-pointer"
                style={{ animationDelay: `${100 + index * 50}ms` }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <IconComponent className="w-8 h-8 text-primary" />
                  <span className={`text-xs font-mono px-2 py-1 rounded-full ${
                    project.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
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
                    <span className="text-sm font-mono text-accent">★</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="glass border-primary/20 max-w-2xl">
            {selectedProject && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <selectedProject.icon className="w-8 h-8 text-primary" />
                    <div>
                      <DialogTitle className="text-xl">{selectedProject.title}</DialogTitle>
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                        selectedProject.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {selectedProject.status}
                      </span>
                    </div>
                  </div>
                </DialogHeader>
                
                {/* Placeholder for images */}
                <div className="aspect-video rounded-lg bg-muted/50 border border-dashed border-muted-foreground/30 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Project images coming soon</span>
                </div>

                <DialogDescription className="text-foreground/80 text-sm">
                  {selectedProject.details}
                </DialogDescription>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm font-mono px-3 py-1 rounded-full bg-primary/20 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-2">
                  <a
                    href={selectedProject.github}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5" />
                    <span className="text-sm">View Code</span>
                  </a>
                  <a
                    href={selectedProject.demo}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span className="text-sm">Live Demo</span>
                  </a>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectsSection;
