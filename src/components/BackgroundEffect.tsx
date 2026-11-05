import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const BackgroundEffect: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Primary Electric Blue Glowing Orb: Slowly drifts to create ambient depth */}
      <motion.div
        animate={prefersReducedMotion ? undefined : {
          x: [0, 45, -35, 0],
          y: [0, -50, 25, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/6 left-1/4 -translate-x-1/2 w-[520px] h-[520px] bg-blue-600/12 rounded-full blur-[140px]"
      />

      {/* Secondary Violet Glowing Orb: Counter-drifting */}
      <motion.div
        animate={prefersReducedMotion ? undefined : {
          x: [0, -55, 45, 0],
          y: [0, 60, -35, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-2/3 right-1/4 translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px]"
      />

      {/* Subtle Cyan Accent Orb near top right */}
      <motion.div
        animate={prefersReducedMotion ? undefined : {
          x: [0, 30, -20, 0],
          y: [0, 40, -25, 0],
          scale: [0.9, 1.1, 1, 0.9],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-10 right-10 w-[350px] h-[350px] bg-cyan-500/8 rounded-full blur-[120px]"
      />
    </div>
  );
};
