import { HangingChimeItem, TourItem, HighlightCard } from '../types';

export const HANGING_CHIMES: HangingChimeItem[] = [
  {
    id: 'chime-1',
    kanji: '東京',
    kana: 'とうきょう',
    meaning: {
      en: 'Tokyo (Eastern Capital)',
      jp: '東京 (東の都)',
      ru: 'Токио (Восточная столица)'
    },
    noteFreq: 880.0, // A5
    positionX: 18,
    tasselLength: 85,
    cordColor: '#c0392b',
    bellType: 'furin'
  },
  {
    id: 'chime-2',
    kanji: '平安',
    kana: 'へいあん',
    meaning: {
      en: 'Peace & Tranquility',
      jp: '平安 (安らぎと調和)',
      ru: 'Мир и гармония'
    },
    noteFreq: 1046.50, // C6
    positionX: 32,
    tasselLength: 105,
    cordColor: '#3e2723',
    bellType: 'suzu'
  },
  {
    id: 'chime-3',
    kanji: '祈願',
    kana: 'きがん',
    meaning: {
      en: 'Sacred Wish / Prayer',
      jp: '祈願 (願いと祝福)',
      ru: 'Священная молитва'
    },
    noteFreq: 1174.66, // D6
    positionX: 46,
    tasselLength: 95,
    cordColor: '#a93226',
    bellType: 'ema'
  },
  {
    id: 'chime-4',
    kanji: '吉運',
    kana: 'きちうん',
    meaning: {
      en: 'Auspicious Fortune',
      jp: '吉運 (大いなる幸運)',
      ru: 'Благословение удачи'
    },
    noteFreq: 1318.51, // E6
    positionX: 60,
    tasselLength: 110,
    cordColor: '#2c1810',
    bellType: 'furin'
  },
  {
    id: 'chime-5',
    kanji: '桜夢',
    kana: 'さくらゆめ',
    meaning: {
      en: 'Sakura Dream',
      jp: '桜夢 (春の幻影)',
      ru: 'Мечта цветущей сакуры'
    },
    noteFreq: 1567.98, // G6
    positionX: 74,
    tasselLength: 90,
    cordColor: '#c0392b',
    bellType: 'suzu'
  },
  {
    id: 'chime-6',
    kanji: '旅情',
    kana: 'りょじょう',
    meaning: {
      en: 'Wanderlust / Travel Spirit',
      jp: '旅情 (旅の情緒)',
      ru: 'Дух странствий'
    },
    noteFreq: 1760.00, // A6
    positionX: 86,
    tasselLength: 100,
    cordColor: '#3e2723',
    bellType: 'ema'
  }
];

export const HERO_HIGHLIGHTS: HighlightCard[] = [
  {
    id: 'highlight-1',
    category: {
      en: 'Sacred Sanctuaries',
      jp: '聖地・神殿',
      ru: 'Священные храмы'
    },
    title: {
      en: 'Lake Ashi & Hakone Shrine Gate',
      jp: '芦ノ湖と箱根神社の鳥居',
      ru: 'Озеро Аси и врата Хаконэ'
    },
    text: {
      en: 'Dusk falls upon the tranquil waters as the ancient red Torii stands guarding the spirit of Mount Fuji.',
      jp: '夕暮れの静寂に佇む朱色の鳥居が、霊峰富士の魂を守護する。',
      ru: 'Сумерки опускаются на гладь вод, где древние врата Тории хранят покой священной горы Фудзи.'
    },
    iconType: 'shrine'
  },
  {
    id: 'highlight-2',
    category: {
      en: 'Night Gastronomy',
      jp: '夜の美味美酒',
      ru: 'Ночная гастрономия'
    },
    title: {
      en: 'Izakayas & Hidden Neon Alleys',
      jp: '居酒屋と秘密の横丁',
      ru: 'Идзакая и неоновые переулки'
    },
    text: {
      en: 'Explore labyrinthine lantern-lit alleyways of Omoide Yokocho and Michelin-starred culinary artistry.',
      jp: '思い出横丁の赤提灯からミシュラン星付きの極上懐石まで巡る魅惑の夜。',
      ru: 'Исследуйте лабиринты светящихся фонариками улочек Омоидэ Ёкотё и изысканные кулинарные традиции.'
    },
    iconType: 'dining'
  },
  {
    id: 'highlight-3',
    category: {
      en: 'Journey Express',
      jp: '新幹線と旅',
      ru: 'Скоростное путешествие'
    },
    title: {
      en: 'Shinkansen & Mountain Escapes',
      jp: '新幹線で行く日本の秘境',
      ru: 'Синкансэн и горные тропы'
    },
    text: {
      en: 'Glide across the Japanese archipelago from Tokyo neon to cedar forest hot springs in pure comfort.',
      jp: '超特急の静かな鼓動に揺られ、大都会の光から杉木立の温泉郷へと至る旅。',
      ru: 'Мчитесь на сверхскоростных поездах от огней мегаполиса к кристальным горным термальным источникам.'
    },
    iconType: 'flight'
  }
];

