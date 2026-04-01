import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PDFModalProps {
  open: boolean;
  url: string;
  onClose: () => void;
}

export default function PDFModal({ open, url, onClose }: PDFModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1001] bg-[rgba(10,10,10,0.95)] flex items-center justify-center"
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={onClose}
              className="absolute top-6 right-8 text-[var(--fg)] bg-transparent border-none cursor-pointer font-['Bebas_Neue'] text-4xl z-10"
              data-hover="scale"
            >
              ×
            </button>
            <iframe
              src={url}
              className="w-[90vw] h-[85vh] border-none rounded-sm bg-white"
              title="PDF Viewer"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
