import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform, Variants } from 'motion/react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  Users,
  Zap,
  Cpu,
  Layers,
  Terminal,
  Globe,
  Settings
} from 'lucide-react';

const sectionVariants: Variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 }
  }
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1]
    }
  }
};

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: clientX - center.x, y: clientY - center.y };
    x.set(distance.x * 0.35);
    y.set(distance.y * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

interface SkillItemProps {
  name: string;
  key?: React.Key;
}

const SkillItem = ({ name }: SkillItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Magnetic>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative px-6 py-3 cursor-pointer group"
      >
        {/* Hover Reveal Icon (Blurred Background) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
          animate={{
            opacity: isHovered ? 0.15 : 0,
            scale: isHovered ? 1.5 : 0.5,
            filter: isHovered ? 'blur(10px)' : 'blur(20px)'
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <Zap size={120} color="#98FF00" strokeWidth={1} />
        </motion.div>

        <span className="relative z-10 font-sans text-xl lg:text-2xl font-light text-[var(--fg)] group-hover:text-[#98FF00] transition-colors duration-300">
          {name}
        </span>
      </motion.div>
    </Magnetic>
  );
};

interface SkillCategoryProps {
  title: string;
  items: string[];
  index: number;
  icon: any;
  key?: React.Key;
}

const SkillCategory = ({ title, items, index, icon: Icon }: SkillCategoryProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative border-t border-[var(--border)] py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 overflow-hidden"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--muted)] opacity-50">
            0{index + 1}
          </span>
          <Icon size={24} className="text-[var(--muted)] opacity-50" />
        </div>
        <h3 className="font-display text-3xl lg:text-4xl italic text-[var(--fg)] group-hover:text-[#98FF00] transition-colors duration-500">
          {title}
        </h3>
      </div>

      <div className="flex flex-wrap gap-x-2 gap-y-2 items-center">
        {items?.map((item, i) => (
          <SkillItem key={i} name={item} />
        ))}
      </div>

      {/* Animated Border Bottom */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 w-full h-[1px] bg-[#98FF00] origin-center"
      />
    </motion.div>
  );
};

export default function Skills() {
  const skills = usePortfolioData('skills');

  const categories = [
    { title: "Languages", items: skills.languages, icon: Code2 },
    { title: "Frontend", items: skills.frontend, icon: Layout },
    { title: "Backend", items: skills.backend, icon: Server },
    { title: "Database", items: skills.database, icon: Database },
    { title: "Tools & Frameworks", items: skills.tools, icon: Wrench },
    { title: "Soft Skills", items: skills.softSkills, icon: Users },
  ];

  return (
    <motion.section
      variants={sectionVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed inset-0 w-full bg-[#0a0a0a] pt-32 pb-20 px-6 lg:px-12 overflow-y-auto relative"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16 lg:mb-24"
        >
          <h2 className="font-display text-[8vw] lg:text-[5vw] leading-[0.85] tracking-tighter text-[#f5f5f5] uppercase">
            Skills <br />
            <span className="italic font-light text-[var(--muted)] ml-[10vw]">& Expertise</span>
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {categories.map((cat, i) => (
            <SkillCategory
              key={i}
              title={cat.title}
              items={cat.items}
              index={i}
              icon={cat.icon}
            />
          ))}
        </div>
      </div>

      {/* Decorative background element */}
      <div className="fixed top-0 right-0 w-1/3 h-full border-l border-[var(--border)] pointer-events-none opacity-10" />
    </motion.section>
  );
}


