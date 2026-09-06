import React from 'react';
import { ArrowUp, Heart, Compass, MapPin } from 'lucide-react';
import { Language } from '../types';
import { UI_TEXT } from '../data/toursData';
import { playWindChime } from '../utils/audio';

interface FooterProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const t = UI_TEXT[lang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playWindChime(1760.0, 0, 0.25);
  };

  return (
    <footer id="contacts" className="relative bg-[#2c1810] border-t border-[#3e2723] text-[#ede7dc]/70 py-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3e2723]">
        {/* Col 1: Brand & Philosophy */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-tr from-[#c0392b] to-[#f15a24]" />
            </span>
            <span className="font-display tracking-[0.25em] text-sm font-bold text-[#fdfaf5]">
              {t.brand} • TOKYO
            </span>
          </div>

          <p className="text-xs text-[#ede7dc]/80 leading-relaxed max-w-sm">
            Curated journeys through Japan's spiritual gateways, sacred torii gates, and vibrant modern districts. Handcrafted for explorers seeking profound encounters.
          </p>

          <div className="flex items-center gap-3 pt-2 text-xs font-kanji text-[#f15a24]">
            <span>一期一会 (Ichigo Ichie — Treasure Every Encounter)</span>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="md:col-span-3 space-y-3 text-xs">
          <h4 className="font-mono uppercase tracking-widest text-[#fdfaf5] text-xs font-bold">
            Destinations
          </h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => onNavigate('hero')} className="hover:text-[#f15a24] transition-colors cursor-pointer">
                Lake Ashi Torii Gate (Hakone)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('tours')} className="hover:text-[#f15a24] transition-colors cursor-pointer">
                Senso-ji Asakusa District
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('tours')} className="hover:text-[#f15a24] transition-colors cursor-pointer">
                Matsumoto Samurai Castle
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('inspiration')} className="hover:text-[#f15a24] transition-colors cursor-pointer">
                Mount Fuji & Starry Observatories
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Concierge & Booking Office */}
        <div className="md:col-span-4 space-y-3 text-xs">
          <h4 className="font-mono uppercase tracking-widest text-[#fdfaf5] text-xs font-bold">
            Concierge Office
          </h4>
          <p className="text-[#ede7dc]/80 leading-relaxed">
            Ginza 6-Chome, Chuo-ku, Tokyo 104-0061, Japan
            <br />
            concierge@visittokyo.travel • +81 (0)3 5555 0192
          </p>
          <div className="pt-2 text-[11px] text-[#f15a24] font-mono">
            Direct Torii Ambience • Realtime Web Audio Wind Chimes
          </div>
        </div>
      </div>

      {/* Bottom Bar with Back to Top */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#ede7dc]/60">
        <div>
          © {new Date().getFullYear()} Visit Tokyo Motion Travel Experience. Inspired by Traditional Japanese Torii Gates.
        </div>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3e2723] hover:bg-[#c0392b] text-[#fdfaf5] border border-[#fdfaf5]/15 transition-all cursor-pointer shadow-xs"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
