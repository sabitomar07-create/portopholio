import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Target, User, Heart } from 'lucide-react';
import {
  sectionHeaderVariant,
  profileScaleVariant,
  fadeInScaleVariant,
  staggerGridContainer,
} from '../utils/animations';

const INFO_CARDS = [
  {
    number: '01',
    title: 'CURRENT FOCUS',
    description: 'Learning modern web development and building interactive projects from scratch.',
    icon: Compass,
    accent: 'blue',
  },
  {
    number: '02',
    title: 'MY MINDSET',
    description: 'Stay curious. Keep building. Never stop improving with every commit.',
    icon: Sparkles,
    accent: 'purple',
  },
  {
    number: '03',
    title: 'MY GOAL',
    description: 'Become a skilled developer and create useful, high-impact digital experiences.',
    icon: Target,
    accent: 'emerald',
  },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Smooth reveal on scroll */}
        <motion.div
          variants={sectionHeaderVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
            <User className="w-3.5 h-3.5" />
            <span>ABOUT OMAR</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            BEHIND THE CODE.
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            I'm Omar, a beginner web developer learning how to build beautiful,
            interactive, and functional websites. I enjoy experimenting with designs,
            exploring new technologies, and improving my skills with every project.
          </p>
        </motion.div>

        {/* Content Grid: Profile Showcase + Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Profile Image: Animation 4 Smooth Scale Into View */}
          <motion.div
            variants={profileScaleVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group w-full max-w-sm">
              {/* Glowing Aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-40 group-hover:opacity-75 transition duration-500" />

              {/* Photo Frame */}
              <div className="relative bg-[#0d0e12] border border-white/15 rounded-3xl p-3 shadow-2xl overflow-hidden">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-900">
                  <img
                    src="/src/assets/images/omar_profile_portrait_1793661547086.jpg"
                    alt="Omar - Web Developer Portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle vignette scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Corner indicator */}
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-neutral-200">
                    <span className="font-mono text-blue-400">omar@dev-workspace</span>
                    <span className="flex items-center gap-1 text-[11px] text-neutral-400">
                      <Heart className="w-3 h-3 text-rose-400 fill-current" /> Code &amp; Coffee
                    </span>
                  </div>
                </div>

                <div className="mt-3 px-2 py-1 text-center">
                  <p className="text-xs text-neutral-400 font-mono">
                    Profile Photo · Easily swappable asset
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Three Animated Info Cards: Staggered Fade-In & Slide-Up */}
          <motion.div
            variants={staggerGridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-7 flex flex-col gap-5"
          >
            {INFO_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.number}
                  variants={fadeInScaleVariant}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-[#0e0f14]/80 border border-white/10 hover:border-blue-500/40 rounded-2xl p-6 sm:p-7 backdrop-blur-md transition-all shadow-lg hover:shadow-blue-900/20"
                >
                  <div className="flex items-start gap-5">
                    {/* Number and Icon Accent */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-mono text-blue-400 font-semibold tracking-wider">
                          {card.number}.
                        </span>
                        <h3 className="text-lg font-bold text-white tracking-tight">
                          {card.title}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
