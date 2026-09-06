import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Search, Menu, X, Compass, Globe } from 'lucide-react';
import { Language } from '../types';
import { UI_TEXT } from '../data/toursData';
import { toggleAudio, getAudioEnabled, playWindChime } from '../utils/audio';

interface NavbarProps {
  lang: Language;
  onLangChange: (lang: Language) => void;
  onOpenSearch: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLangChange,
  onOpenSearch,
  activeSection,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsSoundOn(getAudioEnabled());

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = toggleAudio();
    setIsSoundOn(newState);
    if (newState) {
      playWindChime(1318.51, 0, 0.3);
    }
  };

  const t = UI_TEXT[lang];

  const navItems = [
    { key: 'main', label: t.nav.main, target: 'hero' },
    { key: 'about', label: t.nav.about, target: 'about' },
    { key: 'tours', label: t.nav.tours, target: 'tours' },
    { key: 'gallery', label: t.nav.gallery, target: 'inspiration' },
    { key: 'reviews', label: t.nav.reviews, target: 'reviews' },
    { key: 'contacts', label: t.nav.contacts, target: 'contacts' }
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#fdfaf5]/92 backdrop-blur-md border-b border-[#2c1810]/10 py-3.5 shadow-[0_4px_25px_rgba(44,24,16,0.06)] text-[#2c1810]'
          : 'bg-gradient-to-b from-[#fdfaf5]/95 via-[#fdfaf5]/70 to-transparent py-6 text-[#2c1810]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo matching reference */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2.5 group cursor-pointer text-left"
          id="brand-logo-btn"
        >
          {/* Vermilion Sun Accent (Hinomaru / Shinto symbol) */}
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c0392b] opacity-40"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gradient-to-tr from-[#c0392b] to-[#f15a24] shadow-[0_0_10px_rgba(192,57,43,0.5)]"></span>
          </span>
          <span className="font-display tracking-[0.25em] text-sm font-bold text-[#2c1810] group-hover:text-[#c0392b] transition-colors">
            {t.brand}
          </span>
        </button>

        {/* Desktop Navigation Links matching the reference screenshot */}
        <nav className="hidden md:flex items-center space-x-8 text-[11px] font-medium tracking-[0.2em] text-[#2c1810]/60">
          {navItems.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.target)}
                className={`relative py-1 transition-colors hover:text-[#2c1810] uppercase cursor-pointer ${
                  isActive ? 'text-[#2c1810] font-semibold' : 'text-[#2c1810]/60'
                }`}
                id={`nav-link-${item.key}`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c0392b] to-[#f15a24] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Controls: Sound Chime Toggle, Search, Language Switcher */}
        <div className="flex items-center space-x-4">
          {/* Sound / Chime Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
              isSoundOn
                ? 'border-[#c0392b]/40 bg-[#c0392b]/10 text-[#c0392b] shadow-[0_0_12px_rgba(192,57,43,0.15)]'
                : 'border-[#2c1810]/15 bg-[#2c1810]/5 text-[#2c1810]/60 hover:text-[#2c1810]'
            }`}
            title={isSoundOn ? t.hero.soundOn : t.hero.soundOff}
            id="sound-toggle-btn"
            aria-label="Toggle wind chime audio"
          >
            {isSoundOn ? (
              <>
                <Volume2 className="w-4 h-4 text-[#c0392b] animate-pulse" />
                <span className="hidden xl:inline text-[9px] font-mono uppercase tracking-wider text-[#c0392b]">
                  CHIME ON
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#2c1810]/50" />
                <span className="hidden xl:inline text-[9px] font-mono uppercase tracking-wider text-[#2c1810]/50">
                  MUTED
                </span>
              </>
            )}
          </button>

          {/* Search Trigger Icon matching top right of reference */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#2c1810]/70 hover:text-[#2c1810] hover:bg-[#2c1810]/5 rounded-full transition-colors cursor-pointer"
            title="Search destinations"
            id="search-open-btn"
            aria-label="Search destinations"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language Switcher */}
          <div className="hidden sm:flex items-center rounded-full bg-[#ede7dc] border border-[#2c1810]/10 p-0.5 text-[10px] font-semibold tracking-wider">
            {(['en', 'jp', 'ru'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => onLangChange(l)}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer uppercase ${
                  lang === l
                    ? 'bg-[#3e2723] text-[#fdfaf5] shadow-xs'
                    : 'text-[#2c1810]/60 hover:text-[#2c1810]'
                }`}
                id={`lang-select-${l}`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#2c1810]/70 hover:text-[#2c1810]"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fffcf9]/98 border-b border-[#2c1810]/10 px-6 py-6 space-y-4 shadow-2xl backdrop-blur-xl">
          <nav className="flex flex-col space-y-3 text-xs tracking-widest uppercase">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  onNavigate(item.target);
                  setMobileMenuOpen(false);
                }}
                className="text-left text-[#2c1810]/70 hover:text-[#c0392b] py-2 border-b border-[#2c1810]/5"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-2 flex items-center justify-between border-t border-[#2c1810]/10">
            <span className="text-[11px] text-[#2c1810]/60 uppercase tracking-wider">Language:</span>
            <div className="flex gap-1">
              {(['en', 'jp', 'ru'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => onLangChange(l)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium uppercase ${
                    lang === l ? 'bg-[#3e2723] text-[#fdfaf5]' : 'bg-[#ede7dc] text-[#2c1810]/70'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
