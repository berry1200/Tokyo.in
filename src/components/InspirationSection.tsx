import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles, Compass, Maximize2 } from 'lucide-react';
import { Language } from '../types';
import { UI_TEXT } from '../data/toursData';
import { playWindChime } from '../utils/audio';

interface InspirationSectionProps {
  lang: Language;
  onOpenVideoModal: (videoTitle: string, videoUrl: string) => void;
}

export const InspirationSection: React.FC<InspirationSectionProps> = ({
  lang,
  onOpenVideoModal
}) => {
  const t = UI_TEXT[lang];

  const videoThumbnails = [
    {
      id: 'video-1',
      title: 'Irohazaka Mountain Pass & Sacred Chuzenji',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-winding-mountain-road-4171-large.mp4'
    },
    {
      id: 'video-2',
      title: 'Mount Fuji & Snow-Capped Northern Alps',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-snow-covered-mountain-peaks-at-sunset-4148-large.mp4'
    }
  ];

  const handlePlayMainVideo = () => {
    playWindChime(1567.98, 0, 0.3);
    onOpenVideoModal(
      'Tokyo & Japan: Journey Through Time and Light',
      'https://assets.mixkit.co/videos/preview/mixkit-night-city-street-with-traffic-and-neon-lights-42407-large.mp4'
    );
  };

  const handlePlayThumbnail = (video: typeof videoThumbnails[0]) => {
    playWindChime(1318.51, 0.2, 0.25);
    onOpenVideoModal(video.title, video.url);
  };

  return (
    <section
      id="inspiration"
      className="relative min-h-[90vh] w-full flex flex-col justify-between overflow-hidden bg-[#2c1810] py-24 px-6 sm:px-8 border-t border-[#2c1810]/20"
    >
      {/* Background: Starry Night / Cosmic Milky Way over mountains with warm natural grading */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-35"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2000&auto=format&fit=crop')`
        }}
      />

      {/* Atmospheric natural cedar gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810] via-[#3e2723]/70 to-[#2c1810]/85 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#2c1810]/40 to-[#2c1810] pointer-events-none" />

      {/* Upper Content: Heading and Main Video Play Button */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          {/* Main Title matching reference: "TRAVEL AND INSPIRE YOUR LIFE" */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#fdfaf5] tracking-tight leading-[1.05] max-w-3xl drop-shadow-[0_8px_25px_rgba(0,0,0,0.4)]">
            TRAVEL AND
            <br />
            INSPIRE YOUR
            <br />
            LIFE
          </h2>

          {/* Video Play Button matching reference: circle play icon with "Смотреть видео" */}
          <div className="pt-2">
            <button
              onClick={handlePlayMainVideo}
              className="group inline-flex items-center gap-4 cursor-pointer"
              id="watch-video-btn"
            >
              <div className="relative flex items-center justify-center">
                {/* Ripple ring animation */}
                <span className="absolute w-12 h-12 rounded-full bg-[#c0392b]/40 animate-ping" />
                <div className="w-12 h-12 rounded-full border border-[#c0392b] bg-[#3e2723]/90 backdrop-blur-md flex items-center justify-center text-[#fdfaf5] shadow-[0_0_20px_rgba(192,57,43,0.35)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#c0392b] group-hover:text-white">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>

              <span className="text-sm font-medium tracking-[0.15em] text-[#fdfaf5] group-hover:text-amber-200 transition-colors uppercase">
                {t.inspiration.watchVideo}
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Content: Left Narrative text and Right Video Thumbnails */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        {/* Left Description matching reference */}
        <div className="lg:col-span-6 space-y-4">
          <p className="text-xs sm:text-sm text-[#ede7dc]/80 font-light leading-relaxed max-w-md">
            {t.inspiration.description}
          </p>

          <div className="flex items-center gap-3 pt-2 text-xs text-[#c0392b] font-mono tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#c0392b] animate-pulse" />
            <span className="text-[#fdfaf5]/90">35°41'22.2"N 139°41'30.2"E • TOKYO ARCHIPELAGO</span>
          </div>
        </div>

        {/* Right Thumbnails matching reference */}
        <div className="lg:col-span-6 flex flex-col sm:flex-row gap-4 justify-end">
          {videoThumbnails.map((v) => (
            <div
              key={v.id}
              onClick={() => handlePlayThumbnail(v)}
              className="group relative h-28 sm:h-32 w-full sm:w-52 rounded-lg overflow-hidden border border-[#fdfaf5]/20 bg-[#3e2723]/60 cursor-pointer shadow-xl transition-all duration-300 hover:border-[#c0392b] hover:scale-105"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${v.image})` }}
              />
              <div className="absolute inset-0 bg-[#2c1810]/50 group-hover:bg-[#2c1810]/25 transition-colors" />

              {/* Play Button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-[#2c1810]/80 border border-[#fdfaf5]/30 backdrop-blur-xs flex items-center justify-center text-[#fdfaf5] group-hover:scale-110 group-hover:bg-[#c0392b] group-hover:text-white group-hover:border-[#c0392b] transition-all">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Title tag on hover */}
              <div className="absolute bottom-1.5 left-2 right-2 text-[10px] text-white font-medium truncate drop-shadow-md">
                {v.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
