import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { useMenu } from '../../context/MenuContext';

const navItems = [
  { label: 'HERO', section: 'hero' },
  { label: 'ABOUT', section: 'about' },
  { label: 'SKILLS', section: 'skills' },
  { label: 'MY WORK', section: 'work' },
  { label: 'CERTIFICATIONS', section: 'certifications' },
  { label: 'JOURNEY', section: 'journey' },
  { label: 'INTERESTS', section: 'interests' },
  { label: 'CONTACT', section: 'contact' },
];

const resumeUrl = "/VanshikaBabral.pdf"; const linkedinUrl = "https://www.linkedin.com/in/vanshika-babral";
const githubUrl = "https://github.com/Vanshikababral";
const emailAddress = "vanshikababral@gmail.com";

export default function MenuOverlay() {
  const { setActiveSection } = useNavigation();
  const { menuOpen, closeMenu } = useMenu();

  const handleNavClick = (section: any) => {
    closeMenu();
    setTimeout(() => {
      setActiveSection(section);
    }, 450);
  };

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="fixed inset-0 z-[999] bg-[#0a0a0a] overflow-hidden"
          initial={{ clipPath: 'circle(0px at calc(100% - 52px) 30px)' }}
          animate={{ clipPath: 'circle(150% at calc(100% - 52px) 30px)' }}
          exit={{ clipPath: 'circle(0px at calc(100% - 52px) 30px)' }}
          transition={{
            open: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
            exit: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
          }}
          style={{ pointerEvents: menuOpen ? 'all' : 'none' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.nav
              className="flex flex-col items-center justify-center"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={{
                animate: {
                  transition: {
                    staggerChildren: 0.06,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.section}
                  variants={{
                    initial: { y: 30, opacity: 0 },
                    animate: { y: 0, opacity: 1 },
                    exit: { y: 20, opacity: 0 },
                  }}
                  className="overflow-hidden py-0.5"
                >
                  <motion.span
                    className="font-display text-[clamp(28px,6vw,64px)] text-[#f0ece4] leading-[0.95] cursor-pointer inline-block"
                    whileHover={{ letterSpacing: '0.08em', color: '#b8f400' }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleNavClick(item.section)}
                    data-hover
                  >
                    {item.label}
                  </motion.span>
                </motion.div>
              ))}
            </motion.nav>

            {/* Bottom Links */}
            <motion.div
              className="absolute bottom-[3rem] flex flex-wrap justify-center gap-6 lg:gap-10 px-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <button
                className="font-mono text-[11px] text-[#f0ece4]/40 hover:text-[#b8f400] transition-colors duration-300 cursor-pointer uppercase tracking-widest"
                onClick={() => window.open(resumeUrl, '_blank')}
                data-hover
              >
                Resume ↗
              </button>
              <button
                className="font-mono text-[11px] text-[#f0ece4]/40 hover:text-[#b8f400] transition-colors duration-300 cursor-pointer uppercase tracking-widest"
                onClick={() => window.open(linkedinUrl, '_blank')}
                data-hover
              >
                LinkedIn ↗
              </button>
              <button
                className="font-mono text-[11px] text-[#f0ece4]/40 hover:text-[#b8f400] transition-colors duration-300 cursor-pointer uppercase tracking-widest"
                onClick={() => window.open(githubUrl, '_blank')}
                data-hover
              >
                GitHub ↗
              </button>
              <button
                className="font-mono text-[11px] text-[#f0ece4]/40 hover:text-[#b8f400] transition-colors duration-300 cursor-pointer uppercase tracking-widest"
                onClick={() => window.location.href = `mailto:${emailAddress}`}
                data-hover
              >
                Email ↗
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

