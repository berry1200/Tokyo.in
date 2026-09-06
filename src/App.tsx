/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Language, TourItem, HighlightCard } from './types';
import { Navbar } from './components/Navbar';
import { HeroTorii } from './components/HeroTorii';
import { PopularTours } from './components/PopularTours';
import { InspirationSection } from './components/InspirationSection';
import { TourModal } from './components/TourModal';
import { VideoModal } from './components/VideoModal';
import { SearchModal } from './components/SearchModal';
import { SakuraPetals } from './components/SakuraPetals';
import { Footer } from './components/Footer';
import { triggerWindBreeze } from './utils/audio';

export default function App() {
  const [lang, setLang] = useState<Language>('ru'); // Default to 'ru' to match the original reference mockup ("ТУР №1", "ПОПУЛЯРНЫЕ ТУРЫ", "Смотреть видео"), with EN and JP accessible in 1 click!
  const [activeSlide, setActiveSlide] = useState<number>(3); // Set to 03 matching the screenshot's active indicator on 03!
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Modals state
  const [selectedTour, setSelectedTour] = useState<TourItem | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    title: string;
    url: string;
  }>({
    isOpen: false,
    title: '',
    url: ''
  });

  // Mouse interaction state for 3D parallax & hanging chimes
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseVelocity, setMouseVelocity] = useState({ vx: 0, vy: 0 });
  const [scrollVelocity, setScrollVelocity] = useState(0);

  const prevMouseRef = useRef({ x: 0, y: 0, time: performance.now() });
  const prevScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track mouse coordinates and velocity for 3D physics
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - prevMouseRef.current.time);

      // Normalized coordinates: -1 (left/top) to +1 (right/bottom)
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;

      // Calculate cursor velocity
      const vx = ((e.clientX - prevMouseRef.current.x) / dt) * 10;
      const vy = ((e.clientY - prevMouseRef.current.y) / dt) * 10;

      prevMouseRef.current = { x: e.clientX, y: e.clientY, time: now };
      setMousePos({ x: normX, y: normY });
      setMouseVelocity({ vx, vy });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track scrolling and trigger wind chime breeze effect
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      setScrollVelocity(deltaY);

      // Trigger realistic wind breeze sound through the hanging chimes
      triggerWindBreeze(deltaY);

      // Update active section based on scroll position
      if (currentScrollY < 600) {
        setActiveSection('hero');
      } else if (currentScrollY < 1400) {
        setActiveSection('tours');
      } else if (currentScrollY < 2200) {
        setActiveSection('inspiration');
      } else {
        setActiveSection('contacts');
      }

      // Reset scroll velocity after scroll stops
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setScrollVelocity(0);
      }, 140);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenVideo = (title: string, url: string) => {
    setVideoModal({ isOpen: true, title, url });
  };

  const handleCloseVideo = () => {
    setVideoModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleExploreHighlight = (highlight: HighlightCard) => {
    // Scroll to tours and show relevant tour
    handleNavigate('tours');
  };

  return (
    <div className="relative min-h-screen bg-[#fdfaf5] text-[#2c1810] selection:bg-[#c0392b]/20 selection:text-[#c0392b] font-serif overflow-x-hidden">
      {/* Natural Tones subtle dot grid texture overlay */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-0 natural-dots-bg" />

      {/* Interactive Background Sakura Petals reacting to mouse & wind */}
      <SakuraPetals mousePos={mousePos} scrollVelocity={scrollVelocity} />

      {/* Main Navigation Bar */}
      <Navbar
        lang={lang}
        onLangChange={setLang}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main>
        {/* 1. Hero Section with 3D Torii Gate & Hanging Wind Chimes */}
        <HeroTorii
          lang={lang}
          mousePos={mousePos}
          mouseVelocity={mouseVelocity}
          scrollVelocity={scrollVelocity}
          activeSlide={activeSlide}
          onSelectSlide={setActiveSlide}
          onExploreHighlight={handleExploreHighlight}
        />

        {/* 2. Popular Tours Section matching reference */}
        <PopularTours
          lang={lang}
          onSelectTour={setSelectedTour}
        />

        {/* 3. Travel and Inspire Your Life Section with Video & Starry Landscape */}
        <InspirationSection
          lang={lang}
          onOpenVideoModal={handleOpenVideo}
        />
      </main>

      {/* Footer */}
      <Footer lang={lang} onNavigate={handleNavigate} />

      {/* Interactive Modals */}
      <TourModal
        tour={selectedTour}
        lang={lang}
        onClose={() => setSelectedTour(null)}
      />

      <VideoModal
        isOpen={videoModal.isOpen}
        title={videoModal.title}
        videoUrl={videoModal.url}
        onClose={handleCloseVideo}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        lang={lang}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectTour={setSelectedTour}
      />
    </div>
  );
}
