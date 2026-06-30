import { createContext, useCallback, useContext, useState, ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExternalLink, Github, FileText, Gamepad2 } from 'lucide-react';
import { getProjectImage, type GameKey, type Project } from '@/data/projects';

import SpaceInvadersGame from '@/components/SpaceInvadersGame';
import BrickBreakerGame from '@/components/BrickBreakerGame';
import TrafficRiderGame from '@/components/TrafficRiderGame';
import TicTacToeGame from '@/components/TicTacToeGame';
import PathfinderGame from '@/components/PathfinderGame';

const GAME_COMPONENTS: Record<GameKey, (p: { onClose: () => void }) => JSX.Element> = {
  'space-invaders': SpaceInvadersGame,
  'brick-breaker': BrickBreakerGame,
  'traffic-rider': TrafficRiderGame,
  'tic-tac-toe': TicTacToeGame,
  pathfinder: PathfinderGame,
};

interface LauncherAPI {
  openProject: (p: Project) => void;
  playGame: (key: GameKey) => void;
}

const Ctx = createContext<LauncherAPI>({ openProject: () => {}, playGame: () => {} });
export const useGameLauncher = () => useContext(Ctx);

export const GameLauncherProvider = ({ children }: { children: ReactNode }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [activeGame, setActiveGame] = useState<GameKey | null>(null);

  const openProject = useCallback((p: Project) => {
    setActiveGame(null);
    setProject(p);
  }, []);

  const playGame = useCallback((key: GameKey) => {
    setProject(null);
    setActiveGame(key);
  }, []);

  const close = useCallback(() => {
    setProject(null);
    setActiveGame(null);
  }, []);

  const open = !!project || !!activeGame;
  const GameComp = activeGame ? GAME_COMPONENTS[activeGame] : null;

  return (
    <Ctx.Provider value={{ openProject, playGame }}>
      {children}

      <Dialog open={open} onOpenChange={(o) => !o && close()}>
        <DialogContent className="bg-[#0c0c12] border-zinc-800 max-w-4xl max-h-[92vh] overflow-y-auto p-0">
          {GameComp ? (
            <>
              <DialogTitle className="sr-only">{activeGame?.replace(/-/g, ' ')} — playable game</DialogTitle>
              <DialogDescription className="sr-only">
                Interactive browser game. Use the in-game controls to play; press Escape or the close button to exit.
              </DialogDescription>
              <div className="flex items-center justify-center bg-black min-h-[600px] w-full">
                <GameComp onClose={close} />
              </div>
            </>
          ) : project ? (
            <ProjectDetails
              project={project}
              onPlay={() => project.gameKey && setActiveGame(project.gameKey)}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
};

const ProjectDetails = ({
  project,
  onPlay,
}: {
  project: Project;
  onPlay: () => void;
}) => (
  <>
    <div className="h-64 bg-zinc-900 relative flex-shrink-0">
      {project.thumbnail ? (
        <img
          src={getProjectImage(project)}
          alt={project.title}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/25 via-[#0c0c12] to-secondary/20">
          <div className="absolute inset-0 dot-grid opacity-30" />
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur">
            <project.icon className="h-11 w-11 text-white" />
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c12] via-transparent to-transparent" />
    </div>

    <div className="p-8">
      <DialogHeader>
        <DialogTitle className="text-3xl font-bold">{project.title}</DialogTitle>
        <DialogDescription className="text-zinc-400 mt-1">{project.description}</DialogDescription>
      </DialogHeader>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h4 className="text-zinc-100 flex items-center text-base font-semibold mb-4 border-b border-zinc-800 pb-2">
            <FileText size={18} className="mr-2 text-primary" />
            Project Documentation
          </h4>
          <div className="bg-zinc-900/20 p-6 rounded-xl border border-zinc-800/30 text-zinc-300 leading-relaxed github-markdown text-sm">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.readme}</ReactMarkdown>
          </div>
        </div>

        <div>
          <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/50 space-y-6 sticky top-8">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center">
                <div className="w-1 h-3 bg-primary mr-2" />
                Links
              </h4>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-3 bg-white text-black font-bold rounded-xl hover:bg-primary hover:text-white transition-all text-sm w-full justify-center"
              >
                <Github size={18} className="mr-2" />
                View on GitHub
              </a>
              {project.gameKey && (
                <button
                  onClick={onPlay}
                  className="inline-flex items-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all text-sm w-full justify-center shadow-lg shadow-green-900/20"
                >
                  <Gamepad2 size={18} className="mr-2" />
                  Launch Game
                </button>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all text-sm w-full justify-center"
                >
                  <ExternalLink size={18} className="mr-2" />
                  Live Demo
                </a>
              )}
            </div>

            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center">
                <div className="w-1 h-3 bg-primary mr-2" />
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono bg-zinc-950 border border-zinc-800 text-zinc-400 px-3 py-1.5 rounded-lg uppercase tracking-wider font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
