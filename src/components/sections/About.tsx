import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'motion/react';
import aboutData from '../../data/about.json';

const sectionVariants: Variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1]
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5
    }
  }
};

const staggerContainer = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  initial: { y: 30, opacity: 0 },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1]
    }
  }
};

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: containerRef
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <motion.section
      ref={containerRef}
      variants={sectionVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="relative h-full w-full bg-[#0a0a0a] overflow-y-auto overflow-x-hidden custom-scrollbar"
    >
      <div className="max-w-[1400px] mx-auto px-[6vw] py-[15vh] grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-[8vw] items-start">

        {/* LEFT COLUMN: TEXT CONTENT */}
        <motion.div
          variants={staggerContainer}
          className="flex flex-col"
        >
          {/* Section Title */}
          <motion.h2
            variants={itemVariants}
            className="font-serif italic text-[clamp(60px,10vw,140px)] text-[#f5f5f5] leading-none mb-12"
          >
            About
          </motion.h2>

          {/* Primary Headline */}
          <motion.h3
            variants={itemVariants}
            className="font-sans font-bold text-[clamp(28px,4vw,56px)] text-[#f5f5f5] leading-[1.1] mb-10 tracking-tight"
          >
            I'm Vanshika. A developer, maker, and problem solver.
          </motion.h3>

          {/* Body Copy */}
          <motion.div
            variants={itemVariants}
            className="max-w-[600px]"
          >
            <p className="font-sans text-[clamp(16px,1.2vw,20px)] text-[#f5f5f5]/80 leading-[1.8] mb-12">
              {aboutData.bio}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-6">
              <button
                className="group relative overflow-hidden border border-[#f5f5f5]/20 px-8 py-4 font-sans text-[14px] uppercase tracking-widest text-[#f5f5f5] transition-colors duration-500 hover:text-black"
                onClick={() => window.open(aboutData.resumeUrl, '_blank')}
                data-hover
              >
                <div className="absolute inset-0 z-[-1] translate-y-full bg-[#98FF00] transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:translate-y-0" />
                View Resume
              </button>

              <button
                className="group relative overflow-hidden border border-[#f5f5f5]/20 px-8 py-4 font-sans text-[14px] uppercase tracking-widest text-[#f5f5f5] transition-colors duration-500 hover:text-black"
                onClick={() => window.open(aboutData.linkedinUrl, '_blank')}
                data-hover
              >
                <div className="absolute inset-0 z-[-1] translate-y-full bg-[#98FF00] transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:translate-y-0" />
                LinkedIn ↗
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: PORTRAIT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
          className="relative w-full aspect-[3/4] lg:aspect-[2/3] overflow-hidden bg-[#111]"
        >
          <motion.img
            style={{ y }}
            src="/portrait.png"
            alt="Vanshika Babral"
            referrerPolicy="no-referrer"
            initial={{ filter: "grayscale(100%)", rotate: 0 }}
            whileHover={{ rotate: 360, filter: "grayscale(0%)" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="w-full h-[120%] object-cover"
          />

          {/* Decorative Frame */}
          <div className="absolute inset-0 border-[20px] border-[#0a0a0a] pointer-events-none" />
        </motion.div>

      </div>

      {/* Background Text Accent */}
      <div className="fixed bottom-[-5vh] left-[-2vw] pointer-events-none select-none opacity-[0.02] z-[-1]">
        <span className="font-serif italic text-[30vw] text-white leading-none">
          Editorial
        </span>
      </div>
    </motion.section>
  );
}