export const POPULAR_TOURS: TourItem[] = [
  {
    id: 'tour-1',
    num: 'ТУР №1',
    title: {
      en: 'Historic Asakusa & Yanaka Twilight',
      jp: '浅草の歴史と谷中の夕暮れ',
      ru: 'Историческая Асакуса и сумерки Янаки'
    },
    subtitle: {
      en: 'and get unforgettable emotions',
      jp: '忘れられない感動をあなたに',
      ru: 'и получите незабываемые эмоции'
    },
    location: 'Tokyo, Asakusa & Taito',
    duration: '3 Days / 2 Nights',
    groupSize: 'Small group (Max 8)',
    rating: 4.96,
    reviewsCount: 148,
    price: '$890',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1538964173705-9652593830eb?q=80&w=1200&auto=format&fit=crop'
    ],
    description: {
      en: 'Step through the colossal thunder gate of Senso-ji, savor artisan tea cakes on Nakamise Street, and experience nostalgic Edo-era townhouses bathed in amber lantern glow.',
      jp: '浅草寺の雷門をくぐり、仲見世通りの名物を味わい、江戸情緒が色濃く残る谷中の路地を夕暮れ時に歩く極上の体験。',
      ru: 'Пройдите сквозь монументальные врата Грома Сэнсо-дзи, отведайте сладости на улице Накамисэ и ощутите тепло янтарных фонарей в старинных кварталах эпохи Эдо.'
    },
    highlights: {
      en: ['VIP Early-Access Senso-ji Temple walk', 'Traditional Matchamaking ceremony', 'Rickshaw ride through historical Yanaka', 'Private Izakaya dinner with master chef'],
      jp: ['浅草寺早朝プライベート参拝', '本格茶道体験とお抹茶', '谷中の風情ある人力車周遊', '隠れ家割烹での特別ディナー'],
      ru: ['Утренний визит в храм Сэнсо-дзи без толпы', 'Традиционная чайная церемония с мастером', 'Прогулка на рикше по Янаке', 'Ужин в аутентичной идзакая от шефа']
    }
  },
  {
    id: 'tour-2',
    num: 'ТУР №2',
    title: {
      en: 'Imperial Castles & Samurai Heritage',
      jp: '皇居・名城と武士の誇り',
      ru: 'Императорские замки и наследие самураев'
    },
    subtitle: {
      en: 'and get unforgettable emotions',
      jp: '忘れられない感動をあなたに',
      ru: 'и получите незабываемые эмоции'
    },
    location: 'Tokyo & Matsumoto',
    duration: '4 Days / 3 Nights',
    groupSize: 'Private luxury',
    rating: 4.98,
    reviewsCount: 112,
    price: '$1,350',
    image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?q=80&w=1200&auto=format&fit=crop'
    ],
    description: {
      en: 'Unravel centuries of samurai lore inside stone moats, marvel at black crow Matsumoto Castle, and walk the private imperial gardens guided by a palace historian.',
      jp: '深き濠と石垣に囲まれた江戸城跡と、漆黒の国宝松本城へ。名門武士の遺産と日本刀の美学に触れる旅。',
      ru: 'Раскройте тайны самураев за гранитными рвами замка Эдо и величественным «Черным вороном» Мацумото с историком императорского двора.'
    },
    highlights: {
      en: ['Exclusive East Gardens of the Imperial Palace tour', 'Katana swordsmanship masterclass', 'Private tour of 400-year-old wooden fortress', 'Kaiseki banquet in traditional Ryokan'],
      jp: ['皇居東御苑特別案内', '本物の日本刀による居合道体験', '松本城天守閣プライベート見学', '老舗旅館での本格懐石会席'],
      ru: ['Эксклюзивная экскурсия по Восточным садам', 'Мастер-класс искусства владения катаной', 'Визит в 400-летнюю цитадель', 'Банкет кайсэки в старинном рёкане']
    }
  },
  {
    id: 'tour-3',
    num: 'ТУР №3',
    title: {
      en: 'Pagodas & Spring Cherry Blossoms',
      jp: '五重塔と咲き誇る桜の杜',
      ru: 'Пагоды и цветущая сакура'
    },
    subtitle: {
      en: 'and get unforgettable emotions',
      jp: '忘れられない感動をあなたに',
      ru: 'и получите незабываемые эмоции'
    },
    location: 'Tokyo & Ueno Park',
    duration: '2 Days / 1 Night',
    groupSize: 'Small group (Max 10)',
    rating: 4.95,
    reviewsCount: 230,
    price: '$720',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop'
    ],
    description: {
      en: 'Witness the iconic multi-tiered pagoda framed by blushing sakura blossoms. Drift along petal-covered canals on a private wooden boat at sunset.',
      jp: '空高くそびえる五重塔と、風に舞う淡い桜の花びら。夕暮れの千鳥ヶ淵で和舟に揺られ、日本の春の美を堪能。',
      ru: 'Станьте свидетелем грации многоярусных пагод в облаке розовых лепестков сакуры. Вечерняя прогулка на лодке по озеру, усыпанному лепестками.'
    },
    highlights: {
      en: ['Sunset boat cruise along sakura-canopied moats', 'Five-story pagoda architectural photography guide', 'Hanami picnic with sake pairing', 'Bespoke kimono fitting for photoshoots'],
      jp: ['桜のトンネルをくぐる夕暮れボートクルーズ', '五重塔と桜の絶景フォトセッション', '銘酒を味わう特製お花見御膳', '本格着物着付けとプロ撮影'],
      ru: ['Круиз на закате под сводами цветущих вишен', 'Фотосессия у пятипагодного святилища', 'Традиционный пикник ханами с саке', 'Примерка шёлкового кимоно ручной работы']
    }
  },
  {
    id: 'tour-4',
    num: 'ТУР №4',
    title: {
      en: 'Rainy Lanterns & Kimono Whispers',
      jp: '雨の提灯と着物の囁き',
      ru: 'Дождливые фонари и шёпот кимоно'
    },
    subtitle: {
      en: 'and get unforgettable emotions',
      jp: '忘れられない感動をあなたに',
      ru: 'и получите незабываемые эмоции'
    },
    location: 'Tokyo & Kyoto Gion Walk',
    duration: '5 Days / 4 Nights',
    groupSize: 'Exclusive (Max 6)',
    rating: 4.99,
    reviewsCount: 310,
    price: '$1,890',
    image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509023464722-18d996393ca8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop'
    ],
    description: {
      en: 'Stroll cobblestone pavements glistening with rain under a traditional red oiled-paper umbrella. Hear the wooden geta sandals echoing beside wooden lattice machiya houses.',
      jp: '雨に濡れる石畳に赤傘を差して歩く。格子戸の奥から響く三味線の音色、静かに佇む花街の幻想的な情緒を味わう。',
      ru: 'Прогуляйтесь по мощёным улочкам под багряным бумажным зонтом вагаса в отражении мокрого камня и уютных деревянных домиков мати-я.'
    },
    highlights: {
      en: ['Handmade Japanese Wagasa umbrella gift', 'Private evening musical performance with Shamisen', 'Nighttime photography expedition with master', 'Zen temple meditation at dawn'],
      jp: ['伝統職人による手作り和傘進呈', '三味線と踊りの非公開プライベート鑑賞', '雨夜の幻想的な石畳フォトツアー', '早朝の静寂に包まれる禅寺坐禅'],
      ru: ['Подарок — традиционный японский зонт вагаса', 'Приватное выступление на сямисэне', 'Ночная фотоэкскурсия по тайным переулкам', 'Утренняя медитация в дзэн-храме']
    }
  }
];

