import React from 'react';
import { motion } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';
import { useMenu } from '../../context/MenuContext';

export default function Header() {
  const { setActiveSection } = useNavigation();
  const { theme, toggleTheme } = useTheme();
  const { menuOpen, toggleMenu, closeMenu } = useMenu();

  const handleLogoClick = () => {
    setActiveSection('hero');
    closeMenu();
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[60px] z-[1000] bg-transparent flex items-center justify-between px-10">
      {/* Logo */}
      <div
        className="font-display text-[26px] text-[var(--fg)] cursor-pointer tracking-[0.02em] select-none"
        onClick={handleLogoClick}
        data-hover
      >
        VB
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          className="w-10 h-10 bg-transparent border-none cursor-pointer flex items-center justify-center hover:opacity-60 transition-opacity duration-200"
          onClick={toggleTheme}
          data-hover
          aria-label="Toggle Theme"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {theme === 'dark' ? (
              // Sun Icon
              <g stroke="var(--fg)" strokeWidth="1.5">
                <circle cx="10" cy="10" r="4" />
                <line x1="10" y1="2" x2="10" y2="4" />
                <line x1="10" y1="16" x2="10" y2="18" />
                <line x1="2" y1="10" x2="4" y2="10" />
                <line x1="16" y1="10" x2="18" y2="10" />
                <line x1="4.34" y1="4.34" x2="5.76" y2="5.76" />
                <line x1="14.24" y1="14.24" x2="15.66" y2="15.66" />
                <line x1="4.34" y1="15.66" x2="5.76" y2="14.24" />
                <line x1="14.24" y1="5.76" x2="15.66" y2="4.34" />
              </g>
            ) : (
              // Moon Icon
              <path
                d="M17.5 11.5C17.5 15.6421 14.1421 19 10 19C5.85786 19 2.5 15.6421 2.5 11.5C2.5 7.35786 5.85786 4 10 4C10.5 4 11 4.05 11.5 4.15C9.5 5.5 8.5 8 8.5 10.5C8.5 13.5 10.5 16 13.5 16C15 16 16.5 15.5 17.5 14.5C17.5 13.5 17.5 12.5 17.5 11.5Z"
                stroke="var(--fg)"
                strokeWidth="1.5"
                fill="none"
              />
            )}
          </svg>
        </button>

        {/* Menu Toggle */}
        <button
          className="w-12 h-12 bg-white/5 border border-white/10 rounded-full cursor-pointer flex items-center justify-center hover:bg-white/10 hover:border-[var(--accent)] transition-all duration-300"
          onClick={toggleMenu}
          data-hover="scale"
          aria-label="Toggle Menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24">
            <motion.path
              stroke="var(--fg)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ d: "M 5 7 L 19 7" }}
              animate={menuOpen ? { d: "M 5 5 L 19 19" } : { d: "M 5 7 L 19 7" }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
            />
            <motion.path
              stroke="var(--fg)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ opacity: 1 }}
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              d="M 5 12 L 19 12"
              transition={{ duration: 0.2 }}
            />
            <motion.path
              stroke="var(--fg)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ d: "M 5 17 L 19 17" }}
              animate={menuOpen ? { d: "M 5 19 L 19 5" } : { d: "M 5 17 L 19 17" }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

