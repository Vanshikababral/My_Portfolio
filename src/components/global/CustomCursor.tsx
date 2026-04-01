import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('[data-hover]'));
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const lag = 0.12;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lag;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lag;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x - 5}px, ${cursorPos.current.y - 5}px, 0) scale(${isHovering ? 2.5 : 1})`;
        cursorRef.current.style.backgroundColor = isHovering ? 'var(--accent)' : 'transparent';
        cursorRef.current.style.borderColor = isHovering ? 'transparent' : 'var(--fg)';
      }

      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isHovering]);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        border: '1.5px solid var(--fg)',
        zIndex: 9999,
        pointerEvents: 'none',
        transition: 'background-color 0.2s ease, border-color 0.2s ease, transform 0.1s ease-out',
      }}
    />
  );
};

export default CustomCursor;
