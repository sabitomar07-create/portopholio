import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, CheckCircle2, Copy, Check, Globe } from 'lucide-react';
import { Project } from '../types/portfolio';
import {
  modalSpringVariant,
  backdropVariant,
  buttonScaleProps,
} from '../utils/animations';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  // ESC key dismiss and body scroll lock
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const handleCopyLink = () => {
    if (!project) return;
    navigator.clipboard.writeText(project.demoUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          aria-describedby="project-modal-desc"
        >
          {/* Backdrop with blur (Animation 2) */}
          <motion.div
            variants={backdropVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container with 90% -> 100% spring animation & zoom-out exit (Animation 2 & 3) */}
          <motion.div
            variants={modalSpringVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass-surface relative w-full max-w-3xl border border-white/20 rounded-2xl shadow-2xl shadow-blue-950/50 overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]"
          >
            {/* Top Close Button */}
            <motion.button
              {...buttonScaleProps}
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-black/70 hover:bg-black text-neutral-300 hover:text-white border border-white/10 backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Close project details"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Scrollable Modal Content */}
            <div className="overflow-y-auto p-6 sm:p-8">
              {/* Project Image Banner */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-neutral-900 border border-white/10 mb-6">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
                  <span className="font-mono px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/15 text-blue-400">
                    {project.number}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/15 text-neutral-300">Concept preview</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>PROJECT SPOTLIGHT</span>
                </div>
                <h3
                  id="project-modal-title"
                  className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3"
                >
                  {project.title}
                </h3>
                <p id="project-modal-desc" className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Live URL Pill if available */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-xs text-neutral-300 truncate">
                  <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-mono text-neutral-200 truncate">{project.demoUrl}</span>
                </div>
                <motion.button
                  {...buttonScaleProps}
                  onClick={handleCopyLink}
                  className="ml-3 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors shrink-0"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Tech Stack Chips */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                  Concept tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono font-medium rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/25"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features List */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                  Preview notes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5 text-xs text-neutral-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3 text-xs text-blue-100/90 mb-6">
                <Sparkles className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                <span>This is a visual concept preview. The external link opens the linked page and may change over time.</span>
              </div>

              {/* Actions Footer */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                <motion.a
                  {...buttonScaleProps}
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Preview</span>
                </motion.a>

                <motion.button
                  {...buttonScaleProps}
                  onClick={handleCopyLink}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white border border-white/15 font-semibold text-sm tracking-wide transition-all"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedLink ? 'Copied' : 'Copy Preview Link'}</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
