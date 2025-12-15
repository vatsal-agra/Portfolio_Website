import { useState } from 'react';

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 75 },
      { name: 'C++', level: 70 },
    ],
  },
  {
    title: 'AI/ML',
    skills: [
      { name: 'TensorFlow', level: 80 },
      { name: 'PyTorch', level: 75 },
      { name: 'Scikit-learn', level: 85 },
      { name: 'Pandas', level: 90 },
    ],
  },
  {
    title: 'Web Dev',
    skills: [
      { name: 'React', level: 85 },
      { name: 'Node.js', level: 75 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'MongoDB', level: 75 },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 65 },
      { name: 'VS Code', level: 95 },
      { name: 'Linux', level: 75 },
    ],
  },
];

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section className="h-full flex items-center justify-center pt-16 neural-grid">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-8 animate-fade-in">
          <span className="text-primary font-mono text-sm">{'// Skills & Technologies'}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            My <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm md:text-base">
            Technologies I've been working with and continuously learning
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className="glass rounded-2xl p-4 animate-slide-up"
              style={{ animationDelay: `${catIndex * 100}ms` }}
            >
              <h3 className="text-base font-semibold mb-4 text-center">
                <span className="text-primary">{'{'}</span>
                {' '}{category.title}{' '}
                <span className="text-primary">{'}'}</span>
              </h3>

              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="group cursor-pointer"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {skill.name}
                      </span>
                      <span className={`text-xs font-mono transition-opacity ${
                        hoveredSkill === skill.name ? 'opacity-100 text-primary' : 'opacity-0'
                      }`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary animate-[grow_1s_ease-out_forwards]"
                        style={{
                          width: `${skill.level}%`,
                          animationDelay: `${catIndex * 150 + skillIndex * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Floating Tech Icons */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {['🐍', '⚛️', '🧠', '🔥', '🌐', '📊', '🤖', '💻'].map((emoji, index) => (
            <div
              key={index}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
              style={{
                animationDelay: `${600 + index * 50}ms`,
                animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
