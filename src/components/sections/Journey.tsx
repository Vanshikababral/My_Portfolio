import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

const BlindStrip: React.FC<{ index: number; isExiting: boolean }> = ({ index, isExiting }) => {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(100% 0 0% 0)' }}
      transition={{
        duration: 0.5,
        delay: isExiting ? (7 - index) * 0.04 : index * 0.06,
        ease: "easeInOut"
      }}
      className="absolute left-0 w-full bg-[var(--bg)] z-[-1]"
      style={{
        top: `${index * 12.5}%`,
        height: '12.5%',
      }}
    />
  );
};

export default function Journey() {
  const journey = usePortfolioData('journey');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!journey || !journey.education) return null;

  const delayMap: Record<string, number> = {
    d1: 0.1,
    d2: 0.2,
    d3: 0.3,
    d4: 0.4
  };

  return (
    <motion.section
      variants={{
        initial: { opacity: 0 },
        enter: { opacity: 1 },
        exit: { opacity: 0 }
      }}
      initial="initial"
      animate="enter"
      exit="exit"
      className="relative h-full w-full overflow-hidden grid grid-cols-1 lg:grid-cols-3 bg-transparent pt-[12vh] lg:pt-0"
    >
      {/* Blinds Background */}
      {Array.from({ length: 8 }).map((_, i) => (
        <BlindStrip key={i} index={i} isExiting={false} />
      ))}

      {/* COLUMN 1: STATS & WORK */}
      <div className="h-full overflow-y-auto px-[4vw] py-[8vh] border-r border-[var(--border)] scrollbar-hide relative">
        <h3 className="font-display text-[11px] tracking-[0.3em] text-[var(--accent)] mb-[4vh] uppercase">
          OVERVIEW & EXPERIENCE
        </h3>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 gap-4 mb-16">
          {journey.stats.map((stat: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delayMap[stat.delay] || 0.1 }}
              className="bg-[var(--surface)] border border-[var(--border)] p-4 group hover:border-[var(--accent)] transition-colors"
            >
              <span className="font-display text-3xl text-[var(--fg)] block mb-1">{stat.val}</span>
              <span className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-wider">{stat.lbl}</span>
            </motion.div>
          ))}
        </div>

        {/* WORK EXPERIENCE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="relative pl-6 border-l border-[var(--accent)]"
        >
          <div className="absolute left-[-4.5px] top-0 w-2 h-2 rounded-full bg-[var(--accent)]" />
          <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-widest mb-2 block">
            {journey.work.period}
          </span>
          <h4 className="font-display text-2xl text-[var(--fg)] leading-tight mb-1">
            {journey.work.title}
          </h4>
          <p className="font-mono text-[12px] text-[var(--muted)] mb-6 uppercase tracking-wider">
            {journey.work.company}
          </p>
          <ul className="flex flex-col gap-3">
            {journey.work.bullets.map((bullet: string, i: number) => (
              <li key={i} className="font-mono text-[11px] text-[var(--muted)] leading-relaxed flex gap-3">
                <span className="text-[var(--accent)]">→</span>
                {bullet}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* COLUMN 2: EDUCATION */}
      <div className="h-full overflow-y-auto px-[4vw] py-[8vh] border-r border-[var(--border)] scrollbar-hide relative">
        <h3 className="font-display text-[11px] tracking-[0.3em] text-[var(--accent)] mb-[4vh] uppercase">
          ACADEMIC PATH
        </h3>

        <div className="flex flex-col gap-12">
          {journey.education.map((edu: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delayMap[edu.delay] || 0.2 }}
              className="relative group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest">
                  {edu.date}
                </span>
                <span className="px-2 py-0.5 bg-[var(--accent)] text-[var(--bg)] font-mono text-[9px] uppercase tracking-tighter">
                  {edu.badge}
                </span>
              </div>
              <h4 className="font-display text-2xl text-[var(--fg)] leading-tight mb-2">
                {edu.institution}
              </h4>
              <p className="font-mono text-[12px] text-[var(--muted)] leading-relaxed">
                {edu.degree}
              </p>
              <div className="h-[1px] bg-[var(--border)] w-full mt-8 group-hover:bg-[var(--accent)] transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* COLUMN 3: EXTRACURRICULARS & OPEN SOURCE */}
      <div className="h-full overflow-y-auto px-[4vw] py-[8vh] scrollbar-hide relative">
        <h3 className="font-display text-[11px] tracking-[0.3em] text-[var(--accent)] mb-[4vh] uppercase">
          BEYOND CODE & OPEN SOURCE
        </h3>

        <div className="flex flex-col gap-12">
          {/* EXTRACURRICULARS */}
          <div className="flex flex-col gap-6">
            {journey.extracurriculars.map((extra: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotate: i % 2 === 0 ? -1 : 1 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: delayMap[extra.delay] || 0.3 }}
                className="bg-[var(--surface)] border border-[var(--border)] p-8 hover:border-[var(--accent)] transition-all group"
              >
                <div className="w-8 h-8 border border-[var(--border)] flex items-center justify-center mb-6 group-hover:border-[var(--accent)] transition-colors">
                  <span className="font-display text-[10px] text-[var(--muted)] group-hover:text-[var(--accent)]">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                <h4 className="font-display text-xl text-[var(--fg)] mb-2 uppercase tracking-wide">
                  {extra.role}
                </h4>
                <p className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-[0.2em] mb-1">
                  {extra.organization}
                </p>
                {extra.department && (
                  <p className="font-mono text-[10px] text-[var(--muted)] opacity-70 uppercase tracking-[0.1em] mb-1">
                    {extra.department}
                  </p>
                )}
                {extra.institution && (
                  <p className="font-mono text-[9px] text-[var(--accent)] uppercase tracking-[0.15em] mt-4">
                    {extra.institution}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* OPEN SOURCE CONTRIBUTIONS */}
          {journey.opensource && (
            <div className="flex flex-col gap-6">
              <h4 className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-widest mb-2">
                CONTRIBUTIONS
              </h4>
              {journey.opensource.map((os: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: delayMap[os.delay] || 0.4 }}
                  className="bg-[var(--surface)] border border-[var(--border)] p-6 group hover:bg-[rgba(152,255,0,0.03)] transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[var(--accent)] font-mono text-sm">$</span>
                    <h5 className="font-display text-lg text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                      {os.repo}
                    </h5>
                  </div>
                  <p className="font-mono text-[11px] text-[var(--muted)] leading-relaxed mb-6">
                    {os.description}
                  </p>
                  <a
                    href={os.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[10px] text-[var(--fg)] border border-[var(--border)] px-4 py-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all uppercase tracking-widest"
                  >
                    View Repository
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
