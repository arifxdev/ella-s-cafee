/**
 * Generative Ambient Cafe Soundscape using Web Audio API
 * Generates soft jazz chords, warm espresso steam hiss, and subtle porcelain clinks.
 */

class CafeSoundscape {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private timerIds: number[] = [];
  private noiseNode: AudioBufferSourceNode | null = null;

  // Jazz chord progressions (Frequencies in Hz)
  private chords = [
    // Fmaj9: F3, A3, C4, E4, G4
    [174.61, 220.0, 261.63, 329.63, 392.0],
    // Dm9: D3, F3, A3, C4, E4
    [146.83, 174.61, 220.0, 261.63, 329.63],
    // Gm9: G3, Bb3, D4, F4, A4
    [196.0, 233.08, 293.66, 349.23, 440.0],
    // C13: C3, E3, Bb3, D4, A4
    [130.81, 164.81, 233.08, 293.66, 440.0]
  ];
  private chordIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isPlaying = true;

    // Smooth fade in master volume
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.22, now + 1.2);

    // 1. Start room warmth / subtle cafe presence
    this.startCafeRoomHum();

    // 2. Start jazz Rhodes chords loop
    this.scheduleNextJazzChord();

    // 3. Start espresso steam hiss loop
    this.scheduleEspressoSteam();

    // 4. Start occasional porcelain teaspoon clink
    this.schedulePorcelainClink();
  }

  public stop() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    this.isPlaying = false;

    // Clear all scheduled timers
    this.timerIds.forEach((id) => clearTimeout(id));
    this.timerIds = [];

    // Smooth fade out master volume
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);

    setTimeout(() => {
      if (!this.isPlaying && this.noiseNode) {
        try {
          this.noiseNode.stop();
          this.noiseNode.disconnect();
        } catch (_) {}
        this.noiseNode = null;
      }
    }, 900);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Generates a mellow Rhodes / electric piano note
   */
  private playMellowTone(freq: number, startTime: number, duration: number, gainVol: number) {
    if (!this.ctx || !this.masterGain) return;

    // Main tone (triangle for warm electric piano harmonic profile)
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    // Subtle sub tone for body
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(freq / 2, startTime);

    // Warm low-pass filter (vintage tone)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(850, startTime);
    filter.frequency.exponentialRampToValueAtTime(320, startTime + duration);

    // Note Envelope
    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0, startTime);
    // Soft attack
    noteGain.gain.linearRampToValueAtTime(gainVol, startTime + 0.12);
    // Long natural decay
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // Sub note envelope
    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0, startTime);
    subGain.gain.linearRampToValueAtTime(gainVol * 0.4, startTime + 0.1);
    subGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.8);

    // Connect graph
    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(startTime);
    subOsc.start(startTime);
    osc.stop(startTime + duration);
    subOsc.stop(startTime + duration);
  }

  /**
   * Progress through soft jazz chords with arpeggiation
   */
  private scheduleNextJazzChord = () => {
    if (!this.isPlaying || !this.ctx) return;

    const chord = this.chords[this.chordIndex];
    this.chordIndex = (this.chordIndex + 1) % this.chords.length;

    const now = this.ctx.currentTime;
    const chordDuration = 5.2;

    // Play chord with subtle strum / arpeggiation timing
    chord.forEach((noteFreq, idx) => {
      const noteDelay = idx * 0.18 + (Math.random() * 0.05);
      const noteVol = 0.06 - (idx * 0.007);
      this.playMellowTone(noteFreq, now + noteDelay, chordDuration + 1.0, Math.max(0.015, noteVol));
    });

    // Occasional gentle jazz embellishment note halfway through
    if (Math.random() > 0.3) {
      const embellishNote = chord[chord.length - 1] * 1.25; // jazzy 9th / 11th extension
      this.playMellowTone(embellishNote, now + 2.4, 2.2, 0.025);
    }

    const timer = window.setTimeout(this.scheduleNextJazzChord, chordDuration * 1000);
    this.timerIds.push(timer);
  };

  /**
   * Room presence background noise
   */
  private startCafeRoomHum() {
    if (!this.ctx || !this.masterGain) return;

    // Create 3 seconds of gentle noise buffer
    const bufferSize = this.ctx.sampleRate * 3;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to warm low hum / room presence
    const roomFilter = this.ctx.createBiquadFilter();
    roomFilter.type = 'lowpass';
    roomFilter.frequency.setValueAtTime(320, this.ctx.currentTime);

    const roomGain = this.ctx.createGain();
    roomGain.gain.setValueAtTime(0.025, this.ctx.currentTime);

    whiteNoise.connect(roomFilter);
    roomFilter.connect(roomGain);
    roomGain.connect(this.masterGain);

    whiteNoise.start();
    this.noiseNode = whiteNoise;
  }

  /**
   * Barista espresso steam wand hiss simulation
   */
  private triggerEspressoSteam() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const duration = 2.4 + Math.random() * 1.2;
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);

    // Pink-ish noise formula for realistic steam
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      data[i] = (b0 + b1 + b2) * 0.25;
    }

    const steamSrc = this.ctx.createBufferSource();
    steamSrc.buffer = noiseBuffer;

    // Resonant bandpass for milk frothing hiss
    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1400, this.ctx.currentTime);
    bandpass.frequency.linearRampToValueAtTime(2600, this.ctx.currentTime + duration * 0.4);
    bandpass.frequency.linearRampToValueAtTime(1100, this.ctx.currentTime + duration);
    bandpass.Q.setValueAtTime(1.8, this.ctx.currentTime);

    const steamGain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    steamGain.gain.setValueAtTime(0.0001, now);
    steamGain.gain.linearRampToValueAtTime(0.065, now + 0.4); // gentle crescendo
    steamGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    steamSrc.connect(bandpass);
    bandpass.connect(steamGain);
    steamGain.connect(this.masterGain);

    steamSrc.start(now);
  }

  private scheduleEspressoSteam = () => {
    if (!this.isPlaying) return;
    this.triggerEspressoSteam();
    // Steam wand every 10–18 seconds
    const nextInterval = 10000 + Math.random() * 8000;
    const timer = window.setTimeout(this.scheduleEspressoSteam, nextInterval);
    this.timerIds.push(timer);
  };

  /**
   * Subtle porcelain cup / teaspoon clink
   */
  private triggerPorcelainClink() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    const baseFreq = 2600 + Math.random() * 800; // high delicate ceramic ping
    osc.frequency.setValueAtTime(baseFreq, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.022, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22); // very fast ceramic ring

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  private schedulePorcelainClink = () => {
    if (!this.isPlaying) return;
    this.triggerPorcelainClink();
    // Clink every 6–12 seconds
    const nextInterval = 6000 + Math.random() * 6000;
    const timer = window.setTimeout(this.schedulePorcelainClink, nextInterval);
    this.timerIds.push(timer);
  };
}

export const cafeAudio = new CafeSoundscape();
