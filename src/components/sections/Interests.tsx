import React from 'react';
import { motion, Variants } from 'motion/react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

const sectionVariants: Variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
  exit: { opacity: 0 }
};

const cardVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
  }
};

export default function Interests() {
  const data = usePortfolioData('interests');

  if (!data || !data.tier1) return null;

  return (
    <motion.section
      variants={sectionVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="relative h-full w-full bg-[#0a0a0a] pt-32 pb-20 px-6 lg:px-12 overflow-y-auto custom-scrollbar"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={cardVariants} className="mb-12">
          <h2 className="font-display text-[11px] tracking-[0.3em] text-[var(--muted)] uppercase mb-8">
            INTERESTS & HOBBIES
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* TIER 1: MAIN INTEREST */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-8 bg-[var(--surface)] border border-[var(--border)] p-8 lg:p-12 relative overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-[var(--accent)] text-[var(--bg)] font-mono text-[10px] uppercase tracking-wider">
                  {data.tier1.badge}
                </span>
              </div>
              <h3 className="font-display text-6xl lg:text-8xl text-[var(--fg)] leading-none mb-4">
                {data.tier1.title.split(data.tier1.syllable)[0]}
                <span className="italic text-[var(--accent)]">{data.tier1.syllable}</span>
              </h3>

              <div className="grid grid-cols-3 gap-8 mt-12 border-t border-[var(--border)] pt-8">
                {data.tier1.stats.map((stat: any, i: number) => (
                  <div key={i}>
                    <p className="font-mono text-[10px] text-[var(--muted)] uppercase mb-1">{stat.label}</p>
                    <p className="font-sans text-lg text-[var(--fg)]">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ghost Text */}
            <span className="absolute bottom-[-5%] right-[-5%] font-display text-[25vw] text-[var(--fg)] opacity-[0.03] pointer-events-none select-none">
              {data.tier1.ghost}
            </span>
          </motion.div>

          {/* TIER 2: SECONDARY INTERESTS */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {data.tier2.map((item: any, i: number) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="flex-1 bg-[var(--surface)] border border-[var(--border)] p-8 group hover:border-[var(--accent)] transition-colors"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                      <path d={item.path} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-mono text-[9px] text-[var(--muted)] uppercase tracking-widest">{item.label}</span>
                </div>
                <h4 className="font-display text-3xl text-[var(--fg)] mb-2">{item.title}</h4>
                <p className="font-sans text-sm text-[var(--muted)]">{item.subtitle}</p>
              </motion.div>
            ))}
          </div>

          {/* TIER 3: TERTIARY INTERESTS */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.tier3.map((item: any, i: number) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="bg-[var(--surface)] border border-[var(--border)] p-6 flex items-center gap-6 group hover:bg-[rgba(184,244,0,0.02)] transition-colors"
              >
                <div className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center shrink-0 group-hover:border-[var(--accent)] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                    <path d={item.path} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-display text-xl text-[var(--fg)]">{item.title}</h5>
                  <p className="font-sans text-xs text-[var(--muted)]">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
