import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Terminal, ArrowRight } from 'lucide-react';
import {
  welcomePopupVariant,
  backdropVariant,
  buttonScaleProps,
} from '../utils/animations';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose }) => {
  // Handle ESC key press and scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-modal-title"
          aria-describedby="welcome-modal-desc"
        >
          {/* Subtle Backdrop with blur (Animation 2) */}
          <motion.div
            variants={backdropVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card: Scales 90% -> 100% spring animation & zoom-out exit (Animation 2 & 3) */}
          <motion.div
            variants={welcomePopupVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-lg bg-[#0f0f11] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-blue-900/30 overflow-hidden z-10"
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <motion.button
              {...buttonScaleProps}
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-lg text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Close welcome modal"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Top Icon Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-5">
              <Terminal className="w-3.5 h-3.5" />
              <span>HELLO_WORLD // v1.0</span>
            </div>

            {/* Modal Heading & Subtitle */}
            <h2
              id="welcome-modal-title"
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3"
            >
              WELCOME TO OMAR'S <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                DIGITAL WORLD.
              </span>
            </h2>

            <p
              id="welcome-modal-desc"
              className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6"
            >
              Building the future, one line of code at a time. Explore interactive projects, my current tech stack, and the creative passion driving my journey into web development.
            </p>

            {/* Interactive Highlights */}
            <div className="grid grid-cols-2 gap-3 mb-6 text-xs text-neutral-400">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Motion-crafted portfolio</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5">
                <Terminal className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Interactive code sandbox</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                {...buttonScaleProps}
                onClick={onClose}
                autoFocus
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <span>LET'S EXPLORE</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
