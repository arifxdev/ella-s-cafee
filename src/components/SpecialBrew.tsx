import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ChevronRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { SPECIAL_BREW } from '../data/cafeData';
import { ProductItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface SpecialBrewProps {
  onDiscoverClick: (item: ProductItem) => void;
}

export const SpecialBrew: React.FC<SpecialBrewProps> = ({ onDiscoverClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              once: true
            }
          }
        );
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              once: true
            }
          }
        );
      }
    }, containerRef);

    // Failsafe timeout
    const timer = setTimeout(() => {
      if (visualRef.current) visualRef.current.style.opacity = '1';
      if (textRef.current) textRef.current.style.opacity = '1';
    }, 600);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="special"
      ref={containerRef}
      className="py-20 md:py-28 bg-[#F8F5EE] relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual with Wooden Coaster, Brass Spoon & Latte */}
          <div
            ref={visualRef}
            className="lg:col-span-6 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[500px] aspect-square rounded-[40px] p-2 bg-gradient-to-tr from-[#EBE4D5] to-[#F8F5EE] shadow-[0_16px_40px_rgba(26,47,35,0.06)] border border-[#1A2F23]/10">
              <div className="w-full h-full rounded-[34px] overflow-hidden group">
                <img
                  src={SPECIAL_BREW.image}
                  alt="Ella's Special Müil Coffee"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Price Tag pill */}
              <div className="absolute bottom-6 left-6 bg-[#1A2F23]/90 text-white backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
                Signature Roast · ${SPECIAL_BREW.price.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Checklist & Circular Stamp */}
          <div
            ref={textRef}
            className="lg:col-span-6 relative"
          >
            {/* Stamp "Brewed for You" in the top-right corner matching the reference */}
            <div className="hidden sm:flex absolute -top-8 right-0 lg:right-6 flex-col items-center justify-center w-28 h-28 pointer-events-none select-none">
              <div className="relative w-full h-full flex items-center justify-center animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[10.5px] uppercase font-semibold fill-[#A56C36] tracking-[0.26em]">
                    <textPath href="#circlePath" startOffset="0%">
                      · Brewed for You · Ella's Artisanal ·
                    </textPath>
                  </text>
                </svg>
              </div>
              {/* Botanical sprig in center */}
              <div className="absolute inset-0 flex items-center justify-center text-[#A56C36]">
                <svg className="w-8 h-8 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8 6 6 12 12 22C18 12 16 6 12 2Z" />
                  <path d="M12 7C9 9 9 12 12 14C15 12 15 9 12 7Z" />
                </svg>
              </div>
            </div>

            {/* Script Kicker */}
            <p className="font-script-accent text-3xl sm:text-4xl text-[#C38B52] mb-2 select-none">
              Our Special
            </p>

            {/* Headline */}
            <h2 className="font-serif-display text-4xl sm:text-5xl font-semibold text-[#1A2F23] tracking-tight mb-4">
              Müil Coffee
            </h2>

            {/* Description */}
            <p className="text-[#556259] text-base sm:text-lg leading-relaxed max-w-lg mb-8">
              A perfect blend of bold flavors and smooth taste, crafted to give you a moment of pure bliss.
            </p>

            {/* Checklist */}
            <div className="space-y-3.5 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#1A2F23] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-[#1A2F23]">
                  100% Arabica Beans
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#1A2F23] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-[#1A2F23]">
                  Medium Dark Roast
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#1A2F23] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-[#1A2F23]">
                  Rich Aroma &amp; Smooth Finish
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <MagneticButton
                onClick={() => onDiscoverClick(SPECIAL_BREW)}
                strength={16}
                className="bg-[#1A2F23] hover:bg-[#122219] text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest shadow-[0_8px_20px_rgba(26,47,35,0.2)] hover:shadow-[0_12px_28px_rgba(26,47,35,0.3)] gap-2 group"
              >
                <span>DISCOVER MORE</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
