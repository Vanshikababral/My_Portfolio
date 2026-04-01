import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryModalProps {
  isOpen: boolean;
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function ImageGalleryModal({ isOpen, images, initialIndex, onClose }: ImageGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'Escape') onClose();
  }, [handleNext, handlePrev, onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-xl flex items-center justify-center overscroll-none"
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50 p-2"
          aria-label="Close"
        >
          <X size={32} strokeWidth={1.5} />
        </button>

        <div className="relative w-full h-full flex items-center justify-center p-4 lg:p-12">
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 lg:left-12 text-white/30 hover:text-[var(--accent)] hover:scale-110 transition-all z-50 p-4"
                aria-label="Previous"
              >
                <ChevronLeft size={48} strokeWidth={1} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 lg:right-12 text-white/30 hover:text-[var(--accent)] hover:scale-110 transition-all z-50 p-4"
                aria-label="Next"
              >
                <ChevronRight size={48} strokeWidth={1} />
              </button>
            </>
          )}

          <div className="relative w-full h-full flex flex-col items-center justify-center select-none" onClick={onClose}>
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                className="max-w-[90vw] max-h-[75vh] object-contain shadow-2xl rounded-sm pointer-events-none"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            <div className="absolute bottom-12 flex flex-col items-center gap-2">
              <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.4em] uppercase opacity-70">
                Gallery Mode
              </span>
              <span className="font-mono text-[12px] text-white/40 tracking-widest">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
