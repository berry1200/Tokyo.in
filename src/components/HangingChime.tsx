import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { HangingChimeItem, Language } from '../types';
import { playWindChime } from '../utils/audio';

interface HangingChimeProps {
  item: HangingChimeItem;
  mousePos: { x: number; y: number }; // normalized -1 to 1
  mouseVelocity: { vx: number; vy: number };
  scrollVelocity: number;
  lang: Language;
  index: number;
}

export const HangingChime: React.FC<HangingChimeProps> = ({
  item,
  mousePos,
  mouseVelocity,
  scrollVelocity,
  lang,
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const chimeRef = useRef<HTMLDivElement>(null);

  // Physics spring for the pendulum sway angle (degrees)
  const swaySpring = useSpring(0, {
    stiffness: 70,
    damping: 10,
    mass: 0.8
  });

  // 3D rotation depth springs
  const rotateYSpring = useSpring(0, { stiffness: 90, damping: 14 });
  const translateZSpring = useSpring(0, { stiffness: 80, damping: 12 });

  // Calculate dynamic sway based on mouse position, velocity, and scroll breeze
  useEffect(() => {
    // Relative position across width (item.positionX goes from ~15% to 85%)
    const normalizedItemX = (item.positionX - 50) / 50; // -1 to 1
    const distToCursorX = mousePos.x - normalizedItemX;
    const distToCursorY = mousePos.y - 0.2; // roughly vertical distance from upper beam
    const distance = Math.hypot(distToCursorX, distToCursorY);

    // Wind induced by scrolling
    const scrollWind = Math.max(-18, Math.min(18, scrollVelocity * 0.08));

    // Mouse velocity draft
    const cursorWind = (Math.abs(distToCursorX) < 0.4 ? mouseVelocity.vx * 0.04 : 0);

    // Proximity nudge
    const proximityNudge = distance < 0.35 ? (distToCursorX > 0 ? -1 : 1) * (0.35 - distance) * 22 : 0;

    // Additional impulse if clicked
    const impulse = isClicked ? (Math.sin(Date.now() / 100) * 14) : 0;

    const targetAngle = scrollWind + cursorWind + proximityNudge + impulse;
    swaySpring.set(targetAngle);

    // 3D rotational tilt
    rotateYSpring.set(-distToCursorX * 25);
    translateZSpring.set(isHovered ? 25 : Math.max(0, (1 - distance) * 15));
  }, [mousePos, mouseVelocity, scrollVelocity, isClicked, isHovered, item.positionX, swaySpring, rotateYSpring, translateZSpring]);

  const handleInteract = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClicked(true);
    // Calculate pan from item position (-0.8 to 0.8)
    const pan = ((item.positionX - 50) / 50) * 0.85;
    playWindChime(item.noteFreq, pan, 0.35);

    // Rebound after click
    setTimeout(() => {
      setIsClicked(false);
    }, 450);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    const pan = ((item.positionX - 50) / 50) * 0.85;
    playWindChime(item.noteFreq, pan, 0.22);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Natural Tones styling presets based on the 3 hanging strip motifs from reference design
  const stripThemes = [
    {
      // 1. Vermilion / Akane Harmony
      bg: 'bg-[#c0392b]',
      border: 'border-[#a93226]',
      text: 'text-[#fdfaf5]',
      hoverText: 'text-amber-200',
      hoverGlow: 'shadow-[0_0_15px_rgba(192,57,43,0.5)]',
      sealBorder: 'border-white/40',
      sealBg: 'bg-[#a93226]',
      sealText: 'text-white',
      tassel: '#c0392b'
    },
    {
      // 2. Pure Washi Zenith
      bg: 'bg-white',
      border: 'border-[#d1cec4]',
      text: 'text-[#2c1810]',
      hoverText: 'text-[#c0392b]',
      hoverGlow: 'shadow-[0_0_15px_rgba(44,24,16,0.25)]',
      sealBorder: 'border-[#c0392b]/50',
      sealBg: 'bg-[#c0392b]/10',
      sealText: 'text-[#c0392b]',
      tassel: '#3e2723'
    },
    {
      // 3. Dark Cedar Dream
      bg: 'bg-[#3e2723]',
      border: 'border-[#2c1810]',
      text: 'text-[#fdfaf5]',
      hoverText: 'text-amber-200',
      hoverGlow: 'shadow-[0_0_15px_rgba(62,39,35,0.6)]',
      sealBorder: 'border-[#c0392b]',
      sealBg: 'bg-[#c0392b]',
      sealText: 'text-white',
      tassel: '#c0392b'
    }
  ];
  const stripTheme = stripThemes[index % 3];

  return (
    <div
      ref={chimeRef}
      className="absolute top-0 flex flex-col items-center pointer-events-auto cursor-pointer select-none group"
      style={{
        left: `${item.positionX}%`,
        transform: 'translateX(-50%)',
        zIndex: isHovered ? 40 : 20 + index
      }}
      onClick={handleInteract}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={`${item.kanji} (${item.kana}) - ${item.meaning[lang]}`}
    >
      {/* Top Beam Mount Clasp / Metal Ring */}
      <div className="w-3 h-3 rounded-full border-2 border-[#3e2723] bg-[#2c1810] shadow-sm mb-[-2px] z-10" />

      {/* Main Motion Pendulum Container (pivots at top: transform-origin top center) */}
      <motion.div
        style={{
          rotateZ: swaySpring,
          rotateY: rotateYSpring,
          z: translateZSpring,
          transformOrigin: 'top center'
        }}
        className="flex flex-col items-center transform-style-3d will-change-transform"
      >
        {/* Braided Silk Cord */}
        <div
          className="w-[2px] transition-colors duration-300"
          style={{
            height: `${28 + (index % 3) * 8}px`,
            backgroundColor: isHovered ? '#c0392b' : item.cordColor,
            boxShadow: isHovered ? '0 0 8px rgba(192, 57, 43, 0.6)' : 'none'
          }}
        />

        {/* Bell / Furin / Suzu Body */}
        {item.bellType === 'furin' && (
          <div className="relative flex flex-col items-center">
            {/* Glass Bell Dome */}
            <div
              className={`w-7 h-8 rounded-t-full border transition-all duration-300 backdrop-blur-xs flex items-center justify-center relative shadow-lg ${
                isHovered
                  ? 'border-[#c0392b]/80 bg-[#c0392b]/20 shadow-[0_0_15px_rgba(192,57,43,0.3)]'
                  : 'border-[#2c1810]/20 bg-gradient-to-b from-white/60 to-[#e8e4db]/70 shadow-[0_4px_10px_rgba(44,24,16,0.15)]'
              }`}
            >
              {/* Highlight flare on glass */}
              <div className="absolute top-1 left-1.5 w-1.5 h-3 bg-white/70 rounded-full blur-[0.5px]" />
              {/* Internal clapper tongue (Zetsu) */}
              <div className="w-1.5 h-3 bg-[#c0392b] rounded-full shadow-xs mt-1" />
            </div>
            {/* Small chime bead */}
            <div className="w-2 h-2 rounded-full bg-[#3e2723] border border-[#2c1810] mt-[-2px]" />
          </div>
        )}

        {item.bellType === 'suzu' && (
          <div className="relative flex flex-col items-center">
            {/* Bronze Shinto Suzu Bell */}
            <div
              className={`w-8 h-8 rounded-full border transition-all duration-300 flex flex-col items-center justify-center relative shadow-lg ${
                isHovered
                  ? 'border-[#c0392b] bg-[#3e2723] text-white shadow-[0_0_15px_rgba(192,57,43,0.35)]'
                  : 'border-[#2c1810]/40 bg-gradient-to-b from-[#5d3224] to-[#2c1810] shadow-[0_4px_12px_rgba(44,24,16,0.25)]'
              }`}
            >
              {/* Metallic equatorial ridge */}
              <div className="w-full h-[1px] bg-amber-400/40" />
              {/* Bell lower slit */}
              <div className="w-3 h-1 bg-[#1a0e08] rounded-full mt-1 border-t border-[#3e2723]" />
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#f15a24] mt-[-1px]" />
          </div>
        )}

        {item.bellType === 'ema' && (
          <div className="relative flex flex-col items-center">
            {/* Pentagonal Ema Wooden Plaque */}
            <div
              className={`w-8 h-9 border transition-all duration-300 rounded-[2px] flex items-center justify-center shadow-lg relative ${
                isHovered
                  ? 'border-[#c0392b] bg-[#3e2723]'
                  : 'border-[#2c1810]/40 bg-gradient-to-b from-[#5d3224] to-[#3e2723] shadow-[0_4px_12px_rgba(44,24,16,0.2)]'
              }`}
              style={{
                clipPath: 'polygon(50% 0%, 100% 24%, 100% 100%, 0% 100%, 0% 24%)'
              }}
            >
              <span className="text-[10px] text-[#fdfaf5] font-bold">奉</span>
            </div>
          </div>
        )}

        {/* Cord to Tanzaku Paper Strip */}
        <div
          className="w-[1.5px] h-3.5"
          style={{ backgroundColor: isHovered ? '#c0392b' : item.cordColor }}
        />

        {/* Traditional Tanzaku Paper Strip (短冊) with Kanji Inscription */}
        <div
          className={`relative px-2 py-3 rounded-[2px] border-x-2 shadow-xl transition-all duration-300 flex flex-col items-center justify-between ${stripTheme.bg} ${stripTheme.border} ${
            isHovered ? `scale-105 ${stripTheme.hoverGlow}` : 'shadow-[0_8px_20px_rgba(44,24,16,0.18)]'
          }`}
          style={{
            width: '38px',
            minHeight: `${item.tasselLength}px`
          }}
        >
          {/* Top header accent */}
          <div className="w-4 h-0.5 bg-current opacity-30 rounded-full mb-1" />

          {/* Kanji Characters - Vertical Tokyo / Sacred Inscription */}
          <div className="flex flex-col items-center justify-center tracking-widest my-auto select-none">
            {item.kanji.split('').map((char, cIdx) => (
              <span
                key={cIdx}
                className={`font-kanji text-base font-bold leading-snug drop-shadow-xs transition-colors ${
                  isHovered ? stripTheme.hoverText : stripTheme.text
                }`}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Tiny bottom seal mark (Hanko 朱肉) */}
          <div className={`w-3.5 h-3.5 rounded-[2px] border ${stripTheme.sealBorder} ${stripTheme.sealBg} flex items-center justify-center text-[7px] ${stripTheme.sealText} font-serif font-bold mt-1`}>
            印
          </div>

          {/* Bottom decorative silk tassel strings */}
          <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 flex gap-[2px]">
            <div className="w-[1px] h-3.5" style={{ backgroundColor: stripTheme.tassel }} />
            <div className="w-[1px] h-4.5" style={{ backgroundColor: stripTheme.tassel }} />
            <div className="w-[1px] h-3.5" style={{ backgroundColor: stripTheme.tassel }} />
          </div>
        </div>
      </motion.div>

      {/* Floating Tooltip with Furigana & Translation on Hover */}
      <motion.div
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 8 : -4,
          scale: isHovered ? 1 : 0.95
        }}
        transition={{ duration: 0.18 }}
        className="pointer-events-none absolute top-full mt-5 px-3 py-2 rounded bg-[#fffcf9] border border-[#2c1810]/20 text-center shadow-xl backdrop-blur-md whitespace-nowrap z-50 min-w-[120px]"
      >
        <div className="text-[11px] text-[#c0392b] font-kanji font-bold flex items-center justify-center gap-1">
          <span>{item.kanji}</span>
          <span className="text-[9px] text-[#2c1810]/60">({item.kana})</span>
        </div>
        <div className="text-[10px] text-[#2c1810] mt-0.5 font-medium">
          {item.meaning[lang]}
        </div>
        <div className="text-[8px] text-[#3e2723]/60 mt-0.5 uppercase tracking-wider font-mono">
          Click to Chime
        </div>
      </motion.div>
    </div>
  );
};
