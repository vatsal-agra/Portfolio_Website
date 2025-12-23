import { useState } from 'react';
import skills from '@/data/skillsData.json';
import { FaPython, FaJava, FaHtml5, FaCss3Alt, FaReact, FaDocker, FaLinux, FaGitAlt } from 'react-icons/fa';
import { FaFigma } from 'react-icons/fa6';
import { SiCplusplus, SiBlender, SiAdobepremierepro, SiLeetcode } from 'react-icons/si';
import { IoAnalytics } from 'react-icons/io5';
import n8nLogo from '@/assets/n8n-removebg-preview.png';

const skillIcons: Record<string, JSX.Element> = {
  'Python': <FaPython className="text-3xl" />,
  'Java': <FaJava className="text-3xl" />,
  'C/C++': <SiCplusplus className="text-3xl" />,
  'HTML/CSS': <><FaHtml5 className="inline text-orange-500" /> <FaCss3Alt className="inline text-blue-500" /></>,
  'React': <FaReact className="text-3xl text-blue-400" />,
  'n8n': <img src={n8nLogo} alt="n8n" className="w-12 h-12 object-contain" />,
  'Pygame': <div className="text-3xl">🎮</div>,
  'Docker': <FaDocker className="text-3xl text-blue-400" />,
  'Linux': <FaLinux className="text-3xl text-yellow-600" />,
  'Git': <FaGitAlt className="text-3xl text-orange-500" />,
  'Web Development': <div className="text-3xl">🌐</div>,
  'DSA': <SiLeetcode className="text-3xl text-orange-500" />,
  'Prototyping': <div className="text-3xl">🧪</div>,
  'Debugging': <div className="text-3xl">🐞</div>,
  'AI/ML': <IoAnalytics className="text-3xl text-purple-500" />,
  'Prompting': <div className="text-3xl">💬</div>,
  'Agent Development': <div className="text-4xl" title="Agent Development">🤖<span className="sr-only">Agent Development</span></div>,
  'Vibe Coding': <div className="text-3xl">🎧</div>,
  'Figma': <FaFigma className="text-3xl text-pink-500" />,
  'Blender': <SiBlender className="text-3xl text-orange-400" />,
  'Video Editing': <SiAdobepremierepro className="text-3xl text-blue-400" />,
  'Problem Solving': <div className="text-3xl">🧩</div>,
  'Leadership': <div className="text-3xl">👥</div>,
  '130 WPM': <div className="text-3xl">⌨️</div>,
};

const categories: Record<string, { color: string; bg: string; hover: string }> = {
  "Language": { color: "text-yellow-400", bg: "bg-yellow-500", hover: "hover:border-yellow-400" },
  "Development": { color: "text-cyan-400", bg: "bg-cyan-500", hover: "hover:border-cyan-400" },
  "Design": { color: "text-pink-400", bg: "bg-pink-500", hover: "hover:border-pink-400" },
  "AI/ML": { color: "text-purple-400", bg: "bg-purple-500", hover: "hover:border-purple-400" },
  "Soft Skills": { color: "text-emerald-400", bg: "bg-emerald-500", hover: "hover:border-emerald-400" },
};

export default function SkillsSection() {
  const [filter, setFilter] = useState<string | null>(null);

  return (
    <div className="flex flex-1 bg-[#09090b] text-white h-[calc(100vh-4rem)]">
      {/* Legend / Sidebar */}
      <aside className="w-64 border-r border-zinc-800 p-6 hidden md:block">
        <h2 className="text-sm font-bold text-zinc-500 mb-4 uppercase tracking-widest">Categories</h2>
        <div className="space-y-2">
          {Object.keys(categories).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(filter === cat ? null : cat)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center gap-3
                ${filter === cat ? 'bg-zinc-800 border border-zinc-700' : 'hover:bg-zinc-900 border border-transparent'}
              `}
            >
              <div className={`w-3 h-3 rounded-sm ${categories[cat].bg}`} />
              <span className="text-lg text-zinc-300">{cat}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Grid */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 max-w-[1600px] mx-auto">
          {Object.entries(skillIcons).map(([name, icon]) => {
            const skill = skills.find(s => s.name === name);
            if (!skill) return null;
            
            const isFiltered = filter && skill.cat !== filter;
            
            return (
              <div 
                key={name}
                className={`
                  relative aspect-square bg-[#18181b] border border-zinc-800 rounded-md p-3
                  flex flex-col justify-between cursor-default group overflow-visible
                  transition-all duration-300
                  ${isFiltered ? 'opacity-10 grayscale blur-[1px]' : 'hover:scale-140 hover:z-[100] hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)]'}
                  ${categories[skill.cat]?.hover || ''}
                `}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-white to-transparent transition-opacity" />
                
                {/* Top Info */}
                <div className="flex justify-between items-start z-10">
                  <span className="text-[10px] font-mono text-zinc-500 group-hover:text-white transition-colors">{skill.num}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${categories[skill.cat]?.bg || 'bg-zinc-600'} opacity-50 group-hover:opacity-100`} />
                </div>

                {/* Big Icon with Name */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 transition-all duration-300 group-hover:scale-150 group-hover:opacity-10 group-hover:blur-sm pointer-events-none">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-white text-2xl">
                    {icon}
                  </div>
                  <span className="text-lg text-zinc-500 mt-1.5 text-center px-1 line-clamp-1">
                    {name}
                  </span>
                </div>

                {/* Full Name (Revealed on Hover) */}
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-xl font-bold text-white text-center leading-tight drop-shadow-md">
                    {name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
