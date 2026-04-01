import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';

const shards = [
  { id: 1, polygon: 'polygon(0 0, 40% 0, 0 40%)', x: -100, y: -100 },
  { id: 2, polygon: 'polygon(40% 0, 80% 0, 0 80%, 0 40%)', x: -100, y: -50 },
  { id: 3, polygon: 'polygon(80% 0, 100% 0, 100% 40%, 0 100%, 0 80%)', x: -50, y: -100 },
  { id: 4, polygon: 'polygon(100% 40%, 100% 80%, 40% 100%, 0 100%)', x: 50, y: 100 },
  { id: 5, polygon: 'polygon(100% 80%, 100% 100%, 80% 100%)', x: 100, y: 50 },
  { id: 6, polygon: 'polygon(100% 0, 100% 40%, 60% 0)', x: 100, y: -100 }, // Adjusted for 6 shards
];

export default function LoadingScreen() {
  const { setActiveSection } = useNavigation();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const handleExitComplete = () => {
    setActiveSection('entry');
  };

  return (
    <div className="relative w-screen h-screen bg-[var(--bg)] flex flex-col items-center justify-center gap-6 overflow-hidden">
      <style>
        {`
          @keyframes typing {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          @keyframes bob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          @keyframes blink {
            50% { opacity: 0; }
          }
          @keyframes progressFill {
            from { width: 0%; }
            to { width: 100%; }
          }
          .typing-anim { animation: typing 0.4s infinite ease-in-out; }
          .bob-anim { animation: bob 2s infinite ease-in-out; }
          .blink-cursor::after {
            content: '|';
            animation: blink 1s step-end infinite;
            color: var(--accent);
            margin-left: 4px;
          }
          .progress-fill {
            animation: progressFill 2.6s ease-out forwards;
          }
        `}
      </style>

      {/* Avatar Container */}
      <div className="bob-anim">
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hair Background */}
          <path d="M20 40C20 20 80 20 80 40V80C80 80 20 80 20 80V40Z" fill="#1a1a2e" />
          {/* Shoulders / Body */}
          <g className="typing-anim">
            <path d="M10 110C10 90 90 90 90 110V120H10V110Z" fill="#222" />
            {/* Arms */}
            <path d="M20 100L35 85M80 100L65 85" stroke="#222" strokeWidth="8" strokeLinecap="round" />
          </g>
          {/* Head */}
          <circle cx="50" cy="45" r="25" fill="#2a1a0e" />
          {/* Hair Front */}
          <path d="M25 40C25 25 75 25 75 40C75 45 65 35 50 35C35 35 25 45 25 40Z" fill="#1a1a2e" />
          {/* Laptop */}
          <path d="M30 90H70L75 105H25L30 90Z" fill="#444" />
          <rect x="35" y="92" width="30" height="10" fill="#b8f400" fillOpacity="0.2" />
        </svg>
      </div>

      {/* Loading Text */}
      <div className="font-mono text-[13px] text-[var(--accent)] blink-cursor tracking-wider">
        something is cooking...
      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-[3px] bg-[var(--surface)]">
        <div className="h-full bg-[var(--accent)] progress-fill" />
      </div>

      {/* Shard Exit Animation */}
      <AnimatePresence onExitComplete={handleExitComplete}>
        {isExiting && (
          <motion.div 
            className="absolute inset-0 z-50 pointer-events-none"
            initial="initial"
            animate="animate"
          >
            {shards.map((shard, i) => (
              <motion.div
                key={shard.id}
                className="absolute inset-0 bg-[var(--bg)]"
                style={{ clipPath: shard.polygon }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{ 
                  x: shard.x * 10, 
                  y: shard.y * 10, 
                  opacity: 0,
                  transition: { 
                    duration: 0.6, 
                    delay: i * 0.08, 
                    ease: [0.4, 0, 0.2, 1] 
                  }
                }}
                onAnimationComplete={i === shards.length - 1 ? handleExitComplete : undefined}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

