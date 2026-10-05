import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Leaf, Coffee, Heart, ChevronRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { heroGreenCup } from '../data/cafeData';

interface HeroProps {
  onExploreClick: () => void;
  onOpenItemModal?: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageArchRef = useRef<HTMLDivElement>(null);
  const cupImgRef = useRef<HTMLImageElement>(null);
  const badgeRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-kicker', {
        y: -16,
        opacity: 0,
        duration: 0.8,
        delay: 0.1
      })
      .from('.hero-heading', {
        y: 32,
        opacity: 0,
        duration: 1,
        stagger: 0.1
      }, '-=0.5')
      .from('.hero-description', {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, '-=0.6')
      .from('.hero-cta', {
        scale: 0.92,
        opacity: 0,
        duration: 0.7
      }, '-=0.5')
      .from(imageArchRef.current, {
        scale: 0.94,
        opacity: 0,
        x: 40,
        duration: 1.2,
        ease: 'power2.out'
      }, '-=0.8')
      .from('.hero-badge-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15
      }, '-=0.6');

      // Parallax interaction on mouse move for the hero visual
      const handleMouseMove = (e: MouseEvent) => {
        if (!cupImgRef.current || !heroRef.current) return;
        const { clientX, clientY } = e;
        const rect = heroRef.current.getBoundingClientRect();
        const xPos = (clientX - (rect.left + rect.width / 2)) / 35;
        const yPos = (clientY - (rect.top + rect.height / 2)) / 35;

        gsap.to(cupImgRef.current, {
          x: xPos,
          y: yPos,
          rotation: xPos * 0.05,
          duration: 1.2,
          ease: 'power1.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#F8F5EE]"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & Badges */}
          <div ref={textContainerRef} className="lg:col-span-6 xl:col-span-6 z-10">
            {/* Script Kicker */}
            <p className="hero-kicker font-script-accent text-3xl sm:text-4xl text-[#C38B52] mb-3 select-none">
              Life Happens, Coffee Helps
            </p>

            {/* Main Headline */}
            <h1 className="hero-heading font-serif-display text-5xl sm:text-6xl xl:text-7xl font-semibold tracking-tight text-[#1A2F23] leading-[1.08] mb-6">
              Sweet Moments <br />
              Start <span className="text-[#C38B52]">Here.</span>
            </h1>

            {/* Description */}
            <p className="hero-description text-[#556259] text-base sm:text-lg max-w-lg leading-relaxed mb-8">
              Indulge in handcrafted coffee and delicious treats made to brighten your day and warm your heart.
            </p>

            {/* CTA Button */}
            <div className="hero-cta mb-14">
              <MagneticButton
                onClick={onExploreClick}
                strength={16}
                className="bg-[#1A2F23] hover:bg-[#122219] text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest shadow-[0_8px_20px_rgba(26,47,35,0.22)] hover:shadow-[0_12px_28px_rgba(26,47,35,0.3)] gap-2 group"
              >
                <span>EXPLORE MORE</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
            </div>

            {/* 3 Highlights / Feature Badges */}
            <div
              ref={badgeRowRef}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#1A2F23]/10"
            >
              {/* Feature 1 */}
              <div className="hero-badge-item flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-full bg-[#1A2F23] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
                  <Leaf className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-[#1A2F23] tracking-tight">Finest Ingredients</h2>
                  <p className="text-xs text-[#637067] leading-snug mt-0.5">Sourced from the best coffee farms.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="hero-badge-item flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-full bg-[#C38B52] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
                  <Coffee className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-[#1A2F23] tracking-tight">Perfectly Brewed</h2>
                  <p className="text-xs text-[#637067] leading-snug mt-0.5">Expertly roasted for rich flavor.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="hero-badge-item flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-full bg-[#1A2F23] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
                  <Heart className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-[#1A2F23] tracking-tight">Made with Love</h2>
                  <p className="text-xs text-[#637067] leading-snug mt-0.5">Crafted with passion for you.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Signature Green Fluted Cup Visual */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end relative">
            <div
              ref={imageArchRef}
              className="relative w-full max-w-[540px] xl:max-w-[580px] aspect-square"
            >
              {/* Deep Emerald Background Arch matching the reference aesthetic */}
              <div className="absolute top-0 right-0 w-[95%] h-[95%] bg-[#1A2F23] rounded-tl-[160px] rounded-tr-[160px] rounded-br-[160px] rounded-bl-[40px] shadow-[0_24px_60px_rgba(26,47,35,0.2)] overflow-hidden">
                {/* Subtle radial inner glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,rgba(68,110,84,0.35)_0%,transparent_70%)]" />
              </div>

              {/* Cup Image with overflow effect */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                <div className="relative w-full h-full rounded-tl-[140px] rounded-tr-[140px] rounded-br-[140px] rounded-bl-[30px] overflow-hidden group">
                  <img
                    ref={cupImgRef}
                    src={heroGreenCup || '/images/hero_green_cup.jpg'}
                    alt="Handcrafted green ceramic cup with latte art"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = '/images/hero_green_cup.jpg';
                    }}
                  />

                  {/* Delicate animated steam plumes rising from the latte foam */}
                  <div className="absolute top-[28%] left-[48%] pointer-events-none flex gap-2">
                    <span className="w-1.5 h-10 bg-white/40 rounded-full blur-[2px] animate-steam-1" />
                    <span className="w-1.5 h-14 bg-white/50 rounded-full blur-[2px] animate-steam-2" />
                    <span className="w-1.5 h-8 bg-white/30 rounded-full blur-[2px] animate-steam-3" />
                  </div>
                </div>
              </div>

              {/* Decorative floating roasted coffee bean clusters */}
              <div className="absolute -bottom-4 -left-6 z-20 hidden sm:flex items-center gap-2 bg-[#F8F5EE]/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-[#1A2F23]/10 shadow-[0_8px_24px_rgba(26,47,35,0.08)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C38B52] animate-pulse" />
                <span className="text-xs font-semibold text-[#1A2F23] tracking-wide">
                  Single Origin 100% Arabica
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
