import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { Loader2, ExternalLink, FileText } from 'lucide-react';

const sectionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const FlipCounter = ({ value, size = "large" }: { value: number; size?: "small" | "large" }) => {
  const paddedValue = value.toString().padStart(2, '0');
  const fontSize = size === "small" ? "text-5xl lg:text-6xl" : "text-[20vw] lg:text-[15vw]";

  return (
    <div className={`relative overflow-hidden h-[1em] perspective-[800px] font-display ${fontSize} leading-none text-[var(--accent)]`}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={value}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center"
        >
          <div className="relative" style={{ clipPath: 'inset(0 0 50% 0)' }}>
            {paddedValue}
          </div>
          <div className="absolute inset-0" style={{ clipPath: 'inset(50% 0 0 0)' }}>
            {paddedValue}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const PreviewCard = ({ cert }: { cert: any }) => {
  const [loading, setLoading] = useState(true);
  const isPdf = cert?.pdf?.toLowerCase().endsWith('.pdf');

  useEffect(() => {
    setLoading(true);
  }, [cert]);

  return (
    <div className="relative w-full aspect-[4/3] lg:aspect-square bg-[var(--surface)] border border-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-[0_0_50px_rgba(152,255,0,0.05)] group">
      <AnimatePresence mode="wait">
        <motion.div
          key={cert?.pdf}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full"
        >
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--surface)] z-10">
              <Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin mb-4" />
              <p className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest">Loading Preview...</p>
            </div>
          )}

          {isPdf ? (
            <iframe
              src={`${cert.pdf}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full border-none"
              onLoad={() => setLoading(false)}
              title={cert.title}
            />
          ) : (
            <img
              src={cert.pdf}
              alt={cert.title}
              className="w-full h-full object-contain p-4"
              onLoad={() => setLoading(false)}
              referrerPolicy="no-referrer"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Overlay Info */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[var(--bg)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex justify-between items-end">
          <div>
            <p className="font-mono text-[9px] text-[var(--accent)] uppercase tracking-widest mb-1">{cert.platform}</p>
            <h4 className="font-display text-lg text-[var(--fg)] leading-tight">{cert.title}</h4>
          </div>
          <div className="flex gap-2">
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              title="Official Link"
              className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--fg)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            >
              <ExternalLink size={18} />
            </a>
            <a
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              title="View PDF"
              className="w-10 h-10 rounded-full bg-[var(--accent)] text-[var(--bg)] flex items-center justify-center hover:scale-110 transition-transform"
            >
              <FileText size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Certifications() {
  const certifications = usePortfolioData('certifications');
  const [activeCert, setActiveCert] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (certifications && certifications.length > 0 && !activeCert) {
      setActiveCert(certifications[0]);
    }
  }, [certifications]);

  if (!certifications || certifications.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-full w-full overflow-hidden bg-[var(--bg)]"
    >
      <div className="flex flex-col lg:flex-row h-full">
        {/* LEFT COLUMN: LIST & COUNTER */}
        <div className="w-full lg:w-[45vw] h-full overflow-y-auto px-[6vw] py-[12vh] scrollbar-hide border-r border-[var(--border)] relative">
          <div className="relative z-10">
            {/* HEADER AREA WITH HIGHLIGHTED COUNTER */}
            <div className="flex items-end justify-between mb-[8vh] border-b border-[var(--border)] pb-6">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-[0.4em]">
                  Archive / 04
                </span>
                <h3 className="font-display text-3xl tracking-[0.1em] text-[var(--fg)] uppercase">
                  CERTIFICATIONS
                </h3>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-[1px] h-16 bg-[var(--border)]" />
                <div className="flex flex-col items-end">
                  <span className="font-mono text-[9px] text-[var(--accent)] uppercase tracking-widest mb-1">Index</span>
                  <FlipCounter value={activeIndex + 1} size="small" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-12">
              {certifications.map((cert: any, index: number) => (
                <motion.div
                  key={index}
                  onMouseEnter={() => {
                    setActiveCert(cert);
                    setActiveIndex(index);
                  }}
                  className={`cursor-pointer transition-all duration-300 group ${activeIndex === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-[10px] text-[var(--accent)] mt-1.5">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="font-display text-2xl lg:text-3xl text-[var(--fg)] leading-tight mb-2 group-hover:text-[var(--accent)] transition-colors">
                        {cert.title}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest">
                          {cert.platform}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-[var(--border)]" />
                        <div className="flex gap-4">
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[10px] text-[var(--muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            OFFICIAL <ExternalLink size={10} />
                          </a>
                          <a
                            href={cert.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[10px] text-[var(--muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            PDF <FileText size={10} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PREVIEW CARD (STICKY) */}
        <div className="hidden lg:flex w-[55vw] h-full items-center justify-center p-[6vw] bg-[rgba(152,255,0,0.01)]">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              {activeCert && (
                <motion.div
                  key={activeCert.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                >
                  <PreviewCard cert={activeCert} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
