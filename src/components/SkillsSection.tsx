import { useEffect, useRef, useState } from 'react';

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 75 },
      { name: 'C++', level: 70 },
      { name: 'SQL', level: 80 },
    ],
  },
  {
    title: 'AI/ML',
    skills: [
      { name: 'TensorFlow', level: 80 },
      { name: 'PyTorch', level: 75 },
      { name: 'Scikit-learn', level: 85 },
      { name: 'OpenCV', level: 70 },
      { name: 'Pandas', level: 90 },
    ],
  },
  {
    title: 'Web Dev',
    skills: [
      { name: 'React', level: 85 },
      { name: 'Node.js', level: 75 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Next.js', level: 70 },
      { name: 'MongoDB', level: 75 },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 65 },
      { name: 'VS Code', level: 95 },
      { name: 'Jupyter', level: 90 },
      { name: 'Linux', level: 75 },
    ],
  },
];

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
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

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 md:py-32 relative neural-grid"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-primary font-mono text-sm">{'// Skills & Technologies'}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            My <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A collection of technologies I've been working with and continuously learning
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className={`glass rounded-2xl p-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${catIndex * 150}ms` }}
            >
              <h3 className="text-lg font-semibold mb-6 text-center">
                <span className="text-primary">{'{'}</span>
                {' '}{category.title}{' '}
                <span className="text-primary">{'}'}</span>
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="group cursor-pointer"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {skill.name}
                      </span>
                      <span className={`text-xs font-mono transition-opacity ${
                        hoveredSkill === skill.name ? 'opacity-100 text-primary' : 'opacity-0'
                      }`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${catIndex * 150 + skillIndex * 100}ms`,
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
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {['🐍', '⚛️', '🧠', '🔥', '🌐', '📊', '🤖', '💻'].map((emoji, index) => (
            <div
              key={index}
              className={`w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transitionDelay: `${800 + index * 50}ms`,
                animation: isVisible ? `float ${3 + index * 0.5}s ease-in-out infinite` : 'none',
                animationDelay: `${index * 200}ms`,
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
