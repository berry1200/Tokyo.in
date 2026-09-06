import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, MapPin, Clock, Users, CheckCircle2, Calendar, Send, Sparkles, ArrowLeft } from 'lucide-react';
import { TourItem, Language } from '../types';
import { playWindChime } from '../utils/audio';

interface TourModalProps {
  tour: TourItem | null;
  lang: Language;
  onClose: () => void;
}

export const TourModal: React.FC<TourModalProps> = ({ tour, lang, onClose }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '2026-10-15',
    guests: '2'
  });

  const labels = {
    en: { back: 'Back to Tours', close: 'Close', cancel: 'Close View' },
    ru: { back: 'Назад к турам', close: 'Закрыть', cancel: 'Закрыть просмотр' },
    jp: { back: 'ツアー一覧へ戻る', close: '閉じる', cancel: '閉じる' }
  }[lang] || { back: 'Back to Tours', close: 'Close', cancel: 'Close View' };

  // Support ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!tour) return null;

  const currentHeroImg = selectedPhoto || tour.image;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    playWindChime(1760.0, 0, 0.4);
    setTimeout(() => {
      setIsBooked(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {/* Backdrop: Clicking outside closes the modal */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto bg-[#2c1810]/75 backdrop-blur-md cursor-pointer"
      >
        {/* Floating Quick Close Button in top corner of screen (always visible even when scrolling) */}
        <button
          onClick={onClose}
          aria-label={labels.close}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-60 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2c1810] text-[#fdfaf5] hover:bg-[#c0392b] border border-[#fdfaf5]/30 shadow-2xl transition-all cursor-pointer text-xs font-semibold"
          id="floating-modal-close-btn"
        >
          <X className="w-4 h-4" />
          <span className="font-bold">{labels.close}</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/15 rounded border border-white/20 text-[#fdfaf5]/80">ESC</kbd>
        </button>

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-[#fdfaf5] border border-[#2c1810]/20 rounded-xl shadow-[0_25px_60px_rgba(44,24,16,0.3)] overflow-hidden my-6 sm:my-10 text-[#2c1810] cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Sticky Navigation Bar with clear Back & Close buttons */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 bg-[#fdfaf5]/95 backdrop-blur-md border-b border-[#2c1810]/15 shadow-xs">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ede7dc] hover:bg-[#c0392b] text-[#2c1810] hover:text-[#fdfaf5] border border-[#2c1810]/15 transition-all text-xs font-bold cursor-pointer group shadow-2xs"
              id="modal-back-btn"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>{labels.back}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2c1810] hover:bg-[#c0392b] text-[#fdfaf5] transition-all text-xs font-bold cursor-pointer shadow-sm"
                id="modal-header-close-btn"
              >
                <span>{labels.close}</span>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Top Banner Image with Vignette */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-500"
              style={{ backgroundImage: `url(${currentHeroImg})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fdfaf5] via-transparent to-black/50" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#fdfaf5]/90 border border-[#c0392b]/30 text-[#c0392b] text-xs font-bold uppercase tracking-wider mb-2 shadow-xs">
                  {tour.num} • {tour.location}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2c1810] tracking-tight drop-shadow-xs">
                  {tour.title[lang]}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-[#c0392b]">
                  {tour.price}
                </span>
                <span className="text-xs text-[#2c1810]/70 font-medium">/ person</span>
              </div>
            </div>
          </div>

          {/* Photo Gallery Selector */}
          <div className="px-6 py-3 bg-[#ede7dc] border-b border-[#2c1810]/10 flex items-center gap-3 overflow-x-auto">
            {tour.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedPhoto(img)}
                className={`relative w-16 h-12 rounded overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  currentHeroImg === img ? 'border-[#c0392b] scale-105 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Tour thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Modal Body: Details + Booking Form */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Itinerary Details & Highlights */}
            <div className="lg:col-span-7 space-y-6">
              {/* Meta Quick Specs */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-lg bg-[#fffcf9] border border-[#2c1810]/15 text-xs shadow-2xs">
                <div className="flex items-center gap-2 text-[#2c1810]">
                  <Clock className="w-4 h-4 text-[#c0392b]" />
                  <span className="font-medium">{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-[#2c1810]">
                  <Users className="w-4 h-4 text-[#c0392b]" />
                  <span className="font-medium">{tour.groupSize}</span>
                </div>
                <div className="flex items-center gap-2 text-[#2c1810]">
                  <Star className="w-4 h-4 fill-[#c0392b] text-[#c0392b]" />
                  <span className="font-medium">{tour.rating} ({tour.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Narrative description */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#2c1810]/60 mb-2 font-semibold">
                  Experience Overview
                </h4>
                <p className="text-sm text-[#3e2723] leading-relaxed">
                  {tour.description[lang]}
                </p>
              </div>

              {/* Curated Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#2c1810]/60 mb-3 font-semibold">
                  Key Journey Highlights
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {tour.highlights[lang].map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#2c1810]">
                      <CheckCircle2 className="w-4 h-4 text-[#c0392b] shrink-0 mt-0.5" />
                      <span className="font-medium">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Quick Reservation Sheet */}
            <div className="lg:col-span-5 p-5 rounded-lg bg-[#fffcf9] border border-[#2c1810]/15 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#2c1810] tracking-wide flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-[#c0392b]" />
                  <span>Reserve Your Journey</span>
                </h3>

                {isBooked ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded bg-[#c0392b]/10 border border-[#c0392b]/30 text-center space-y-2"
                  >
                    <CheckCircle2 className="w-8 h-8 text-[#c0392b] mx-auto" />
                    <h4 className="text-[#2c1810] font-bold text-sm">Reservation Received!</h4>
                    <p className="text-xs text-[#3e2723]">
                      A travel concierge will reach out to {formData.email || 'you'} within 2 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[#2c1810]/70 font-semibold mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Kenji Tanaka"
                        className="w-full px-3 py-2 rounded bg-[#fdfaf5] border border-[#2c1810]/20 text-[#2c1810] placeholder-[#2c1810]/40 focus:outline-hidden focus:border-[#c0392b]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#2c1810]/70 font-semibold mb-1">Contact Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="traveler@example.com"
                        className="w-full px-3 py-2 rounded bg-[#fdfaf5] border border-[#2c1810]/20 text-[#2c1810] placeholder-[#2c1810]/40 focus:outline-hidden focus:border-[#c0392b]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[#2c1810]/70 font-semibold mb-1">Start Date</label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-[#fdfaf5] border border-[#2c1810]/20 text-[#2c1810] focus:outline-hidden focus:border-[#c0392b]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#2c1810]/70 font-semibold mb-1">Travelers</label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-[#fdfaf5] border border-[#2c1810]/20 text-[#2c1810] focus:outline-hidden focus:border-[#c0392b]"
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 Persons</option>
                          <option value="3-4">3-4 Persons</option>
                          <option value="5+">5+ Group</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-3 space-y-2">
                      <button
                        type="submit"
                        className="w-full py-2.5 px-4 rounded-md bg-gradient-to-r from-[#c0392b] to-[#f15a24] hover:brightness-105 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Confirm Inquire & Reserve</span>
                      </button>

                      <button
                        type="button"
                        onClick={onClose}
                        className="w-full py-2 px-4 rounded-md border border-[#2c1810]/20 hover:bg-[#ede7dc] text-[#2c1810] font-semibold text-xs tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>{labels.back}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="pt-4 border-t border-[#2c1810]/10 mt-4 text-[10px] text-[#3e2723]/60 text-center">
                Free cancellation up to 7 days before departure • 100% Best Price Guarantee
              </div>
            </div>
          </div>

          {/* Bottom Bar: Back to tours & Close */}
          <div className="px-6 py-4 bg-[#ede7dc] border-t border-[#2c1810]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#fdfaf5] hover:bg-[#c0392b] text-[#2c1810] hover:text-[#fdfaf5] border border-[#2c1810]/20 transition-all font-semibold cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{labels.back}</span>
            </button>

            <div className="text-[11px] text-[#3e2723]/70 text-center">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/70 border border-[#2c1810]/15 font-mono text-[10px]">ESC</kbd> or click outside to return
            </div>

            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2c1810] hover:bg-[#c0392b] text-[#fdfaf5] transition-all font-semibold cursor-pointer shadow-xs"
            >
              <span>{labels.close}</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
