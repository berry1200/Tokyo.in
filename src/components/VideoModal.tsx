import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, Maximize } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  title: string;
  videoUrl: string;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  title,
  videoUrl,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-black border border-white/20 rounded-xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header bar */}
          <div className="p-4 bg-[#2c1810] border-b border-[#3e2723] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#fdfaf5] tracking-wide truncate">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-[#3e2723] text-[#fdfaf5] hover:bg-[#c0392b] transition-colors cursor-pointer"
              aria-label="Close video"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video w-full bg-black">
            <video
              src={videoUrl}
              autoPlay
              controls
              loop
              playsInline
              className="w-full h-full object-contain"
            />
          </div>

          {/* Caption footer */}
          <div className="p-3 bg-[#2c1810] text-center text-xs text-[#f15a24] font-mono border-t border-[#3e2723]">
            CINEMATIC TRAVEL ARCHIVE • TOKYO, JAPAN
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
