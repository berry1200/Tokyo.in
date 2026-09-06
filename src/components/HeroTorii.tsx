import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass, Sparkles, Wind, LandPlot, Wine, Plane, ChevronDown } from 'lucide-react';
import { Language, HighlightCard } from '../types';
import { HANGING_CHIMES, HERO_HIGHLIGHTS, UI_TEXT } from '../data/toursData';
import { HangingChime } from './HangingChime';
import { playWindChime } from '../utils/audio';

interface HeroToriiProps {
  lang: Language;
  mousePos: { x: number; y: number };
  mouseVelocity: { vx: number; vy: number };
  scrollVelocity: number;
  activeSlide: number;
  onSelectSlide: (slideIdx: number) => void;
  onExploreHighlight: (highlight: HighlightCard) => void;
}

export const HeroTorii: React.FC<HeroToriiProps> = ({
  lang,
  mousePos,
  mouseVelocity,
  scrollVelocity,
  activeSlide,
  onSelectSlide,
  onExploreHighlight
}) => {
  const [activeHighlightIdx, setActiveHighlightIdx] = useState(0);
  const t = UI_TEXT[lang];

  // 3D Parallax calculation for the Torii structure
  const toriiRotateX = mousePos.y * -6; // tilt up/down slightly
  const toriiRotateY = mousePos.x * 9;  // tilt left/right
  const toriiTranslateX = mousePos.x * -18;
  const toriiTranslateY = mousePos.y * -12;

  // Background scenic layers corresponding to the 5 numbered states
  const heroBackgrounds = [
    {
      // Dusk lake Torii (Main reference look)
      bgImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2000&auto=format&fit=crop',
      name: 'Lake Ashi & Hakone Torii',
      kanji: '箱根・芦ノ湖'
    },
    {
      // Misty sacred forest shrine
      bgImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2000&auto=format&fit=crop',
      name: 'Asakusa & Senso-ji Sanctuary',
      kanji: '浅草・金龍山'
    },
    {
      // Itsukushima Floating Red Torii at dusk (Iconic visual matching the reference)
      bgImage: 'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?q=80&w=2000&auto=format&fit=crop',
      name: 'Water Gate of Serenity',
      kanji: '厳島・大鳥居'
    },
    {
      // Neon night rain Tokyo
      bgImage: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2000&auto=format&fit=crop',
      name: 'Shinjuku Neon Horizon',
      kanji: '新宿・夜景'
    },
    {
      // Mount Fuji sunset gate
      bgImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop',
      name: 'Fuji Silhouette & Dawn',
      kanji: '富士・夜明け'
    }
  ];

  const currentBg = heroBackgrounds[activeSlide - 1] || heroBackgrounds[2];

  // Track scroll position to fade out scroll indicator
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate smooth fade-out opacity: 1 at top, fades out quickly as user scrolls (0 by ~80px)
  const scrollIndicatorOpacity = Math.max(0, 1 - scrollY / 75);

  const handleScrollToExplore = () => {
    playWindChime(1318.51, 0, 0.2);
    const toursElem = document.getElementById('tours');
    if (toursElem) {
      toursElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  const handleSlideChange = (slideNum: number) => {
    onSelectSlide(slideNum);
    // Play subtle chime on slide switch
    playWindChime(987.77 + slideNum * 80, (slideNum - 3) * 0.3, 0.2);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#fdfaf5] perspective-1000 pt-20"
    >
      {/* 1. Natural Tones Atmospheric Scenic Horizon & Horizon Sun Disc */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Scenic Background image with smooth crossfade and subtle warm grading */}
        <motion.div
          key={currentBg.bgImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{
            backgroundImage: `url(${currentBg.bgImage})`,
            transform: `scale(1.08) translate3d(${mousePos.x * -8}px, ${mousePos.y * -6}px, 0)`
          }}
        />

        {/* Natural Tones Sun Disc from reference design */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-52 h-52 rounded-full bg-[#f15a24] blur-[3px] opacity-80 shadow-[0_0_60px_rgba(241,90,36,0.35)]" />

        {/* Ambient Natural Tones Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fdfaf5] via-[#fdfaf5]/75 to-[#ffe7d1]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdfaf5]/85 via-transparent to-[#fdfaf5]/80" />

        {/* Subtle Water / Vista Mist Sheen on the lower half */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#fdfaf5] via-[#fdfaf5]/90 to-transparent" />
      </div>

      {/* 2. Central Realistic 3D Torii Gate Structure with Hanging Wind Chimes */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            rotateX: toriiRotateX,
            rotateY: toriiRotateY,
            x: toriiTranslateX,
            y: toriiTranslateY
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 18 }}
          className="relative w-full max-w-5xl h-[85vh] flex items-center justify-center transform-style-3d will-change-transform"
        >
          {/* Detailed SVG Architectural Rendering of the Traditional Japanese Torii Gate */}
          <div className="relative w-full max-w-4xl h-full flex flex-col items-center justify-center pointer-events-none">
            {/* SVG Torii Gate Overlay with Natural Tones Dark Cedar and Lacquer Beams */}
            <svg
              viewBox="0 0 1000 800"
              className="w-full h-full object-contain filter drop-shadow-[0_15px_35px_rgba(44,24,16,0.25)] opacity-95"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Natural dark cedar wood gradient */}
                <linearGradient id="toriiWood" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5d3224" />
                  <stop offset="35%" stopColor="#7a3a25" />
                  <stop offset="70%" stopColor="#4e2619" />
                  <stop offset="100%" stopColor="#3e2723" />
                </linearGradient>
                <linearGradient id="toriiDark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3e2723" />
                  <stop offset="100%" stopColor="#2c1810" />
                </linearGradient>
                <linearGradient id="toriiCap" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2c1810" />
                  <stop offset="60%" stopColor="#3e2723" />
                  <stop offset="100%" stopColor="#1f120c" />
                </linearGradient>
                {/* Vermilion & gold trim gradient */}
                <linearGradient id="goldPlate" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c0392b" />
                  <stop offset="50%" stopColor="#f15a24" />
                  <stop offset="100%" stopColor="#a93226" />
                </linearGradient>
              </defs>

              {/* === UPPER CURVED ROOF BEAM (Kasagi & Shimaki) === */}
              {/* Black tiled cap roof */}
              <path
                d="M 50 140 Q 500 115 950 140 L 965 152 Q 500 128 35 152 Z"
                fill="url(#toriiCap)"
              />
              {/* Main Kasagi curved beam */}
              <path
                d="M 65 148 Q 500 125 935 148 L 920 190 Q 500 168 80 190 Z"
                fill="url(#toriiWood)"
              />
              {/* Secondary horizontal beam (Shimaki) */}
              <rect x="110" y="190" width="780" height="28" rx="3" fill="url(#toriiDark)" />

              {/* Central Tablet (Gakuzuka - Sacred Shrine Plaque) */}
              <rect
                x="465"
                y="190"
                width="70"
                height="125"
                rx="4"
                fill="url(#toriiDark)"
                stroke="url(#goldPlate)"
                strokeWidth="2.5"
              />
              <text
                x="500"
                y="240"
                fill="#f6e05e"
                fontSize="18"
                fontFamily="Noto Serif JP, serif"
                fontWeight="900"
                textAnchor="middle"
                letterSpacing="4"
              >
                東
              </text>
              <text
                x="500"
                y="278"
                fill="#f6e05e"
                fontSize="18"
                fontFamily="Noto Serif JP, serif"
                fontWeight="900"
                textAnchor="middle"
                letterSpacing="4"
              >
                京
              </text>

              {/* === LOWER TIE BEAM (Nuki) === */}
              <rect x="110" y="300" width="780" height="34" rx="2" fill="url(#toriiWood)" />
              {/* Wooden wedges (Kusabi) on pillars */}
              <rect x="235" y="292" width="16" height="50" rx="2" fill="#2d0c06" />
              <rect x="749" y="292" width="16" height="50" rx="2" fill="#2d0c06" />

              {/* === MAIN MASSIVE PILLARS (Hashira) === */}
              {/* Left Pillar */}
              <rect x="205" y="190" width="76" height="570" fill="url(#toriiWood)" rx="5" />
              {/* Left Pillar base ring */}
              <rect x="195" y="720" width="96" height="40" fill="url(#toriiCap)" rx="4" />

              {/* Right Pillar */}
              <rect x="719" y="190" width="76" height="570" fill="url(#toriiWood)" rx="5" />
              {/* Right Pillar base ring */}
              <rect x="709" y="720" width="96" height="40" fill="url(#toriiCap)" rx="4" />

              {/* Supporting angle braces & buttress posts (Ryobu Torii wings as in Hakone/Miyajima) */}
              <path d="M 160 520 L 205 450 L 205 680 L 160 720 Z" fill="#5c190d" opacity="0.85" />
              <path d="M 840 520 L 795 450 L 795 680 L 840 720 Z" fill="#5c190d" opacity="0.85" />

              {/* Water waterline reflection and mist base */}
              <ellipse cx="243" cy="750" rx="80" ry="12" fill="rgba(10, 15, 20, 0.7)" />
              <ellipse cx="757" cy="750" rx="80" ry="12" fill="rgba(10, 15, 20, 0.7)" />
            </svg>

            {/* === HANGING CHIMES SUSPENDED FROM THE CROSSBEAM === */}
            {/* Positioned right beneath the Nuki beam of the Torii structure */}
            <div
              className="absolute top-[37%] left-[18%] right-[18%] h-[240px] pointer-events-auto"
              id="hanging-chimes-container"
            >
              {HANGING_CHIMES.map((chime, idx) => (
                <HangingChime
                  key={chime.id}
                  item={chime}
                  mousePos={mousePos}
                  mouseVelocity={mouseVelocity}
                  scrollVelocity={scrollVelocity}
                  lang={lang}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Hero Content: Typography & Navigation Controls */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 sm:px-8 w-full pt-10 sm:pt-14">
        <div className="grid grid-cols-12 gap-4 items-start">
          {/* Main Hero Headline matching reference: "VISIT TOKYO" */}
          <div className="col-span-12 lg:col-span-8 space-y-2">
            {/* Japanese artistic sub-calligraphy */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#c0392b] rounded-full" />
              <span className="text-xs sm:text-sm font-kanji tracking-[0.35em] text-[#3e2723] font-semibold drop-shadow-xs">
                {t.hero.kanjiTitle}
              </span>
            </div>

            {/* Gigantic Bold Title */}
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#2c1810] tracking-tight leading-[0.9] select-none drop-shadow-[0_4px_24px_rgba(44,24,16,0.12)]">
              VISIT
              <br />
              TOKYO
            </h1>

            {/* Interactive feature badges or hint for the hanging wind chimes */}
            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-[#3e2723]">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ede7dc]/90 border border-[#2c1810]/15 backdrop-blur-md shadow-sm">
                <Wind className="w-3.5 h-3.5 text-[#c0392b] animate-spin" style={{ animationDuration: '8s' }} />
                <span className="text-[11px] font-medium text-[#2c1810]">
                  {t.hero.hintChime}
                </span>
              </div>
              <span className="hidden sm:inline text-[#2c1810]/60 text-xs font-medium">
                {currentBg.name}
              </span>
            </div>
          </div>

          {/* Right-Hand Vertical Slider Pagination matching reference ("01, 02, 03, 04, 05") */}
          <div className="col-span-12 lg:col-span-4 flex justify-end">
            <div className="flex flex-col items-end space-y-2.5 select-none font-mono">
              {[1, 2, 3, 4, 5].map((num) => {
                const isActive = activeSlide === num;
                return (
                  <button
                    key={num}
                    onClick={() => handleSlideChange(num)}
                    className={`group flex items-center gap-3 cursor-pointer py-1 transition-all ${
                      isActive ? 'text-[#2c1810]' : 'text-[#2c1810]/40 hover:text-[#2c1810]'
                    }`}
                    id={`slide-btn-${num}`}
                  >
                    <span
                      className={`text-xs transition-all ${
                        isActive
                          ? 'text-2xl font-bold text-[#2c1810] tracking-wider'
                          : 'text-xs text-[#2c1810]/40 group-hover:text-[#2c1810]/80'
                      }`}
                    >
                      {num.toString().padStart(2, '0')}
                    </span>

                    {/* Active horizontal line extending right, exactly like in the design */}
                    <span
                      className={`transition-all duration-300 rounded-full ${
                        isActive
                          ? 'w-10 sm:w-14 h-[2.5px] bg-[#3e2723] shadow-[0_0_8px_rgba(62,39,35,0.4)]'
                          : 'w-2 h-[1px] bg-[#2c1810]/20 group-hover:w-4'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Three Feature Teasers on the bottom matching the mockup */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 sm:px-8 w-full pb-6 pt-12">
        {/* Subtle Category Glyphs Row (Shrine, Dining, Flight) above cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
          <div className="flex items-center gap-2 text-[#c0392b]">
            <LandPlot className="w-5 h-5" />
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#2c1810]/60 font-semibold">01 / SANCTUARIES</span>
          </div>
          <div className="flex items-center gap-2 text-[#c0392b]">
            <Wine className="w-5 h-5" />
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#2c1810]/60 font-semibold">02 / NIGHT VIBES</span>
          </div>
          <div className="flex items-center gap-2 text-[#c0392b]">
            <Plane className="w-5 h-5" />
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#2c1810]/60 font-semibold">03 / EXPEDITION</span>
          </div>
        </div>

        {/* 3 Teaser Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#2c1810]/15 pt-6">
          {HERO_HIGHLIGHTS.map((item, idx) => {
            const isActive = activeHighlightIdx === idx;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveHighlightIdx(idx)}
                onClick={() => onExploreHighlight(item)}
                className="group cursor-pointer flex flex-col justify-between space-y-3"
                id={`highlight-card-${idx}`}
              >
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-[#2c1810] group-hover:text-[#c0392b] transition-colors">
                    {item.title[lang]}
                  </h3>
                  <p className="text-xs text-[#3e2723]/70 line-clamp-2 leading-relaxed">
                    {item.text[lang]}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#3e2723] group-hover:text-[#c0392b] transition-colors"
                  >
                    <span>{t.hero.exploreMore}</span>
                  </button>

                  {/* Active highlight orange underline indicator matching the image */}
                  <div
                    className={`mt-2 h-[2px] transition-all duration-300 rounded-full ${
                      isActive
                        ? 'w-24 bg-gradient-to-r from-[#c0392b] to-[#f15a24]'
                        : 'w-8 bg-[#2c1810]/15 group-hover:w-16 group-hover:bg-[#2c1810]/30'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Subtle Animated Scroll Indicator that fades out when the user begins scrolling */}
      <div className="relative z-30 w-full flex justify-center pb-6 sm:pb-8 pt-1 pointer-events-none">
        <motion.button
          type="button"
          onClick={handleScrollToExplore}
          style={{ opacity: scrollIndicatorOpacity }}
          className={`flex flex-col items-center gap-2 group cursor-pointer transition-opacity duration-300 ${
            scrollIndicatorOpacity > 0.05 ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          aria-label={t.hero.scrollHint || 'Scroll to explore'}
          id="hero-scroll-indicator"
        >
          {/* Animated mouse / pill track with sliding vermilion droplet */}
          <div className="w-5 h-8 rounded-full border border-[#2c1810]/30 group-hover:border-[#c0392b] bg-[#fdfaf5]/80 backdrop-blur-xs flex items-start justify-center p-1 transition-colors shadow-2xs">
            <motion.div
              animate={{
                y: [0, 12, 0],
                opacity: [0.85, 1, 0.35]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: 'easeInOut'
              }}
              className="w-1.5 h-1.5 rounded-full bg-[#c0392b]"
            />
          </div>

          {/* Subtle text label & gentle bouncing chevron */}
          <div className="flex items-center gap-1 text-[10px] font-mono tracking-[0.22em] uppercase text-[#2c1810]/60 group-hover:text-[#c0392b] transition-colors font-medium">
            <span>{t.hero.scrollHint || 'Scroll to explore'}</span>
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-3 h-3 text-[#c0392b]" />
            </motion.div>
          </div>
        </motion.button>
      </div>
    </section>
  );
};
