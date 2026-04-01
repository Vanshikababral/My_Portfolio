import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'motion/react';

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
      duration: 0.5,
      ease: 'easeIn'
    }
  }
};

const nameVariants: Variants = {
  initial: { y: 60, opacity: 0 },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.2
    }
  }
};

const DateTimeWidget = ({ isHovered, onHoverChange }: { isHovered: boolean, onHoverChange: (val: boolean) => void }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata'
    };
    const parts = new Intl.DateTimeFormat('en-IN', options).formatToParts(date);
    const getPart = (type: string) => parts.find(p => p.type === type)?.value;

    return `${getPart('hour')}:${getPart('minute')}:${getPart('second')}`;
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'Asia/Kolkata'
    };
    return new Intl.DateTimeFormat('en-IN', options).format(date).toUpperCase();
  };

  return (
    <div
      className="fixed top-24 right-10 z-[100] flex flex-col items-end gap-0 cursor-pointer group"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      data-hover
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="relative flex items-center justify-center w-4 h-4">
          <div className="absolute w-full h-full bg-[#b8f400] rounded-full opacity-30 animate-ping" />
          <div className="relative w-2 h-2 bg-[#b8f400] rounded-full shadow-[0_0_15px_rgba(184,244,0,1)]" />
        </div>
        <span className="font-mono text-[10px] tracking-[0.4em] text-[var(--muted)] uppercase">
          {formatDate(time)} | IST
        </span>
      </div>
      <span className="font-display text-[clamp(60px,8vw,120px)] text-[var(--fg)] leading-[0.8] tracking-tighter transition-transform duration-500 group-hover:scale-105 group-hover:text-[#b8f400]">
        {formatTime(time)}
      </span>
      <span className="font-mono text-[9px] tracking-[0.5em] text-[var(--muted)] uppercase mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        Focus Rhombus View
      </span>
    </div>
  );
};

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.section
      variants={sectionVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed inset-0 bg-[var(--bg)] overflow-hidden flex items-center justify-center"
    >
      {/* Background Image with Rhombus Mask */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={false}
        animate={{
          clipPath: isHovered
            ? 'polygon(50% 5%, 85% 50%, 50% 95%, 15% 50%)'
            : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
        }}
        transition={{
          duration: 1.4,
          ease: [0.76, 0, 0.24, 1]
        }}
      >
        <img
          src="https://c.pxhere.com/photos/4d/79/Black_Black_White_Dramatic_White-1614555.jpg!d"
          alt="Hero Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Centered Name */}
      <motion.div
        className="relative z-10 pointer-events-none"
        variants={nameVariants}
      >
        <h1 className="font-display text-[clamp(80px,15vw,240px)] text-white leading-[0.85] tracking-tighter mix-blend-difference text-center">
          VANSHIKA<br />BABRAL
        </h1>
      </motion.div>

      {/* Date/Time Widget */}
      <DateTimeWidget isHovered={isHovered} onHoverChange={setIsHovered} />

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 z-20 flex flex-col gap-2">
        <span className="font-mono text-[10px] text-[var(--muted)] tracking-[0.4em] uppercase">Portfolio 2026</span>
        <div className="w-12 h-[1px] bg-[var(--muted)]" />
      </div>

      <div className="absolute bottom-10 right-10 z-20 flex flex-col items-end gap-2">
        <span className="font-mono text-[10px] text-[var(--muted)] tracking-[0.4em] uppercase">Based in India</span>
        <span className="font-mono text-[10px] text-[var(--fg)] tracking-[0.2em] uppercase">Full Stack Developer</span>
      </div>

      {/* Film Grain Overlay */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.03] mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="grain">
            <feTurbulence baseFrequency="0.65" numOctaves="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>
    </motion.section>
  );
}






