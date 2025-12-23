import { useState } from 'react';
import skills from '@/data/skillsData.json';

const categories: Record<string, { color: string; bg: string; hover: string }> = {
  "Language": { color: "text-yellow-400", bg: "bg-yellow-500", hover: "hover:border-yellow-400" },
  "Frontend": { color: "text-cyan-400", bg: "bg-cyan-500", hover: "hover:border-cyan-400" },
  "Backend": { color: "text-violet-400", bg: "bg-violet-500", hover: "hover:border-violet-400" },
  "DevOps": { color: "text-rose-400", bg: "bg-rose-500", hover: "hover:border-rose-400" },
  "Design": { color: "text-pink-400", bg: "bg-pink-500", hover: "hover:border-pink-400" },
  "Data": { color: "text-emerald-400", bg: "bg-emerald-500", hover: "hover:border-emerald-400" },
};

export default function SkillsSection() {
  const [filter, setFilter] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen bg-[#09090b] text-white">
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
              <span className="text-sm text-zinc-300">{cat}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Grid */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 max-w-[1600px] mx-auto">
          {skills.map(skill => {
            const style = categories[skill.cat];
            const isDimmed = filter && filter !== skill.cat;
            
            return (
              <div 
                key={skill.name}
                className={`
                  relative aspect-square bg-[#18181b] border border-zinc-800 rounded-md p-3
                  flex flex-col justify-between cursor-default group overflow-hidden
                  transition-all duration-300
                  ${isDimmed ? 'opacity-10 grayscale blur-[1px]' : 'hover:scale-140 hover:z-50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)]'}
                  ${style.hover}
                `}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-white to-transparent transition-opacity" />
                
                {/* Top Info */}
                <div className="flex justify-between items-start z-10">
                  <span className="text-[10px] font-mono text-zinc-500 group-hover:text-white transition-colors">{skill.num}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${style.bg} opacity-50 group-hover:opacity-100`} />
                </div>

                {/* Big Symbol */}
                <div className="absolute inset-0 flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-150 group-hover:opacity-10 group-hover:blur-sm">
                  <h2 className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 ${style.color}`}>
                    {skill.symbol}
                  </h2>
                </div>

                {/* Full Name (Revealed) */}
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-xl font-bold text-white text-center leading-tight drop-shadow-md">
                    {skill.name}
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
