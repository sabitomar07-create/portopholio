import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Copy, Check, FolderGit2, Sparkles } from 'lucide-react';
import {
  sectionHeaderVariant,
  staggerGridContainer,
  projectCardFadeScaleVariant,
  previewZoomOutVariant,
  buttonScaleProps,
} from '../utils/animations';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import portfolioPreview from '../assets/images/project_omar_portfolio_preview_1793731034310.jpg';
import storePreview from '../assets/images/project_muslims_preview_1793662392866.jpg';

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'omar-portfolio',
    number: 'PROJECT 01',
    title: 'OMAR PORTFOLIO',
    description: 'A portfolio site concept with a dark visual style and animated sections.',
    longDescription: 'A visual portfolio concept exploring a dark interface, animated sections, and project cards.',
    technologies: ['Portfolio concept', 'Interface design'],
    imageUrl: portfolioPreview,
    demoUrl: 'https://portopholio-one.vercel.app/',
    features: ['Portfolio page concept', 'Animated section transitions', 'Project card layout'],
  },
  {
    id: 'muslim-shirts',
    number: 'PROJECT 02',
    title: 'MUSLIM SHIRTS',
    description: 'A storefront concept for a clothing brand, shown as a visual preview.',
    longDescription: 'A clothing storefront concept exploring product presentation and a responsive shop layout.',
    technologies: ['Storefront concept', 'Product layout'],
    imageUrl: storePreview,
    demoUrl: 'https://muslims-8ahziv1yy-omar-5997.vercel.app/',
    features: ['Storefront page concept', 'Apparel product presentation', 'Shop layout preview'],
  },
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyNotice = (id: string, url: string) => {
    setCopiedId(id);
    navigator.clipboard.writeText(url);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="projects" className="py-24 sm:py-32 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={sectionHeaderVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            PROJECT PREVIEWS
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-6">
            A small collection of portfolio and storefront concepts.
          </p>

        </motion.div>

        {/* Project concept previews */}
        <motion.div
          variants={staggerGridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {INITIAL_PROJECTS.map((project) => {
            return (
              <motion.article
                key={project.id}
                variants={projectCardFadeScaleVariant}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="glass-surface group relative border rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 border-white/10 hover:border-blue-400/50"
              >
                {/* Subtle ambient hover glow gradient inside card */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Project preview image with entrance zoom settling and hover zoom */}
                <div
                  onClick={() => setSelectedProject(project)}
                  className="relative aspect-video w-full overflow-hidden cursor-pointer bg-neutral-900"
                >
                  <motion.div
                    variants={previewZoomOutVariant}
                    className="w-full h-full"
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                  </motion.div>

                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f14] via-black/30 to-transparent pointer-events-none" />

                  {/* Corner Number Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-blue-400">
                    {project.number}
                  </div>

                  {/* Preview badge */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/65 backdrop-blur-md text-[11px] font-mono font-semibold text-white border border-white/15">
                      <span>CONCEPT PREVIEW</span>
                    </span>
                  </div>

                  {/* Quick inspection hover overlay */}
                  <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md text-xs font-semibold text-white border border-white/20 shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span>Inspect Project Details</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="text-xl sm:text-2xl font-bold text-white tracking-tight cursor-pointer hover:text-blue-400 transition-colors"
                      >
                        {project.title}
                      </h3>
                      <span className="rounded-full border border-blue-400/30 px-2 py-1 text-[10px] font-mono text-blue-300">CONCEPT</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-neutral-300 leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/5 border border-white/10 text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Preview actions */}
                  <div className="pt-4 border-t border-white/5 flex items-center gap-2 sm:gap-3">
                    <motion.a
                      {...buttonScaleProps}
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white text-xs font-semibold tracking-wide shadow-md transition-all bg-white/10 hover:bg-white/15 border border-white/10"
                    >
                      <span>OPEN PREVIEW</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </motion.a>

                    <motion.button
                      {...buttonScaleProps}
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs font-medium tracking-wide transition-all"
                      title="Inspect full project details"
                    >
                      <span>DETAILS</span>
                    </motion.button>

                    <motion.button
                      {...buttonScaleProps}
                      onClick={() => handleCopyNotice(project.id, project.demoUrl)}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs transition-all"
                      title="Copy link to project"
                      aria-label="Copy project URL"
                    >
                      {copiedId === project.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {/* Interactive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
