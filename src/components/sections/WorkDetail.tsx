import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import ImageGalleryModal from './ImageGalleryModal';

const sectionVariants: Variants = {
  initial: { x: '100vw', opacity: 0 },
  enter: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 20 } },
  exit: { x: '100vw', opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } }
};

export default function WorkDetail() {
  const { setActiveSection, selectedProject } = useNavigation();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentSnapshotIndex, setCurrentSnapshotIndex] = useState(0);

  useEffect(() => {
    if (!selectedProject) {
      setActiveSection('work');
    }
  }, [selectedProject, setActiveSection]);

  if (!selectedProject) return null;

  const openGallery = (index: number) => {
    setCurrentSnapshotIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <motion.section
      variants={sectionVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed inset-0 w-screen h-screen bg-[var(--bg)] overflow-hidden grid grid-cols-[1fr] lg:grid-cols-[60%_40%] px-[6vw] py-[10vh] gap-[6vw]"
    >
      {/* Back Button */}
      <motion.button
        className="fixed top-[72px] left-[2.5vw] z-[100] bg-transparent border-none font-mono text-[11px] text-[var(--muted)] cursor-pointer flex items-center gap-2"
        whileHover={{ x: -4, color: 'var(--fg)' }}
        onClick={() => setActiveSection('work')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        data-hover
      >
        ← BACK
      </motion.button>

      {/* Watermark */}
      <div className="absolute bottom-[-2vh] right-[-2vw] z-0 pointer-events-none opacity-[0.04] select-none">
        <h1 className="font-display text-[20vw] text-[var(--fg)] leading-none uppercase">
          {selectedProject.name}
        </h1>
      </div>

      {/* LEFT COLUMN */}
      <div className="relative z-10 flex flex-col justify-center overflow-y-auto pr-8 scrollbar-hide">
        <div>
          <h2 className="font-display text-[clamp(40px,5vw,72px)] text-[var(--fg)] leading-tight">
            {selectedProject.name}
          </h2>
          <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.3em] mt-2 uppercase">
            {selectedProject.sub} | {selectedProject.period}
          </p>
          
          <div className="mt-8 space-y-10 pb-10">
            {/* Description */}
            <div>
              <p className="font-sans text-[15px] text-[var(--fg)]/90 leading-[1.7]">
                {selectedProject.description}
              </p>
            </div>

            {/* Problem Solved */}
            {selectedProject.problemSolved && (
              <div>
                <h3 className="font-mono text-[10px] text-[var(--accent)] tracking-[0.4em] uppercase mb-4 opacity-70">
                  PROBLEM SOLVED
                </h3>
                <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.7]">
                  {selectedProject.problemSolved}
                </p>
              </div>
            )}

            {/* Key Features */}
            {selectedProject.features && (
              <div>
                <h3 className="font-mono text-[10px] text-[var(--accent)] tracking-[0.4em] uppercase mb-4 opacity-70">
                  KEY FEATURES
                </h3>
                <ul className="space-y-4">
                  {selectedProject.features.map((feature: string, i: number) => (
                    <li key={i} className="flex gap-4 items-start group">
                      <span className="font-mono text-[11px] text-[var(--accent)] mt-1">0{i + 1}</span>
                      <p className="font-sans text-[14px] text-[var(--muted)] leading-relaxed group-hover:text-[var(--fg)] transition-colors">
                        {feature}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Snapshots Gallery */}
            {selectedProject.snapshots && selectedProject.snapshots.length > 0 && (
              <div className="pt-4">
                <h3 className="font-mono text-[10px] text-[var(--accent)] tracking-[0.4em] uppercase mb-6 opacity-70 flex items-center justify-between">
                  PROJECT SNAPSHOTS
                  <span className="opacity-40">{selectedProject.snapshots.length} Images</span>
                </h3>
                <div className="relative flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
                  {selectedProject.snapshots.map((snapshot: string, i: number) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => openGallery(i)}
                      className="flex-shrink-0 w-[240px] aspect-video bg-white/5 border border-white/10 rounded-sm overflow-hidden snap-center group cursor-pointer p-0"
                      data-hover="scale"
                    >
                      <img
                        src={snapshot}
                        alt={`${selectedProject.name} snapshot ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </motion.button>
                  ))}
                </div>
                <div className="flex items-center mt-2 px-1 text-[10px] font-mono text-[var(--muted)] uppercase tracking-[0.2em]">
                  Click to Expand • Scroll to Explore →
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="relative z-10 flex flex-col justify-center">
        <div>
          <h3 className="font-display text-[11px] text-[var(--accent)] tracking-[0.3em] mb-6">TECH STACK</h3>
          <div className="flex flex-wrap gap-2">
            {selectedProject.techStack?.map((tech: string, i: number) => (
              <span
                key={i}
                className="font-mono text-[12px] border border-[var(--border)] text-[var(--accent)] px-3.5 py-1.5 rounded-[2px]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6">
          <div className="relative w-fit group">
            <button
              className="bg-transparent border-none font-display text-[18px] text-[var(--fg)] cursor-pointer p-0"
              onClick={() => window.open(selectedProject.githubUrl, '_blank')}
              data-hover
            >
              GitHub Repo ↗
            </button>
            <div className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
          </div>
        </div>
      </div>

      <ImageGalleryModal
        isOpen={isGalleryOpen}
        images={selectedProject.snapshots || []}
        initialIndex={currentSnapshotIndex}
        onClose={() => setIsGalleryOpen(false)}
      />
    </motion.section>
  );
}
