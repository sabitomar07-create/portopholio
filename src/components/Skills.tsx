import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  FileCode,
  Braces,
  Atom,
  Palette,
  GitBranch,
  Layers,
  Sparkles,
  BookOpen,
  Check,
} from 'lucide-react';
import {
  sectionHeaderVariant,
  staggerGridContainer,
  skillCardVariant,
  skillIconVariant,
  buttonScaleProps,
} from '../utils/animations';
import { Skill } from '../types/portfolio';

const SKILLS_DATA: Skill[] = [
  {
    id: 'html5',
    name: 'HTML5',
    category: 'core',
    status: 'Mastered',
    description: 'Semantic markup, accessible page structure, and modern SEO-friendly document layouts.',
    iconName: 'FileCode',
    color: '#E34F26',
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'core',
    status: 'Mastered',
    description: 'Flexbox, CSS Grid systems, custom keyframe animations, media queries, and responsive flow.',
    iconName: 'Palette',
    color: '#1572B6',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'core',
    status: 'Mastered',
    description: 'Modern ES6+ syntax, DOM manipulation, asynchronous programming, APIs, and event handling.',
    iconName: 'Braces',
    color: '#F7DF1E',
  },
  {
    id: 'react',
    name: 'React',
    category: 'framework',
    status: 'Actively Learning',
    description: 'Component architecture, state management with hooks, props passing, and dynamic rendering.',
    iconName: 'Atom',
    color: '#61DAFB',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'framework',
    status: 'Mastered',
    description: 'Utility-first styling, rapid UI prototyping, responsive classes, and custom theme systems.',
    iconName: 'Layers',
    color: '#38BDF8',
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'tools',
    status: 'Actively Learning',
    description: 'Version control workflows, committing code, branching strategies, and repository management.',
    iconName: 'GitBranch',
    color: '#F05032',
  },
];

export const Skills: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'Mastered' | 'Actively Learning'>('all');

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    if (filter === 'all') return true;
    return skill.status === filter;
  });

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCode':
        return <FileCode className="w-6 h-6" />;
      case 'Palette':
        return <Palette className="w-6 h-6" />;
      case 'Braces':
        return <Braces className="w-6 h-6" />;
      case 'Atom':
        return <Atom className="w-6 h-6" />;
      case 'Layers':
        return <Layers className="w-6 h-6" />;
      case 'GitBranch':
        return <GitBranch className="w-6 h-6" />;
      default:
        return <Code className="w-6 h-6" />;
    }
  };

  return (
    <section id="skills" className="py-24 sm:py-32 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={sectionHeaderVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KNOWLEDGE &amp; TOOLS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            MY TECH STACK
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            Here are the technologies I work with daily. I clearly separate the foundational skills I have mastered from the modern frameworks and tools I am actively studying.
          </p>

          {/* Interactive Filter Control */}
          <div className="flex items-center justify-center gap-2 mt-8 p-1.5 bg-[#12131a] border border-white/10 rounded-xl max-w-md mx-auto">
            <motion.button
              {...buttonScaleProps}
              onClick={() => setFilter('all')}
              className={`flex-1 px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Skills ({SKILLS_DATA.length})
            </motion.button>
            <motion.button
              {...buttonScaleProps}
              onClick={() => setFilter('Mastered')}
              className={`flex-1 px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                filter === 'Mastered'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Mastered
            </motion.button>
            <motion.button
              {...buttonScaleProps}
              onClick={() => setFilter('Actively Learning')}
              className={`flex-1 px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                filter === 'Actively Learning'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Learning
            </motion.button>
          </div>
        </motion.div>

        {/* Skills Grid: Animated with Staggered Entrance */}
        <motion.div
          key={filter}
          variants={staggerGridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill) => {
            const isMastered = skill.status === 'Mastered';
            return (
              <motion.div
                key={skill.id}
                variants={skillCardVariant}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="group relative bg-[#0e0f14]/85 border border-white/10 hover:border-blue-500/40 rounded-2xl p-6 sm:p-7 backdrop-blur-md transition-all shadow-lg hover:shadow-blue-900/25 flex flex-col justify-between"
              >
                {/* Hover Ambient Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  {/* Top Bar inside Card: Icon with Staggered Micro Scale + Status Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <motion.div
                      variants={skillIconVariant}
                      className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:text-blue-400 group-hover:border-blue-500/30 transition-colors"
                    >
                      {getSkillIcon(skill.iconName)}
                    </motion.div>

                    {/* Honest status badge */}
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                        isMastered
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                          : 'bg-purple-500/10 text-purple-400 border border-purple-500/25'
                      }`}
                    >
                      {isMastered ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Mastered</span>
                        </>
                      ) : (
                        <>
                          <BookOpen className="w-3 h-3" />
                          <span>Actively Learning</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-xl font-bold text-white tracking-tight mb-2.5 group-hover:text-blue-300 transition-colors">
                    {skill.name}
                  </h3>

                  {/* Skill Description */}
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Bottom Progress Note */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>Category: {skill.category}</span>
                  <span className="text-blue-400 group-hover:translate-x-1 transition-transform">
                    {isMastered ? 'Ready for projects' : 'Building projects daily'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
