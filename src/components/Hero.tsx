import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  Sparkles,
  Play,
  Cpu,
  Laptop,
} from 'lucide-react';
import {
  heroZoomOutVariant,
  headingStaggerContainer,
  headingWordRevealVariant,
  subtitleRevealVariant,
  ctaButtonUpwardVariant,
  fadeInScaleVariant,
  buttonScaleProps,
} from '../utils/animations';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

const ROLES = [
  'Frontend Developer',
  'Creative Coder',
  'Future Full-Stack Developer',
  'Digital Creator',
];

const HEADING_WORDS = ['HEY,', "I'M", 'OMAR.'];

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  // Dynamic typing animation state
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'profile' | 'vision'>('profile');
  const [codeExecuted, setCodeExecuted] = useState(true);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        }, 85);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length - 1));
        }, 45);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Animation 3: Zoom-Out container effect (1.08 -> 1.0 settling) */}
        <motion.div
          variants={heroZoomOutVariant}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Left Column: Typographic & CTA Content */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Availability Badge */}
            <motion.div
              variants={fadeInScaleVariant}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-medium tracking-wide uppercase mb-6 glow-subtle"
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>PERSONAL WEB PROJECTS</span>
            </motion.div>

            {/* Animation 1: Main Heading with Staggered Text Reveal */}
            <motion.h1
              variants={headingStaggerContainer}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-2 leading-[1.08] flex flex-wrap gap-x-3.5 sm:gap-x-5"
            >
              {HEADING_WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  variants={headingWordRevealVariant}
                  className={
                    i === HEADING_WORDS.length - 1
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 inline-block'
                      : 'inline-block'
                  }
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Animation 1: Second Heading Fades in after Heading */}
            <motion.h2
              variants={subtitleRevealVariant}
              initial="hidden"
              animate="visible"
              className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-200 mb-4"
            >
              I BUILD DIGITAL EXPERIENCES.
            </motion.h2>

            {/* Dynamic Typing Title */}
            <motion.div
              variants={fadeInScaleVariant}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="h-10 sm:h-12 flex items-center mb-6 text-xl sm:text-2xl font-mono text-blue-400 font-semibold"
            >
              <span className="text-neutral-500 mr-2">&gt;</span>
              <span>{displayedText}</span>
              <span className="w-2.5 h-6 ml-1 bg-blue-500 animate-pulse inline-block" />
            </motion.div>

            {/* Description Paragraph */}
            <motion.p
              variants={fadeInScaleVariant}
              initial="hidden"
              animate="visible"
              custom={0.5}
              className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed mb-9"
            >
              I'm a beginner web developer passionate about creating modern websites,
              experimenting with technology, and turning ideas into reality. Focused on
              clean UI, responsive architecture, and fluid user interactions.
            </motion.p>

            {/* Animation 1: CTA Buttons Animate Into View with Upward Movement + Interactive Scaling */}
            <motion.div
              variants={ctaButtonUpwardVariant}
              initial="hidden"
              animate="visible"
              custom={0.65}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <motion.button
                {...buttonScaleProps}
                onClick={() => onNavigate('projects')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 group"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </motion.button>

              <motion.button
                {...buttonScaleProps}
                onClick={() => onNavigate('showreel')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 hover:text-white border border-purple-500/30 hover:border-purple-500/60 font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2 group shadow-sm shadow-purple-500/10"
              >
                <Play className="w-4 h-4 text-purple-400 fill-purple-400/30 group-hover:scale-110 transition-transform" />
                <span>15S SHOWREEL</span>
              </motion.button>

              <motion.button
                {...buttonScaleProps}
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white border border-white/15 hover:border-white/25 font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2"
              >
                <span>LET'S CONNECT</span>
                <Sparkles className="w-4 h-4 text-purple-400" />
              </motion.button>
            </motion.div>

          </div>

          {/* Right Column: Floating Interactive Code Studio Window */}
          <div className="lg:col-span-5 relative">
            {/* Ambient Backlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl -z-10" />

            {/* Interactive Window Card */}
            <motion.div
              variants={fadeInScaleVariant}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="glass-surface w-full border border-white/15 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Window Title Bar */}
              <div className="glass-inset flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-xs font-mono text-neutral-400">developer@omar-portfolio:~</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCodeExecuted(!codeExecuted)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-mono border border-blue-500/30 transition-colors"
                    title="Toggle simulated execution preview"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{codeExecuted ? 'Preview' : 'Raw'}</span>
                  </button>
                </div>
              </div>

              {/* Window Tabs */}
              <div className="glass-inset flex items-center px-4 border-b border-white/5 text-xs font-mono">
                <button
                  onClick={() => setActiveCodeTab('profile')}
                  className={`px-3 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeCodeTab === 'profile'
                      ? 'border-blue-500 text-white font-medium bg-white/5'
                      : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  <span>Developer.ts</span>
                </button>
                <button
                  onClick={() => setActiveCodeTab('vision')}
                  className={`px-3 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeCodeTab === 'vision'
                      ? 'border-purple-500 text-white font-medium bg-white/5'
                      : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5 text-purple-400" />
                  <span>Goals.json</span>
                </button>
              </div>

              {/* Code Content Area */}
              <div className="glass-inset p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[260px]">
                {activeCodeTab === 'profile' ? (
                  <div>
                    <div className="text-neutral-500">// Omar's Developer Blueprint</div>
                    <div>
                      <span className="text-purple-400">const</span>{' '}
                      <span className="text-blue-400">developer</span> = &#123;
                    </div>
                    <div className="pl-4">
                      <span className="text-neutral-300">name:</span>{' '}
                      <span className="text-emerald-400">"Omar"</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-neutral-300">level:</span>{' '}
                      <span className="text-emerald-400">"Beginner Web Developer"</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-neutral-300">location:</span>{' '}
                      <span className="text-emerald-400">"Earth"</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-neutral-300">passion:</span> [
                      <span className="text-amber-300">"React"</span>,{' '}
                      <span className="text-amber-300">"Clean UI"</span>,{' '}
                      <span className="text-amber-300">"Animations"</span>],
                    </div>
                    <div className="pl-4">
                      <span className="text-neutral-300">portfolio:</span>{' '}
                      <a
                        href="https://portopholio-one.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline"
                      >
                        "portopholio-one.vercel.app"
                      </a>,
                    </div>
                    <div className="pl-4">
                      <span className="text-neutral-300">muslimShirts:</span>{' '}
                      <a
                        href="https://muslims-8ahziv1yy-omar-5997.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline"
                      >
                        "muslim-shirts.vercel.app"
                      </a>,
                    </div>
                    <div className="pl-4">
                      <span className="text-neutral-300">curiosity:</span>{' '}
                      <span className="text-blue-400">Infinity</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-neutral-300">status:</span>{' '}
                      <span className="text-emerald-400">"Building &amp; Learning Daily"</span>
                    </div>
                    <div>&#125;;</div>
                    <div className="mt-3 text-neutral-400">
                      <span className="text-purple-400">export default</span> developer;
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-neutral-500">&#47;* Current Road &amp; Aspirations *&#47;</div>
                    <div className="text-neutral-400">&#123;</div>
                    <div className="pl-4">
                      <span className="text-purple-300">"target2026"</span>: <span className="text-emerald-400">"Full-Stack Mastery"</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-purple-300">"dailyRoutine"</span>: [
                        <br />
                        <span className="pl-4 text-neutral-300">"1. Build real web apps"</span>,
                        <br />
                        <span className="pl-4 text-neutral-300">"2. Master JavaScript concepts"</span>,
                        <br />
                        <span className="pl-4 text-neutral-300">"3. Refine responsive UI craft"</span>
                        <br />
                      ],
                    </div>
                    <div className="pl-4">
                      <span className="text-purple-300">"openForCollaboration"</span>: <span className="text-blue-400">true</span>
                    </div>
                    <div className="text-neutral-400">&#125;</div>
                  </div>
                )}

                {/* Execution preview output if toggled */}
                {codeExecuted && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-sans text-neutral-300 bg-white/[0.02] p-2.5 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-neutral-400">Status:</span>
                      <span className="text-emerald-300 font-medium">Ready to build your next project</span>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-500">200 OK</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
