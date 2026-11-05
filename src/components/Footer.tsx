import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Code2, Heart, Sparkles } from 'lucide-react';
import { buttonScaleProps } from '../utils/animations';
import { LegalModal, type LegalDocument } from './LegalModal';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenWelcome?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenWelcome }) => {
  const [legalDocument, setLegalDocument] = useState<LegalDocument | null>(null);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="glass-surface relative z-10 border-t border-white/10 py-12 text-neutral-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-lg font-extrabold font-mono tracking-tight text-white mb-1">
              OMAR<span className="text-blue-500">.DEV</span>
            </span>
            <p className="text-xs text-neutral-400">
              Passionate beginner web developer building modern digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('showreel')}
              className="hover:text-white transition-colors"
            >
              Showreel
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="hover:text-white transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-white transition-colors"
            >
              Contact
            </button>
            {onOpenWelcome && (
              <button
                onClick={onOpenWelcome}
                className="hover:text-blue-400 text-purple-400 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Welcome Tour</span>
              </button>
            )}
          </div>

          {/* Back to top button */}
          <div>
            <motion.button
              {...buttonScaleProps}
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs font-medium transition-all group"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Credits & Authenticity */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span>OMAR.DEV · PERSONAL PORTFOLIO</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current animate-pulse" /> &amp; React
            </span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <button onClick={() => setLegalDocument('privacy')} className="hover:text-white transition-colors">Privacy &amp; cookies</button>
            <button onClick={() => setLegalDocument('terms')} className="hover:text-white transition-colors">Terms</button>
            <span>&copy; {currentYear} Omar</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-blue-400">
              <Code2 className="w-3 h-3" />
              <span>Portfolio</span>
            </span>
          </div>
        </div>
      </div>
      <LegalModal document={legalDocument} onClose={() => setLegalDocument(null)} />
    </footer>
  );
};
