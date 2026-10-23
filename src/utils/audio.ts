// Web Audio API based ambient synthesizer and sound effects

let audioCtx: AudioContext | null = null;
let ambientOscillator1: OscillatorNode | null = null;
let ambientOscillator2: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;
let isAmbientPlaying = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const playTapSound = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // AudioContext might be blocked until user gesture
  }
};

export const playWinSound = () => {
  try {
    const ctx = getAudioContext();
    const notes = [440, 554.37, 659.25, 880]; // A major arpeggio
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.1);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 0.4);
    });
  } catch {
    // ignore
  }
};

export const playDangerSound = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch {
    // ignore
  }
};

export const playWolfHowl = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    const now = ctx.currentTime;

    // A realistic wolf howl pitch contour: low -> rising high -> long cry -> gentle decline
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(320, now + 0.4);
    osc.frequency.exponentialRampToValueAtTime(540, now + 1.1);
    osc.frequency.exponentialRampToValueAtTime(510, now + 2.0);
    osc.frequency.exponentialRampToValueAtTime(380, now + 2.9);
    osc.frequency.exponentialRampToValueAtTime(240, now + 3.8);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(1200, now + 1.1);
    filter.frequency.linearRampToValueAtTime(600, now + 3.8);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.5);
    gain.gain.linearRampToValueAtTime(0.22, now + 1.2);
    gain.gain.linearRampToValueAtTime(0.16, now + 2.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 3.85);
  } catch {
    // ignore
  }
};

export const toggleAmbientWilderness = (shouldPlay: boolean): boolean => {
  try {
    const ctx = getAudioContext();
    if (shouldPlay && !isAmbientPlaying) {
      // Create wind & night atmosphere
      const now = ctx.currentTime;
      ambientOscillator1 = ctx.createOscillator();
      ambientOscillator2 = ctx.createOscillator();
      ambientGain = ctx.createGain();

      ambientOscillator1.type = 'sine';
      ambientOscillator1.frequency.setValueAtTime(75, now);

      ambientOscillator2.type = 'triangle';
      ambientOscillator2.frequency.setValueAtTime(110, now);

      ambientGain.gain.setValueAtTime(0.001, now);
      ambientGain.gain.linearRampToValueAtTime(0.035, now + 1.5);

      ambientOscillator1.connect(ambientGain);
      ambientOscillator2.connect(ambientGain);
      ambientGain.connect(ctx.destination);

      ambientOscillator1.start();
      ambientOscillator2.start();
      isAmbientPlaying = true;
      return true;
    } else if (!shouldPlay && isAmbientPlaying) {
      if (ambientGain && audioCtx) {
        ambientGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
        setTimeout(() => {
          try {
            ambientOscillator1?.stop();
            ambientOscillator2?.stop();
            ambientOscillator1?.disconnect();
            ambientOscillator2?.disconnect();
          } catch {
            // ignore
          }
          isAmbientPlaying = false;
        }, 600);
      }
      return false;
    }
    return isAmbientPlaying;
  } catch {
    return false;
  }
};
