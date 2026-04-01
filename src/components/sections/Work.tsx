import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { useNavigation } from '../../context/NavigationContext';

const sectionVariants: Variants = {
  initial: { opacity: 1 },
  enter: { opacity: 1 },
  exit: { opacity: 1 }
};

const panelVariants: Record<string, Variants> = {
  left: {
    initial: { x: '-100vw' },
    enter: { x: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } },
    exit: { x: '-100vw', transition: { duration: 0.5 } }
  },
  right: {
    initial: { x: '100vw' },
    enter: { x: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } },
    exit: { x: '100vw', transition: { duration: 0.5 } }
  }
};

export default function Work() {
  const projects = usePortfolioData('projects');
  const { setActiveSection, setSelectedProject } = useNavigation();
  const [hoveredProject, setHoveredProject] = useState<any>(null);

  return (
    <motion.section
      variants={sectionVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed inset-0 w-screen h-screen flex overflow-hidden bg-[var(--bg)]"
    >
      {/* LEFT PANEL */}
      <motion.div
        variants={panelVariants.left}
        className="relative w-[50vw] h-full overflow-y-auto px-[4vw] py-[8vh] border-r border-[var(--border)] custom-scrollbar"
      >
        <style>
          {`
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--accent); }
          `}
        </style>

        <h2 className="font-display text-[11px] tracking-[0.3em] text-[var(--muted)] mb-[4vh]">MY WORK</h2>

        <div className="flex flex-col">
          {projects.map((project: any, i: number) => (
            <motion.div
              key={project.id}
              className="relative cursor-pointer py-6 border-b border-[var(--border)] group"
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => {
                setSelectedProject(project);
                setActiveSection('work-detail');
              }}
              data-hover
            >
              <motion.span
                className="font-display text-[clamp(48px,7vw,96px)] text-[var(--border)] float-left mr-4 leading-none"
                whileHover={{ color: 'rgba(184,244,0,0.4)' }}
              >
                {project.id}
              </motion.span>
              <div className="overflow-hidden">
                <motion.span
                  className="font-display text-[clamp(22px,2.8vw,40px)] text-[var(--fg)] block leading-tight"
                  whileHover={{ color: 'var(--accent)' }}
                >
                  {project.name}
                </motion.span>
                <p className="font-mono text-[12px] text-[var(--muted)] mt-1">{project.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div
        variants={panelVariants.right}
        className="w-[50vw] h-full relative overflow-hidden bg-[var(--surface)]"
      >
        {/* Default Grid Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <svg width="100%" height="100%" className="opacity-10">
            <defs>
              <pattern id="dotGrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="var(--fg)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotGrid)" />
          </svg>
        </div>

        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              key={hoveredProject.id}
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              exit={{ clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute inset-0 z-10"
            >
              <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center p-[4vw]">
                <img
                  src={hoveredProject.imageUrl}
                  alt={hoveredProject.name}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-full object-contain shadow-2xl"
                />
              </div>
              <div className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-[rgba(10,10,10,0.95)] to-transparent z-20">
                <div className="flex justify-between items-end font-mono text-[11px] text-[var(--fg)]">
                  <span className="text-[14px] font-display tracking-wider uppercase">{hoveredProject.name}</span>
                  <span className="opacity-60">{hoveredProject.techStack?.join(' · ')}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}

