import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import {
  logoFadeInVariant,
  navLinksContainerVariant,
  navLinkItemVariant,
  buttonScaleProps,
} from '../utils/animations';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenWelcome?: () => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'showreel', label: 'Showreel' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onOpenWelcome }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-surface fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080808]/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg shadow-black/50'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Brand Wordmark with Smooth Fade-In (Animation 1) */}
          <motion.div
            variants={logoFadeInVariant}
            initial="hidden"
            animate="visible"
          >
            <button
              onClick={() => handleLinkClick('home')}
              className="group flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1 -m-1"
              aria-label="Omar.dev home"
            >
              <span className="text-xl font-extrabold tracking-tight text-white font-mono group-hover:text-blue-400 transition-colors">
                OMAR<span className="text-blue-500">.DEV</span>
              </span>
            </button>
          </motion.div>

          {/* Desktop Nav Links: Sliding Into Position with Staggered Delays (Animation 1) */}
          <motion.nav
            variants={navLinksContainerVariant}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <motion.div key={item.id} variants={navLinkItemVariant}>
                  <button
                    onClick={() => handleLinkClick(item.id)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Primary Action CTA + Welcome Tour Replay */}
          <div className="hidden md:flex items-center gap-3">
            {onOpenWelcome && (
              <motion.button
                {...buttonScaleProps}
                onClick={onOpenWelcome}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-neutral-400 hover:text-blue-400 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                title="View welcome popup again"
              >
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>Tour</span>
              </motion.button>
            )}

            <motion.button
              {...buttonScaleProps}
              onClick={() => handleLinkClick('contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-white bg-blue-600/90 hover:bg-blue-600 rounded-lg shadow-sm hover:shadow-blue-500/25 border border-blue-500/30 transition-colors"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {onOpenWelcome && (
              <button
                onClick={onOpenWelcome}
                className="p-2 text-neutral-400 hover:text-blue-400 rounded-lg bg-white/5 border border-white/10"
                aria-label="Replay welcome popup"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white rounded-lg bg-white/5 border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with smooth slide animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-[#0d0d0d] border-b border-white/10 px-4 pt-3 pb-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-left text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
                        : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                  </button>
                );
              })}
              <div className="pt-3">
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-blue-600 text-white font-medium text-sm shadow-md shadow-blue-600/30 active:scale-98 transition-transform"
                >
                  <span>Let's Connect</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
