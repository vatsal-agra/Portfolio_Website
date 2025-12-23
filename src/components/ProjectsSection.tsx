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
    thumbnail: '/project-thumbnails/shoes-aggregator.jpg',
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
    thumbnail: '/project-thumbnails/youtube-automation.jpg',
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
    thumbnail: '/project-thumbnails/insulin-management.jpg',
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
    thumbnail: '/project-thumbnails/tic-tac-toe.jpg',
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
    thumbnail: '/project-thumbnails/3d-game.jpg',
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
    thumbnail: '/project-thumbnails/flappy-bird.jpg',
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
    thumbnail: '/project-thumbnails/brick-breaker.jpg',
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
    thumbnail: '/project-thumbnails/hangman.jpg',
    details: 'Word guessing game with animated hangman drawings and extensive word dictionary.',
  },
  {
    title: 'Car Racing Game',
    description: 'Fast-paced car racing game with obstacles and increasing difficulty.',
    tech: ['Python', 'Pygame'],
    github: '#',
    demo: '#',
    featured: false,
    thumbnail: '/project-thumbnails/car-racing.jpg',
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
    thumbnail: '/project-thumbnails/space-invaders.jpg',
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
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.title}
              onClick={() => setSelectedProject(project)}
              className="bg-[#18181b] rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer flex flex-col h-full"
            >
              {/* Thumbnail */}
              <div className="h-48 bg-zinc-800 relative overflow-hidden">
                <img 
                  src={project.thumbnail || '/placeholder.svg'} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-black/70 text-white p-2 rounded-full hover:bg-black transition-colors"
                      onClick={e => e.stopPropagation()}
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-black/70 text-white p-2 rounded-full hover:bg-black transition-colors"
                      onClick={e => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
              
              {/* Project Info */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <project.icon className="w-6 h-6 text-blue-400" />
                  <div className="flex items-center text-sm text-zinc-500">
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      project.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></span>
                    {project.status}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-zinc-400 mb-4 flex-1">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-zinc-800">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="bg-[#18181b] border-zinc-800 max-w-2xl max-h-[90vh] overflow-y-auto p-0">
            {selectedProject && (
              <>
                {/* Thumbnail in Modal */}
                <div className="h-48 bg-zinc-800 relative">
                  <img 
                    src={selectedProject.thumbnail || '/placeholder.svg'} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-full hover:bg-black transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6">
                  <DialogHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
                        <div className="flex items-center mt-1 text-sm text-zinc-400">
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            selectedProject.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'
                          }`}></span>
                          {selectedProject.status}
                        </div>
                      </div>
                    </div>
                  </DialogHeader>

                  <div className="mt-6 space-y-6">
                    <p className="text-zinc-300">{selectedProject.details}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech, i) => (
                        <span key={i} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 pt-4 border-t border-zinc-800">
                      {selectedProject.github && (
                        <a 
                          href={selectedProject.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors text-sm"
                        >
                          <Github size={16} className="mr-2" />
                          View Code
                        </a>
                      )}
                      {selectedProject.demo && (
                        <a 
                          href={selectedProject.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm"
                        >
                          <ExternalLink size={16} className="mr-2" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
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
