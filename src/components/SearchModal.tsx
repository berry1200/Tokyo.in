import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { Language, TourItem } from '../types';
import { POPULAR_TOURS, UI_TEXT } from '../data/toursData';
import { playWindChime } from '../utils/audio';

interface SearchModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  onSelectTour: (tour: TourItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  lang,
  onClose,
  onSelectTour
}) => {
  const [query, setQuery] = useState('');
  const t = UI_TEXT[lang];

  const filteredTours = useMemo(() => {
    if (!query.trim()) return POPULAR_TOURS;
    const q = query.toLowerCase();
    return POPULAR_TOURS.filter(
      (tour) =>
        tour.title[lang].toLowerCase().includes(q) ||
        tour.location.toLowerCase().includes(q) ||
        tour.num.toLowerCase().includes(q) ||
        tour.description[lang].toLowerCase().includes(q)
    );
  }, [query, lang]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-20 bg-[#2c1810]/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative w-full max-w-2xl bg-[#fdfaf5] border border-[#2c1810]/20 rounded-xl shadow-[0_20px_50px_rgba(44,24,16,0.25)] overflow-hidden text-[#2c1810]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="p-4 border-b border-[#2c1810]/10 flex items-center gap-3">
            <Search className="w-5 h-5 text-[#c0392b] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search.placeholder}
              className="w-full bg-transparent text-[#2c1810] text-sm focus:outline-hidden placeholder-[#2c1810]/40"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-[#2c1810]/50 hover:text-[#2c1810]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#2c1810]/50 hover:text-[#2c1810] hover:bg-[#2c1810]/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filter Tag Buttons */}
          <div className="p-3 bg-[#ede7dc] border-b border-[#2c1810]/10 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-[#2c1810]/60 shrink-0 uppercase tracking-wider text-[10px] font-semibold">
              Suggestions:
            </span>
            {t.search.quickTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setQuery(tag);
                  playWindChime(1174.66, 0, 0.15);
                }}
                className="px-2.5 py-0.5 rounded-full bg-[#fdfaf5] hover:bg-[#c0392b] text-[#2c1810] hover:text-[#fdfaf5] border border-[#2c1810]/15 shrink-0 transition-colors shadow-2xs font-medium cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Results List */}
          <div className="max-h-[380px] overflow-y-auto p-4 space-y-3">
            {filteredTours.length > 0 ? (
              filteredTours.map((tour) => (
                <div
                  key={tour.id}
                  onClick={() => {
                    onSelectTour(tour);
                    onClose();
                  }}
                  className="p-3 rounded-lg bg-[#fffcf9] hover:bg-[#ede7dc] border border-[#2c1810]/10 hover:border-[#c0392b]/40 cursor-pointer flex items-center justify-between gap-4 transition-all group shadow-xs"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={tour.image}
                      alt={tour.title[lang]}
                      className="w-14 h-14 rounded object-cover shrink-0 border border-[#2c1810]/15"
                    />
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-[#c0392b]">
                        <span>{tour.num}</span>
                        <span>•</span>
                        <span>{tour.location}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-[#2c1810] group-hover:text-[#c0392b] transition-colors">
                        {tour.title[lang]}
                      </h4>
                      <p className="text-xs text-[#3e2723]/70 line-clamp-1 mt-0.5">
                        {tour.duration} • {tour.price}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#2c1810]/40 group-hover:text-[#c0392b] group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-[#2c1810]/50 text-xs">
                {t.search.noResults}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
