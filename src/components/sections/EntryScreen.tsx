import React, { useState, useRef } from 'react';
import { motion, useAnimate, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';

const letters = "START".split("");

export default function EntryScreen() {
  const { setActiveSection } = useNavigation();
  const [isFlashing, setIsFlashing] = useState(false);
  const [scope, animate] = useAnimate();
  const wordRef = useRef<HTMLDivElement>(null);

  const handleHover = async () => {
    const animations = letters.map((_, i) => {
      const randomX = Math.random() * 80 - 40;
      const randomY = Math.random() * 60 - 30;
      const randomRotate = Math.random() * 30 - 15;

      return animate(
        `.letter-${i}`,
        { x: randomX, y: randomY, rotate: randomRotate },
        { duration: 0.3, delay: i * 0.03 }
      );
    });

    await Promise.all(animations);

    setTimeout(() => {
      letters.forEach((_, i) => {
        animate(`.letter-${i}`, { x: 0, y: 0, rotate: 0 }, { duration: 0.4, ease: "backOut" });
      });
    }, 700);
  };

  const handleClick = () => {
    setIsFlashing(true);
  };

  const handleFlashComplete = () => {
    setActiveSection('hero');
  };

  return (
    <div className="relative w-screen h-screen bg-[var(--bg)] flex items-center justify-center overflow-hidden">
      {/* START Word */}
      <motion.div
        ref={scope}
        className="cursor-none select-none"
        initial={{ scale: 1, opacity: 0.85 }}
        animate={{ 
          scale: [1, 1.04, 1],
          opacity: [0.85, 1, 0.85]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        onMouseEnter={handleHover}
        onClick={handleClick}
        data-hover
      >
        <h1 className="font-display text-[clamp(120px,18vw,280px)] text-[var(--fg)] leading-none tracking-[-0.02em] flex">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              className={`letter-${i} inline-block`}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
      </motion.div>

      {/* White Flash */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            className="fixed inset-0 bg-white z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onAnimationComplete={handleFlashComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

