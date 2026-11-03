import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, FolderGit2, Sparkles, CheckCircle2, Globe } from 'lucide-react';
import {
  sectionHeaderVariant,
  staggerGridContainer,
  projectCardFadeScaleVariant,
  previewZoomOutVariant,
  buttonScaleProps,
} from '../utils/animations';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'muslims-app',
    number: 'FEATURED 01',
    title: 'MUSLIMS WEB APP',
    description: 'A community digital platform and resource hub built by Omar, deployed live on Vercel.',
    longDescription: 'A web platform engineered by Omar and deployed on Vercel. Features a sleek responsive dark dashboard, community resources, prayer timetables, event modules, and clean component architecture.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Vercel Deployment'],
    imageUrl: '/src/assets/images/project_muslims_preview_1793662392866.jpg',
    demoUrl: 'https://muslims-8ahziv1yy-omar-5997.vercel.app/',
    githubUrl: 'https://github.com/omar-dev/muslims-web-app',
    features: [
      'Live deployed on Vercel with global CDN acceleration',
      'Responsive community dashboard and resource timetable',
      'Modern dark UI with fluid layout transitions',
      'Custom component structure and mobile-first navigation',
    ],
    isSample: false,
  },
  {
    id: 'ecommerce-store',
    number: 'PROJECT 02',
    title: 'E-COMMERCE STORE',
    description: 'A modern online store with interactive product cards, filter systems, and responsive layouts.',
    longDescription: 'An interactive storefront prototype designed for premium audio hardware and lifestyle tech. Features dynamic cart state management, product filtering by category, image galleries, and responsive product grids.',
    technologies: ['React', 'CSS3', 'JavaScript'],
    imageUrl: '/src/assets/images/project_ecommerce_preview_1793661548254.jpg',
    demoUrl: 'https://muslims-8ahziv1yy-omar-5997.vercel.app/',
    githubUrl: '#',
    features: [
      'Interactive product cards with instant hover zoom',
      'Category filtering and live cart counter badge',
      'Detailed item specification drawers',
      'Fluid mobile-first checkout preview',
    ],
    isSample: true,
  },
  {
    id: 'creative-landing-page',
    number: 'PROJECT 03',
    title: 'CREATIVE LANDING PAGE',
    description: 'A visually engaging landing page with smooth animations, futuristic gradients, and modern design.',
    longDescription: 'An immersive digital experience showcasing generative visual art, fluid 3D gradient themes, and high-impact hero typography. Engineered to explore interactive micro-interactions and high-performance compositor animations.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    imageUrl: '/src/assets/images/project_landing_preview_1793661548791.jpg',
    demoUrl: 'https://muslims-8ahziv1yy-omar-5997.vercel.app/',
    githubUrl: '#',
    features: [
      'Layered gradient illumination and atmospheric orbs',
      'Scroll-triggered staggered content reveals',
      'Fluid typography scale across all viewports',
      'Zero layout shifts with optimized transforms',
    ],
    isSample: true,
  },
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyNotice = (id: string, githubUrl: string) => {
    setCopiedId(id);
    navigator.clipboard.writeText(githubUrl);
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
            THINGS I'VE BUILT
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-6">
            A curated collection of web applications, platforms, and interfaces built by Omar. Featuring live production deployments on Vercel alongside experimental designs.
          </p>

          {/* Prominent Live Vercel Project Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 p-2 px-4 rounded-xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 backdrop-blur-md shadow-lg shadow-blue-900/20">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Live Deployment:</span>
            </div>
            <a
              href="https://muslims-8ahziv1yy-omar-5997.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-blue-300 hover:text-white underline underline-offset-4 decoration-blue-500/50 hover:decoration-blue-400 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>muslims-8ahziv1yy-omar-5997.vercel.app</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Projects Grid: Staggered entrance across all cards */}
        <motion.div
          variants={staggerGridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {INITIAL_PROJECTS.map((project) => {
            const isLive = !project.isSample;

            return (
              <motion.article
                key={project.id}
                variants={projectCardFadeScaleVariant}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`group relative bg-[#0e0f14]/90 border rounded-2xl overflow-hidden backdrop-blur-md shadow-xl flex flex-col justify-between transition-all ${
                  isLive
                    ? 'border-emerald-500/40 hover:border-emerald-400 shadow-emerald-950/30 hover:shadow-emerald-900/30 ring-1 ring-emerald-500/20'
                    : 'border-white/10 hover:border-blue-500/40 hover:shadow-blue-900/20'
                }`}
              >
                {/* Animation 3: Project preview image with entrance zoom settling and hover zoom */}
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

                  {/* Live or Sample Badge */}
                  <div className="absolute top-3 right-3">
                    {isLive ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-600/90 backdrop-blur-md text-[11px] font-mono font-semibold text-white shadow-md shadow-emerald-600/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span>LIVE ON VERCEL</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-blue-600/80 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-white">
                        Concept Showcase
                      </span>
                    )}
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
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="text-xl font-bold text-white tracking-tight cursor-pointer hover:text-blue-400 transition-colors"
                      >
                        {project.title}
                      </h3>
                      {isLive && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
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

                  {/* Card Action Buttons with subtle hover & tap scaling */}
                  <div className="pt-4 border-t border-white/5 flex items-center gap-2 sm:gap-3">
                    <motion.a
                      {...buttonScaleProps}
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-white text-xs font-semibold tracking-wide shadow-md transition-all ${
                        isLive
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-600/30'
                          : 'bg-blue-600/90 hover:bg-blue-600 shadow-blue-600/20'
                      }`}
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </motion.a>

                    <motion.button
                      {...buttonScaleProps}
                      onClick={() => setSelectedProject(project)}
                      className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs font-medium tracking-wide transition-all"
                      title="Inspect full project details"
                    >
                      <span>DETAILS</span>
                    </motion.button>

                    <motion.button
                      {...buttonScaleProps}
                      onClick={() => handleCopyNotice(project.id, project.demoUrl)}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs transition-all"
                      title="Copy link to project"
                      aria-label="Copy project URL"
                    >
                      <Code2 className="w-3.5 h-3.5 text-neutral-400" />
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
