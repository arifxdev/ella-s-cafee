import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { cafeAudio } from '../utils/cafeAudio';

interface SoundscapeToggleProps {
  className?: string;
}

export const SoundscapeToggle: React.FC<SoundscapeToggleProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const waveTimeline = useRef<gsap.core.Timeline | null>(null);

  const toggleSound = () => {
    const newState = cafeAudio.toggle();
    setIsPlaying(newState);

    // Animate icon pop on click
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { scale: 0.8, rotate: newState ? -15 : 15 },
        { scale: 1, rotate: 0, duration: 0.4, ease: 'back.out(2)' }
      );
    }
  };

  useEffect(() => {
    const validBars = barRefs.current.filter(Boolean) as HTMLSpanElement[];

    if (isPlaying) {
      // Create bouncy, organic audio wave visualization with GSAP
      if (waveTimeline.current) waveTimeline.current.kill();
      waveTimeline.current = gsap.timeline({ repeat: -1 });

      validBars.forEach((bar, i) => {
        // Individual random oscillation for each bar
        gsap.to(bar, {
          scaleY: 'random(0.3, 1)',
          duration: `random(0.35, 0.65)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.1
        });
      });
    } else {
      // Gracefully collapse equalizer bars to quiet resting state
      validBars.forEach((bar) => {
        gsap.killTweensOf(bar);
        gsap.to(bar, {
          scaleY: 0.2,
          duration: 0.35,
          ease: 'power2.out'
        });
      });
    }

    return () => {
      validBars.forEach((bar) => gsap.killTweensOf(bar));
      if (waveTimeline.current) waveTimeline.current.kill();
    };
  }, [isPlaying]);

  return (
    <button
      onClick={toggleSound}
      type="button"
      aria-label={isPlaying ? 'Mute ambient cafe soundscape' : 'Play ambient cafe soundscape'}
      className={`group relative inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border transition-all duration-300 select-none cursor-pointer ${
        isPlaying
          ? 'bg-[#1A2F23] text-white border-[#1A2F23] shadow-[0_4px_16px_rgba(26,47,35,0.18)]'
          : 'bg-white hover:bg-[#F2ECE1] text-[#4A554D] hover:text-[#1A2F23] border-[#1A2F23]/15'
      } ${className}`}
    >
      {/* Icon with GSAP animation ref */}
      <div ref={iconRef} className="shrink-0">
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-[#C38B52]" />
        ) : (
          <VolumeX className="w-4 h-4 text-[#7B887E] group-hover:text-[#1A2F23]" />
        )}
      </div>

      {/* Label */}
      <span className="text-xs font-medium tracking-tight">
        {isPlaying ? 'Cafe Soundscape On' : 'Play Cafe Ambiance'}
      </span>

      {/* GSAP Animated Soundwave Equalizer Bars */}
      <div className="flex items-center gap-[2px] h-3.5 px-0.5" aria-hidden="true">
        {[0, 1, 2, 3].map((index) => (
          <span
            key={index}
            ref={(el) => {
              barRefs.current[index] = el;
            }}
            className={`w-[2.5px] h-full origin-bottom rounded-full transition-colors ${
              isPlaying ? 'bg-[#C38B52]' : 'bg-[#1A2F23]/25 group-hover:bg-[#1A2F23]/40'
            }`}
            style={{ transform: 'scaleY(0.2)' }}
          />
        ))}
      </div>

      {/* Subtle indicator pill when active */}
      {isPlaying && (
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C38B52] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C38B52]" />
        </span>
      )}
    </button>
  );
};
