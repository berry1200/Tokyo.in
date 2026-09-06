export type Language = 'en' | 'jp' | 'ru';

export interface HangingChimeItem {
  id: string;
  kanji: string;
  kana: string;
  meaning: {
    en: string;
    jp: string;
    ru: string;
  };
  noteFreq: number; // Audio frequency for the wind chime tone
  positionX: number; // percentage along Torii beam (e.g., 20% to 80%)
  tasselLength: number; // px
  cordColor: string;
  bellType: 'furin' | 'suzu' | 'ema';
}

export interface TourItem {
  id: string;
  num: string;
  title: {
    en: string;
    jp: string;
    ru: string;
  };
  subtitle: {
    en: string;
    jp: string;
    ru: string;
  };
  location: string;
  duration: string;
  groupSize: string;
  rating: number;
  reviewsCount: number;
  price: string;
  image: string;
  gallery: string[];
  description: {
    en: string;
    jp: string;
    ru: string;
  };
  highlights: {
    en: string[];
    jp: string[];
    ru: string[];
  };
}

export interface HighlightCard {
  id: string;
  title: {
    en: string;
    jp: string;
    ru: string;
  };
  text: {
    en: string;
    jp: string;
    ru: string;
  };
  category: {
    en: string;
    jp: string;
    ru: string;
  };
  iconType: 'shrine' | 'dining' | 'flight';
}