export const UI_TEXT = {
  en: {
    brand: 'TRAVEL',
    nav: {
      main: 'MAIN',
      about: 'ABOUT US',
      tours: 'TOURS',
      gallery: 'GALLERY',
      reviews: 'REVIEWS',
      contacts: 'CONTACTS'
    },
    hero: {
      title: 'VISIT TOKYO',
      subtitle: 'Journey into the heart of timeless grace & electric neon',
      kanjiTitle: '東京 へようこそ',
      exploreMore: 'EXPLORE MORE →',
      soundOn: 'Sound Ambient: ON (Wind chime active)',
      soundOff: 'Sound Ambient: MUTED',
      hintChime: 'Touch or scroll to ring wind chimes',
      scrollHint: 'Scroll to explore'
    },
    popularTours: {
      eyebrow: 'and get unforgettable emotions',
      heading: 'POPULAR TOURS',
      bookNow: 'EXPLORE TOUR',
      details: 'View Itinerary',
      rating: 'rating'
    },
    inspiration: {
      heading: 'TRAVEL AND INSPIRE YOUR LIFE',
      watchVideo: 'Watch video',
      description: 'Here begins a journey that transforms your perception of the world. Experience the breathtaking vistas of Mount Fuji under the starry Milky Way, sacred alpine highways, and hidden hot spring sanctuaries created for true explorers.',
      exploreDestinations: 'Discover Sacred Routes'
    },
    search: {
      placeholder: 'Search Tokyo destinations (e.g. Asakusa, Shibuya, Torii, Mount Fuji)...',
      noResults: 'No destinations found',
      quickTags: ['Torii Gate', 'Asakusa Temple', 'Mount Fuji', 'Shinjuku Neon', 'Gion Quarter', 'Onsen Hot Springs']
    }
  },
  jp: {
    brand: 'TRAVEL',
    nav: {
      main: 'ホーム',
      about: '紹介',
      tours: 'ツアー',
      gallery: 'ギャラリー',
      reviews: '口コミ',
      contacts: 'お問い合わせ'
    },
    hero: {
      title: 'VISIT TOKYO',
      subtitle: '悠久の静寂と最先端の光が織りなす東洋の至宝',
      kanjiTitle: '東京 へようこそ',
      exploreMore: '詳細を見る →',
      soundOn: '音響効果：ON（風鈴・鈴が鳴ります）',
      soundOff: '音響効果：ミュート',
      hintChime: 'スクロールまたは風鈴に触れて音を奏でる',
      scrollHint: 'スクロールして探索'
    },
    popularTours: {
      eyebrow: '忘れられない感動をあなたに',
      heading: '人気の厳選ツアー',
      bookNow: 'ツアー詳細',
      details: '日程を見る',
      rating: '評価'
    },
    inspiration: {
      heading: 'TRAVEL AND INSPIRE YOUR LIFE',
      watchVideo: '動画を見る',
      description: '人生を豊かに彩る、息を呑むほどの旅へ。天の川が輝く夜の富士山、雪嶺を仰ぐ山岳ルート、そして日本古来の温もりに抱かれる秘湯へご案内します。',
      exploreDestinations: '絶景ルートを探訪'
    },
    search: {
      placeholder: '東京の目的地を検索（例：浅草、鳥居、富士山、新宿）...',
      noResults: '見つかりませんでした',
      quickTags: ['鳥居', '浅草寺', '富士山', '新宿ネオン', '花街', '温泉郷']
    }
  },
  ru: {
    brand: 'TRAVEL',
    nav: {
      main: 'ГЛАВНАЯ',
      about: 'О НАС',
      tours: 'ТУРЫ',
      gallery: 'ГАЛЕРЕЯ',
      reviews: 'ОТЗЫВЫ',
      contacts: 'КОНТАКТЫ'
    },
    hero: {
      title: 'VISIT TOKYO',
      subtitle: 'Погружение в гармонию древних храмов и сияние футуристического мегаполиса',
      kanjiTitle: '東京 へようこそ',
      exploreMore: 'ПОДРОБНЕЕ →',
      soundOn: 'Звук ветра и колоколов: ВКЛ',
      soundOff: 'Звук: ВЫКЛ',
      hintChime: 'Коснитесь колокольчиков или прокрутите страницу',
      scrollHint: 'Листайте вниз'
    },
    popularTours: {
      eyebrow: 'и получите незабываемые эмоции',
      heading: 'ПОПУЛЯРНЫЕ ТУРЫ',
      bookNow: 'ПОДРОБНЕЕ',
      details: 'Смотреть программу',
      rating: 'рейтинг'
    },
    inspiration: {
      heading: 'TRAVEL AND INSPIRE YOUR LIFE',
      watchVideo: 'Смотреть видео',
      description: 'Здесь будет ваше незабываемое путешествие для жизни, которое вам подарит открытый космос впечатлений: звездный Млечный Путь над священной Фудзи, горные перевалы и термальные оазисы.',
      exploreDestinations: 'Маршруты открытий'
    },
    search: {
      placeholder: 'Поиск туров и локаций (например: Тории, Асакуса, Фудзи, Синдзюку)...',
      noResults: 'Ничего не найдено',
      quickTags: ['Врата Тории', 'Асакуса', 'Фудзи', 'Неон Синдзюку', 'Квартал Гейш', 'Онсэн']
    }
  }
};
