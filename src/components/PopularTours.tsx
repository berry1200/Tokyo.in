import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Clock, MapPin, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { TourItem, Language } from '../types';
import { POPULAR_TOURS, UI_TEXT } from '../data/toursData';
import { playWindChime } from '../utils/audio';

interface PopularToursProps {
  lang: Language;
  onSelectTour: (tour: TourItem) => void;
}

export const PopularTours: React.FC<PopularToursProps> = ({ lang, onSelectTour }) => {
  const [hoveredTourId, setHoveredTourId] = useState<string | null>(null);
  const t = UI_TEXT[lang];

  return (
    <section
      id="tours"
      className="relative z-20 py-28 px-6 sm:px-8 max-w-7xl mx-auto w-full bg-[#fdfaf5]"
    >
      {/* Section Header centered as in the reference image */}
      <div className="text-center space-y-2 mb-16">
        <p className="text-xs sm:text-sm font-semibold text-[#c0392b] tracking-[0.25em] uppercase">
          {t.popularTours.eyebrow}
        </p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.25em] text-[#2c1810] uppercase">
          {t.popularTours.heading}
        </h2>
        <div className="w-12 h-[2px] bg-gradient-to-r from-[#c0392b] to-[#f15a24] mx-auto mt-4 rounded-full" />
      </div>

      {/* 4 Cards Grid exactly like the reference image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {POPULAR_TOURS.map((tour, idx) => {
          const isHovered = hoveredTourId === tour.id;

          return (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => {
                setHoveredTourId(tour.id);
                playWindChime(1046.5 + idx * 120, (idx - 1.5) * 0.5, 0.12);
              }}
              onMouseLeave={() => setHoveredTourId(null)}
              onClick={() => onSelectTour(tour)}
              className="group relative h-[440px] rounded-lg overflow-hidden cursor-pointer border border-[#2c1810]/15 bg-[#fffcf9] shadow-[0_10px_30px_rgba(44,24,16,0.08)] transition-all duration-500 hover:border-[#c0392b]/50 hover:shadow-[0_20px_40px_rgba(44,24,16,0.18)]"
              id={`tour-card-${tour.id}`}
            >
              {/* Background Image with Zoom & Dark Vignette */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${tour.image})` }}
              />

              {/* Natural Tones Dark Cedar Gradient Overlay for rich contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810] via-[#2c1810]/55 to-transparent transition-opacity duration-300 group-hover:opacity-95" />
              <div className="absolute inset-0 bg-[#2c1810]/25" />

              {/* Top Meta Badges (Location & Rating) */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fdfaf5]/90 backdrop-blur-md border border-[#2c1810]/15 text-[#2c1810] shadow-xs">
                  <MapPin className="w-3 h-3 text-[#c0392b]" />
                  <span className="text-[10px] font-semibold tracking-wide">
                    {tour.location.split(',')[1] || tour.location}
                  </span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fdfaf5]/90 backdrop-blur-md border border-[#c0392b]/30 text-[#c0392b] text-[10px] font-bold shadow-xs">
                  <Star className="w-3 h-3 fill-[#c0392b] text-[#c0392b]" />
                  {tour.rating}
                </span>
              </div>

              {/* Bottom Information matching the reference: "ТУР №1 / и получите незабываемые..." */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col items-center text-center">
                {/* Tour Number Title matching "ТУР №1" */}
                <h3 className="font-display text-lg sm:text-xl font-bold tracking-[0.2em] text-[#fdfaf5] uppercase drop-shadow-md group-hover:text-amber-200 transition-colors">
                  {tour.num}
                </h3>

                {/* Subtitle matching "и получите незабываемые эмоции" */}
                <p className="text-[11px] text-[#fdfaf5]/80 font-light tracking-wide mt-1.5 line-clamp-1">
                  {tour.subtitle[lang]}
                </p>

                {/* Detailed Title appearing on hover */}
                <p className="text-xs text-amber-200/90 font-medium mt-2 line-clamp-2 transition-all opacity-90 group-hover:opacity-100">
                  {tour.title[lang]}
                </p>

                {/* Interactive Action Bar on Hover */}
                <div className="mt-4 pt-3 w-full border-t border-white/20 flex items-center justify-between text-xs">
                  <span className="text-[#fdfaf5] font-bold text-sm tracking-tight">
                    {tour.price}
                    <span className="text-[10px] font-normal text-[#fdfaf5]/70"> / tour</span>
                  </span>

                  <button className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-amber-300 group-hover:text-amber-200 group-hover:translate-x-1 transition-all">
                    <span>{t.popularTours.bookNow}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
