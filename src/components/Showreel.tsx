import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Film,
  Sparkles,
  Code2,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Layers,
  Cpu,
} from 'lucide-react';
import { buttonScaleProps, SMOOTH_EASE } from '../utils/animations';
import portfolioPreview from '../assets/images/project_omar_portfolio_preview_1793731034310.jpg';
import storePreview from '../assets/images/project_muslims_preview_1793662392866.jpg';

interface ShowreelProps {
  onNavigate: (sectionId: string) => void;
}

const DURATION_SECONDS = 15;

const CHAPTERS = [
  { id: 1, start: 0, end: 3, label: '01. INTRO', title: 'Cinematic Reveal' },
  { id: 2, start: 3, end: 6, label: '02. CODE', title: 'Creative Web Craft' },
  { id: 3, start: 6, end: 9, label: '03. 3D MOTION', title: 'Kinetic Dimensions' },
  { id: 4, start: 9, end: 12, label: '04. PROJECTS', title: 'Project Previews' },
  { id: 5, start: 12, end: 15, label: '05. FINALE', title: "Let's Build" },
];

export const Showreel: React.FC<ShowreelProps> = ({ onNavigate }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [autoLoop, setAutoLoop] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef<boolean>(isPlaying);
  const currentTimeRef = useRef<number>(0);
  isPlayingRef.current = isPlaying;

  useEffect(() => {
    if (prefersReducedMotion === false) setIsPlaying(true);
    if (prefersReducedMotion === true) setIsPlaying(false);
  }, [prefersReducedMotion]);

  // Synthesize soft ambient chords via Web Audio API (zero external assets, hermetic & high fidelity)
  const playSynthesizerNote = useCallback((freq: number, duration = 0.8) => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }, [isMuted]);

  // High-precision animation clock (60fps requestAnimationFrame)
  useEffect(() => {
    let lastTimestamp = performance.now();
    let animFrame: number;

    const tick = (now: number) => {
      const delta = Math.min((now - lastTimestamp) / 1000, 0.1);
      lastTimestamp = now;

      if (isPlayingRef.current) {
        const next = currentTimeRef.current + delta;
        if (next >= DURATION_SECONDS) {
          if (autoLoop) {
            playSynthesizerNote(440, 0.4);
            currentTimeRef.current = 0;
            setCurrentTime(0);
          } else {
            currentTimeRef.current = DURATION_SECONDS;
            setCurrentTime(DURATION_SECONDS);
            setIsPlaying(false);
          }
        } else {
          currentTimeRef.current = next;
          setCurrentTime(next);
        }
      }
      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [autoLoop, prefersReducedMotion, playSynthesizerNote]);

  // Trigger sound cues at scene transitions
  const lastSceneRef = useRef<number>(0);
  useEffect(() => {
    const currentScene = Math.floor(currentTime / 3);
    if (currentScene !== lastSceneRef.current && currentScene >= 0 && currentScene <= 4) {
      lastSceneRef.current = currentScene;
      const notes = [261.63, 329.63, 392.0, 523.25, 659.25];
      playSynthesizerNote(notes[currentScene] || 440, 1.2);
    }
  }, [currentTime, playSynthesizerNote]);

  const togglePlay = () => {
    if (currentTime >= DURATION_SECONDS) {
      currentTimeRef.current = 0;
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const jumpToChapter = (startSeconds: number) => {
    currentTimeRef.current = startSeconds;
    setCurrentTime(startSeconds);
    setIsPlaying(true);
  };

  const handleFullscreenToggle = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => document.removeEventListener('fullscreenchange', syncFullscreen);
  }, []);

  // Determine current scene: 0 (0-3s), 1 (3-6s), 2 (6-9s), 3 (9-12s), 4 (12-15s)
  const scene = Math.min(Math.floor(currentTime / 3), 4);
  const progressPercent = Math.min((currentTime / DURATION_SECONDS) * 100, 100);

  return (
    <section id="showreel" className="py-20 sm:py-28 relative z-10 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-3">
              <Film className="w-3.5 h-3.5" />
              <span>15-SECOND CINEMATIC SHOWREEL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
              MOTION &amp; DIGITAL CRAFT.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
              A short animated preview of this portfolio, with motion graphics and project concepts.
            </p>
          </div>

          {/* Quick Scene Jump Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#0f1015] border border-white/10 rounded-xl overflow-x-auto max-w-full">
            {CHAPTERS.map((ch, idx) => {
              const isActive = scene === idx;
              return (
                <button
                  key={ch.id}
                  onClick={() => jumpToChapter(ch.start)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={isActive ? 'text-blue-200' : 'text-neutral-500'}>0{ch.id}</span>
                  <span className="hidden sm:inline">{ch.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cinematic Theatrical Viewport Container */}
        <div
          ref={containerRef}
          className={`glass-surface relative w-full rounded-2xl sm:rounded-3xl border border-white/15 overflow-hidden shadow-2xl shadow-black/80 transition-all ${
            isFullscreen ? 'h-screen rounded-none border-none' : 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] min-h-[440px] sm:min-h-[520px]'
          }`}
        >
          {/* Ambient Spotlight Glow behind the canvas */}
          <div className="absolute inset-0 bg-radial from-blue-900/20 via-black to-black pointer-events-none" />

          {/* Subtle Film Grain / Grid Lines Layer */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

          {/* Cinematic 2.39:1 Letterbox Accent Frames */}
          <div className="absolute top-0 left-0 right-0 h-4 sm:h-6 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
          <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-6 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />

          {/* Top Cinema HUD Telemetry Bar */}
          <div className="absolute top-4 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-[11px] font-mono text-neutral-400 z-30 pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-white font-semibold tracking-wider">PORTFOLIO PREVIEW</span>
              <span className="text-neutral-600 hidden sm:inline">|</span>
              <span className="text-blue-400 hidden sm:inline">OMAR_SHOWREEL.MP4</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">
                SCENE 0{scene + 1}/05 · {CHAPTERS[scene]?.title}
              </span>
              <span className="tabular-nums font-mono text-white">
                {currentTime.toFixed(1)}s / 15.0s
              </span>
            </div>
          </div>

          {/* =========================================================================
              SCENE 1: 0–3s — DRAMATIC CINEMATIC OPENING (Name, Title, Glowing Flare)
              ========================================================================= */}
          <AnimatePresence mode="wait">
            {scene === 0 && (
              <motion.div
                key="scene-1"
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                transition={{ duration: 0.85, ease: SMOOTH_EASE }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10"
              >
                {/* Background glowing horizon streak */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '80%', opacity: 0.8 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="absolute h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-[1px]"
                />

                {/* Subtitle kicker with tracking expansion */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-blue-400 mb-4"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CREATIVE DEVELOPER PORTFOLIO</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </motion.div>

                {/* Massive Architectural Typography Inspired by Thibaut Foussard & Claudio Guglieri */}
                <motion.h1
                  initial={{ opacity: 0, y: 30, letterSpacing: '0.1em' }}
                  animate={{ opacity: 1, y: 0, letterSpacing: '0.04em' }}
                  transition={{ delay: 0.4, duration: 0.9, ease: SMOOTH_EASE }}
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none mb-3 drop-shadow-[0_10px_35px_rgba(59,130,246,0.4)]"
                >
                  OMAR<span className="text-blue-500">.</span>
                </motion.h1>

                {/* Kinetic Subtitle with gradient sweep */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                  className="text-lg sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-blue-300 to-purple-300 tracking-wide mb-6"
                >
                  BUILDING DIGITAL EXPERIENCES
                </motion.p>

                {/* Lower telemetry coordinate strip */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="flex items-center gap-4 text-[11px] font-mono text-neutral-500"
                >
                  <span>LAT: 24.7136° N</span>
                  <span>·</span>
                  <span>FRONTEND CRAFT</span>
                  <span>·</span>
                  <span>MOTION ARCHITECTURE</span>
                </motion.div>
              </motion.div>
            )}

            {/* =========================================================================
                SCENE 2: 3–6s — CREATIVE WEB DEVELOPMENT VISUALS & CODE GRAPHICS
                ========================================================================= */}
            {scene === 1 && (
              <motion.div
                key="scene-2"
                initial={{ opacity: 0, scale: 0.92, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }}
                transition={{ duration: 0.8, ease: SMOOTH_EASE }}
                className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 z-10"
              >
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left: Floating 3D Code Sandbox Panel */}
                  <div className="md:col-span-7 bg-[#0d0f15]/90 border border-blue-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-xl relative">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono text-neutral-400">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="ml-2 text-white font-medium">ShowreelEngine.tsx</span>
                      </div>
                      <span className="text-blue-400">MOTION PREVIEW</span>
                    </div>

                    <div className="font-mono text-xs sm:text-sm text-neutral-300 space-y-1.5 leading-relaxed">
                      <div>
                        <span className="text-purple-400">import</span> &#123;{' '}
                        <span className="text-cyan-300">Motion</span>,{' '}
                        <span className="text-cyan-300">FluidUI</span> &#125;{' '}
                        <span className="text-purple-400">from</span>{' '}
                        <span className="text-emerald-400">'@omar/core'</span>;
                      </div>
                      <div>
                        <span className="text-purple-400">const</span>{' '}
                        <span className="text-blue-400">craft</span> = &#123;
                      </div>
                      <div className="pl-4">
                        <span className="text-neutral-400">stack:</span> [
                        <span className="text-amber-300">"React"</span>,{' '}
                        <span className="text-amber-300">"Tailwind"</span>,{' '}
                        <span className="text-amber-300">"Motion"</span>],
                      </div>
                      <div className="pl-4">
                        <span className="text-neutral-400">philosophy:</span>{' '}
                        <span className="text-emerald-400">"Precision &amp; Usability"</span>,
                      </div>
                      <div className="pl-4">
                        <span className="text-neutral-400">renderMode:</span>{' '}
                        <span className="text-cyan-300">"Production"</span>
                      </div>
                      <div>&#125;;</div>
                    </div>

                    {/* Progress compile simulation */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2.4, ease: 'linear' }}
                      className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full mt-4"
                    />
                  </div>

                  {/* Right: Floating UI Badges in 3D perspective */}
                  <div className="md:col-span-5 flex flex-col gap-3">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="p-3.5 rounded-xl bg-gradient-to-r from-blue-950/80 to-[#12131b] border border-blue-500/40 shadow-xl flex items-center gap-3"
                    >
                      <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Full-Stack Architecture</div>
                        <div className="text-[11px] text-neutral-400 font-mono">React 19 · Vite · TypeScript</div>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                      className="p-3.5 rounded-xl bg-gradient-to-r from-purple-950/80 to-[#12131b] border border-purple-500/40 shadow-xl flex items-center gap-3"
                    >
                      <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Pixel-Perfect Layouts</div>
                        <div className="text-[11px] text-neutral-400 font-mono">Zero Layout Shifts · Tailwind v4</div>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                      className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-[#12131b] border border-emerald-500/40 shadow-xl flex items-center gap-3"
                    >
                      <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Hardware Accelerated</div>
                        <div className="text-[11px] text-neutral-400 font-mono">Spring Easing · 60fps Curves</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* =========================================================================
                SCENE 3: 6–9s — 3D PERSPECTIVE, KINETIC TYPOGRAPHY & VISUAL EFFECTS
                ========================================================================= */}
            {scene === 2 && (
              <motion.div
                key="scene-3"
                initial={{ opacity: 0, scale: 0.88, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(8px)' }}
                transition={{ duration: 0.8, ease: SMOOTH_EASE }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10"
              >
                {/* 3D Wireframe Orbit Rings (CSS 3D perspective) */}
                <div className="absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full border border-blue-500/20 animate-spin [animation-duration:24s] pointer-events-none" />
                <div className="absolute w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full border border-purple-500/20 animate-spin [animation-duration:16s] [animation-direction:reverse] pointer-events-none" />

                {/* Giant Bold Perspective Typography Inspired by Awwwards & Claudio Guglieri */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="text-xs font-mono tracking-[0.3em] uppercase text-purple-400 mb-3"
                >
                  DIMENSIONAL CREATIVITY
                </motion.div>

                <h3 className="text-4xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400 tracking-tight leading-none mb-4">
                  FLUID MOTION
                </h3>

                {/* Kinetic Moving Words Grid */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-2xl mx-auto mb-6">
                  {['RESPONSIVE', 'INTERACTIVE', 'ACCESSIBLE', 'PERFORMANT', 'INNOVATIVE'].map((tag, idx) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.15 * idx, duration: 0.5 }}
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm font-mono text-neutral-300 font-medium shadow-md"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <div className="text-xs font-mono text-neutral-400 max-w-md">
                  Combining modern engineering with thoughtful visual storytelling.
                </div>
              </motion.div>
            )}

            {/* =========================================================================
                SCENE 4: 9–12s — PROJECT CONCEPT PREVIEWS
                ========================================================================= */}
            {scene === 3 && (
              <motion.div
                key="scene-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                transition={{ duration: 0.8, ease: SMOOTH_EASE }}
                className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 z-10"
              >
                <div className="text-center mb-5">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>PROJECT CONCEPTS</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    FEATURED PORTFOLIO PROJECTS
                  </h3>
                </div>

                {/* Visual previews */}
                <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-surface group relative border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col justify-between"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 mb-3 border border-white/10">
                      <img
                        src={portfolioPreview}
                        alt="Portfolio concept preview"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-blue-400 border border-white/10">
                        01. PORTFOLIO
                      </div>
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-600/90 text-[10px] font-mono text-white font-semibold">
                        CONCEPT
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white mb-1">Omar Portfolio</h4>
                      <p className="text-xs text-neutral-300 mb-3 line-clamp-2">
                        A visual portfolio concept with animated sections and project cards.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-blue-400">
                      <span>Portfolio concept</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-surface group relative border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col justify-between"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 mb-3 border border-white/10">
                      <img
                        src={storePreview}
                        alt="Clothing storefront concept preview"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-white/10">
                        02. E-COMMERCE
                      </div>
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-600/90 text-[10px] font-mono text-white font-semibold">
                        CONCEPT
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white mb-1">Muslim Shirts Store</h4>
                      <p className="text-xs text-neutral-300 mb-3 line-clamp-2">
                        A clothing storefront concept focused on product presentation.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-emerald-400">
                      <span>Storefront concept</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* =========================================================================
                SCENE 5: 12–15s — POWERFUL CINEMATIC FINALE & CALL-TO-ACTION
                ========================================================================= */}
            {scene === 4 && (
              <motion.div
                key="scene-5"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: SMOOTH_EASE }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10"
              >
                {/* Glowing radial core */}
                <div className="absolute w-[300px] h-[300px] bg-gradient-to-tr from-blue-600/30 to-purple-600/30 rounded-full blur-3xl pointer-events-none" />

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-mono mb-4"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AVAILABLE FOR YOUR NEXT BIG VISION</span>
                </motion.div>

                <h3 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-2">
                  OMAR<span className="text-blue-500">.</span>
                </h3>

                <p className="text-base sm:text-xl font-medium text-neutral-300 mb-6">
                  WEB DEVELOPER &amp; CREATIVE CODER
                </p>

                {/* Primary Call To Action */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex flex-col sm:flex-row items-center gap-3.5"
                >
                  <motion.button
                    {...buttonScaleProps}
                    onClick={() => onNavigate('contact')}
                    className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-blue-600/40 flex items-center gap-2 group transition-all"
                  >
                    <span>LET'S BUILD SOMETHING AMAZING</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <motion.button
                    {...buttonScaleProps}
                    onClick={() => jumpToChapter(0)}
                    className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white border border-white/15 text-sm font-semibold flex items-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Replay Showreel</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Interactive Transport & Scrubber Bar */}
          <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6 z-30 flex flex-col gap-2.5">
            {/* 15-Second Segmented Timeline Scrubber */}
            <div className="w-full flex items-center gap-1.5 cursor-pointer py-1" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              setCurrentTime(ratio * DURATION_SECONDS);
              setIsPlaying(true);
            }}>
              {CHAPTERS.map((ch, idx) => {
                const chapterStartPct = (ch.start / DURATION_SECONDS) * 100;
                const chapterEndPct = (ch.end / DURATION_SECONDS) * 100;
                const isChapterActive = scene === idx;
                
                // Chapter progress fraction
                let fillPct = 0;
                if (currentTime >= ch.end) {
                  fillPct = 100;
                } else if (currentTime > ch.start) {
                  fillPct = ((currentTime - ch.start) / (ch.end - ch.start)) * 100;
                }

                return (
                  <div
                    key={ch.id}
                    className="relative flex-1 h-1.5 rounded-full bg-white/15 overflow-hidden transition-all hover:h-2.5"
                    title={`${ch.label}: ${ch.title}`}
                  >
                    <div
                      className={`h-full transition-all duration-75 ${
                        isChapterActive
                          ? 'bg-gradient-to-r from-blue-400 to-indigo-400'
                          : fillPct === 100
                          ? 'bg-blue-500'
                          : 'bg-transparent'
                      }`}
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Control Bar: Play/Pause, Audio, Chapters, Fullscreen */}
            <div className="flex items-center justify-between text-xs text-neutral-300 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                  aria-label={isPlaying ? 'Pause Showreel' : 'Play Showreel'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                {/* Restart */}
                <button
                  onClick={() => jumpToChapter(0)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                  aria-label="Restart Showreel"
                  title="Restart Showreel (0:00)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Mute/Sound Toggle */}
                <button
                  onClick={() => {
                    setIsMuted(!isMuted);
                    if (isMuted) playSynthesizerNote(440, 0.4);
                  }}
                  className={`p-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                    !isMuted
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'hover:bg-white/10 text-neutral-400 hover:text-white'
                  }`}
                  aria-label={isMuted ? 'Unmute Ambient Sound' : 'Mute Sound'}
                  title={isMuted ? 'Enable Ambient Synth Chimes' : 'Mute Sound'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-blue-400" />}
                  <span className="hidden sm:inline text-[11px] font-mono">
                    {isMuted ? 'Sound Off' : 'Sound On'}
                  </span>
                </button>
              </div>

              {/* Center Time Display */}
              <div className="font-mono text-[11px] tabular-nums text-neutral-300">
                <span className="text-blue-400 font-semibold">{currentTime.toFixed(1)}s</span>
                <span className="text-neutral-600"> / </span>
                <span>{DURATION_SECONDS}.0s</span>
              </div>

              {/* Right: Loop & Fullscreen */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAutoLoop(!autoLoop)}
                  className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                    autoLoop ? 'text-blue-400 bg-blue-500/10' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                  title="Toggle Auto Loop"
                >
                  {autoLoop ? 'Loop: On' : 'Loop: Off'}
                </button>

                <button
                  onClick={handleFullscreenToggle}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                  aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
