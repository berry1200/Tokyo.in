/**
 * Japanese Wind Chime (風鈴 Furin / 鈴 Suzu) Synthesizer
 * Uses Web Audio API to create authentic, shimmering glass and bronze bell sounds
 * with realistic resonance and physical decay.
 */

let audioCtx: AudioContext | null = null;
let isAudioEnabled = true;

// Pentatonic scale notes tuned to Japanese traditional bells
export const CHIME_FREQUENCIES = [
  880.0,   // A5
  987.77,  // B5
  1046.50, // C6
  1174.66, // D6
  1318.51, // E6
  1567.98, // G6
  1760.00, // A6
  2093.00, // C7
];

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function toggleAudio(enabled?: boolean): boolean {
  if (enabled !== undefined) {
    isAudioEnabled = enabled;
  } else {
    isAudioEnabled = !isAudioEnabled;
  }
  if (isAudioEnabled) {
    getAudioContext();
  }
  return isAudioEnabled;
}

export function getAudioEnabled(): boolean {
  return isAudioEnabled;
}

let lastChimeTime = 0;

/**
 * Plays an authentic Japanese wind chime / bronze temple bell tone
 * @param freq Fundamental frequency in Hz (defaults to random bell note)
 * @param pan Stereo panning from -1.0 (left) to 1.0 (right)
 * @param volume Master gain multiplier
 */
export function playWindChime(freq?: number, pan: number = 0, volume: number = 0.25): void {
  if (!isAudioEnabled) return;

  const now = performance.now();
  // Prevent excessive audio overlapping (minimum 40ms between chime triggers)
  if (now - lastChimeTime < 40) return;
  lastChimeTime = now;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const t0 = ctx.currentTime;
    const baseFreq = freq || CHIME_FREQUENCIES[Math.floor(Math.random() * CHIME_FREQUENCIES.length)];

    // Master chime gain node
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, t0);
    masterGain.gain.exponentialRampToValueAtTime(Math.min(volume, 0.4), t0 + 0.004);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 2.4);

    // Stereo Panner
    let panner: StereoPannerNode | null = null;
    if (ctx.createStereoPanner) {
      panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(Math.max(-0.85, Math.min(0.85, pan)), t0);
      masterGain.connect(panner);
      panner.connect(ctx.destination);
    } else {
      masterGain.connect(ctx.destination);
    }

    // 1. Primary fundamental bell tone (sine with slight bell metallic strike)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(baseFreq, t0);
    // Slight pitch micro-drop on initial strike
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.998, t0 + 0.3);

    const gain1 = ctx.createGain();
    gain1.gain.setValueAtTime(0.7, t0);
    gain1.gain.exponentialRampToValueAtTime(0.001, t0 + 1.8);
    osc1.connect(gain1);
    gain1.connect(masterGain);

    // 2. High glass/crystal harmonic overtone (characteristic of Edo Furin glass & copper suzu)
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    const overtoneRatio = 2.756; // classic inharmonic chime partial
    osc2.frequency.setValueAtTime(baseFreq * overtoneRatio, t0);

    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.35, t0);
    gain2.gain.exponentialRampToValueAtTime(0.001, t0 + 0.9);
    osc2.connect(gain2);
    gain2.connect(masterGain);

    // 3. Shimmer overtone (4.1x)
    const osc3 = ctx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(baseFreq * 4.12, t0);

    const gain3 = ctx.createGain();
    gain3.gain.setValueAtTime(0.15, t0);
    gain3.gain.exponentialRampToValueAtTime(0.0005, t0 + 0.45);
    osc3.connect(gain3);
    gain3.connect(masterGain);

    // Start oscillators
    osc1.start(t0);
    osc2.start(t0);
    osc3.start(t0);

    // Stop and cleanup
    osc1.stop(t0 + 2.5);
    osc2.stop(t0 + 2.5);
    osc3.stop(t0 + 2.5);
  } catch (err) {
    console.debug('Audio playback note', err);
  }
}

/**
 * Triggers a light wind rustle of chimes (when scrolling creates a breeze)
 */
let lastWindTime = 0;
export function triggerWindBreeze(scrollDelta: number): void {
  if (!isAudioEnabled) return;
  const now = performance.now();
  // Only trigger if scroll delta is noticeable and at least 320ms has passed
  if (Math.abs(scrollDelta) < 15 || now - lastWindTime < 320) return;
  lastWindTime = now;

  // Pick 1 or 2 soft random chimes
  const count = Math.min(2, Math.floor(Math.abs(scrollDelta) / 40) + 1);
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const randomFreq = CHIME_FREQUENCIES[Math.floor(Math.random() * CHIME_FREQUENCIES.length)];
      const randomPan = (Math.random() - 0.5) * 1.2;
      playWindChime(randomFreq, randomPan, 0.15 + Math.random() * 0.1);
    }, i * 110);
  }
}
