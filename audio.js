// audio.js - Web Audio API Romantic Ambient Synthesizer & Sound FX Engine
class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.volume = 0.55;
    this.masterGain = null;
    this.timer = null;
    this.currentChordIndex = 0;
    this.visualizerCallbacks = [];
    this.customAudio = null;
    this.isCustom = false;
    this.heartbeatAudio = null;

    // Romantic Chord Progressions (frequencies in Hz)
    // Cmaj9 -> Am9 -> Fmaj7#11 -> G7sus4 -> Em7 -> Dm9 -> G9 -> Cmaj7
    this.chords = [
      // Cmaj9: C3, G3, B3, D4, E4
      [130.81, 196.00, 246.94, 293.66, 329.63],
      // Am9: A2, E3, G3, C4, B4
      [110.00, 164.81, 196.00, 261.63, 493.88],
      // Fmaj7: F2, C3, A3, E4, G4
      [87.31, 130.81, 220.00, 329.63, 392.00],
      // G7sus4: G2, D3, F3, C4, F4
      [98.00, 146.83, 174.61, 261.63, 349.23],
      // Em7: E2, B2, G3, D4, G4
      [82.41, 123.47, 196.00, 293.66, 392.00],
      // Dm9: D3, A3, C4, E4, F4
      [146.83, 220.00, 261.63, 329.63, 349.23],
      // G9: G2, B3, D4, F4, A4
      [98.00, 246.94, 293.66, 349.23, 440.00],
      // Cmaj7 (High Sweet): C3, E3, G3, B3, E5
      [130.81, 164.81, 196.00, 246.94, 659.25]
    ];

    // Sweet melodic notes to arpeggiate gently above the chords
    this.melodyNotes = [
      523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50
    ];
  }

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

    // Warm Lowpass Filter for dreamy ambiance
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    // Stereo Delay effect for spacious celestial atmosphere
    this.delay = this.ctx.createDelay();
    this.delay.delayTime.setValueAtTime(0.38, this.ctx.currentTime);

    this.delayFeedback = this.ctx.createGain();
    this.delayFeedback.gain.setValueAtTime(0.35, this.ctx.currentTime);

    this.delay.connect(this.delayFeedback);
    this.delayFeedback.connect(this.delay);

    this.filter.connect(this.masterGain);
    this.delay.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);
  }

  play() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.startAmbientLoop();
    this.notifyVisualizer(true);
  }

  pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.notifyVisualizer(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  startAmbientLoop() {
    if (this.timer) clearInterval(this.timer);

    // Trigger first chord immediately
    this.playChord(this.chords[this.currentChordIndex]);
    this.playMelodyStep();

    let step = 0;
    this.timer = setInterval(() => {
      if (!this.isPlaying) return;
      step++;
      // Every 4 seconds, transition to next romantic chord
      if (step % 8 === 0) {
        this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
        this.playChord(this.chords[this.currentChordIndex]);
      }
      // Every 500ms, play delicate arpeggiated piano/bell note
      if (Math.random() > 0.25) {
        this.playMelodyStep();
      }
    }, 500);
  }

  playChord(frequencies) {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    frequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Blend sine and triangle for soft warm Rhodes/piano tone
      osc.type = idx === 0 ? 'sine' : (idx % 2 === 0 ? 'triangle' : 'sine');
      osc.frequency.setValueAtTime(freq, now);

      // Gentle attack and lingering decay
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.08 / Math.sqrt(frequencies.length), now + 0.8 + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);

      osc.connect(gain);
      gain.connect(this.filter);
      gain.connect(this.delay);

      osc.start(now + idx * 0.05);
      osc.stop(now + 4.5);
    });
  }

  playMelodyStep() {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    const chord = this.chords[this.currentChordIndex];
    // Pick note from chord harmonic series
    const baseFreq = chord[Math.floor(Math.random() * chord.length)];
    const octaveMult = Math.random() > 0.5 ? 2 : 4;
    const freq = baseFreq * octaveMult;

    if (freq > 2000) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Fast soft chime attack with sparkling decay
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc.connect(gain);
    gain.connect(this.filter);
    gain.connect(this.delay);

    osc.start(now);
    osc.stop(now + 2.0);
  }

  // Romantic Sound Effects
  playCelestialEnter() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Harp-like ascending romantic chime
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.0001, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 1.5);
    });
  }

  playHeartbeat() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Deep sub-bass lub-dub
    [0, 0.22].forEach((offset, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const startF = idx === 0 ? 65 : 55;
      osc.frequency.setValueAtTime(startF, now + offset);
      osc.frequency.exponentialRampToValueAtTime(35, now + offset + 0.18);

      gain.gain.setValueAtTime(0.0001, now + offset);
      gain.gain.linearRampToValueAtTime(0.18, now + offset + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + offset);
      osc.stop(now + offset + 0.25);
    });
  }

  playShootingStarSound() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 1.1);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    gain.connect(this.delay);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.3);
  }

  playNodeClickSound() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Sweet crystal bell ding
    [880, 1318.51].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);

      gain.gain.setValueAtTime(0.0001, now + i * 0.04);
      gain.gain.linearRampToValueAtTime(0.1, now + i * 0.04 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.9);
    });
  }

  playNodeHoverSound() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now);
    osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.08);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.03, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  onVisualizerUpdate(cb) {
    this.visualizerCallbacks.push(cb);
  }

  notifyVisualizer(state) {
    this.visualizerCallbacks.forEach(cb => cb(state));
  }

  loadCustomAudioFile(file) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.customAudio = new Audio(url);
    this.customAudio.loop = true;
    this.customAudio.volume = this.volume;
    this.isCustom = true;

    // Pause synth and play custom
    if (this.isPlaying) {
      this.customAudio.play();
    }
  }
}

window.romanticAudio = new RomanticAudioEngine();
