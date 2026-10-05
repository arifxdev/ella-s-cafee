import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { FEATURED_CAKES } from '../data/cafeData';
import { ProductItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedCakesProps {
  onSelectItem: (item: ProductItem) => void;
  onAddToCart: (item: ProductItem) => void;
}

export const FeaturedCakes: React.FC<FeaturedCakesProps> = ({
  onSelectItem,
  onAddToCart
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Safe GSAP animation with immediate fallback
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.product-card');

      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
            scrollTrigger: {
              trigger: cardsRef.current || sectionRef.current,
              start: 'top 90%',
              once: true,
              onEnter: () => {
                cards.forEach((card) => {
                  card.style.opacity = '1';
                });
              }
            }
          }
        );
      }
    }, sectionRef);

    // Failsafe safety timeout: ensure cards are always visible regardless of scroll state
    const timer = setTimeout(() => {
      const cards = document.querySelectorAll<HTMLElement>('.product-card');
      cards.forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
    }, 600);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#F8F5EE] relative z-10"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Subtle section kicker for accessibility & semantic clarity */}
        <div className="text-center mb-12">
          <p className="font-script-accent text-3xl sm:text-4xl text-[#C38B52] mb-1 select-none">
            Freshly Baked Every Morning
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1A2F23]">
            Artisanal Patisserie Collection
          </h2>
        </div>

        {/* 3 Featured Product Cards Grid - Replicating Reference Layout Exactly */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch"
        >
          {FEATURED_CAKES.map((cake) => {
            return (
              <div
                key={cake.id}
                className="product-card group relative flex flex-col justify-between p-8 sm:p-10 rounded-[36px] transition-all duration-500 hover:-translate-y-2 cursor-pointer shadow-[0_4px_24px_rgba(26,47,35,0.04)] hover:shadow-[0_20px_40px_rgba(26,47,35,0.09)] border border-black/[0.03]"
                style={{ backgroundColor: cake.bgColor, opacity: 1 }}
                onClick={() => onSelectItem(cake)}
              >
                {/* Top Section: Title & Subtitle */}
                <div className="text-center mb-6">
                  <h3 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1A2F23] tracking-tight">
                    {cake.name}
                  </h3>
                  <p
                    className="font-script-accent text-2xl sm:text-3xl mt-1 select-none"
                    style={{ color: cake.accentColor }}
                  >
                    {cake.subtitle}
                  </p>
                </div>

                {/* Center Section: High-Fidelity Cake Photography */}
                <div className="relative my-4 flex items-center justify-center">
                  <div className="w-full max-w-[260px] aspect-square rounded-2xl overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.08)] bg-white/40 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1">
                    <img
                      src={cake.image}
                      alt={`${cake.name} - ${cake.subtitle}`}
                      className="w-full h-full object-cover"
                      loading="eager"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Resilient fallback image if local asset fails in any sandbox
                        const target = e.currentTarget;
                        target.src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                  </div>

                  {/* Quick price tag float */}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#1A2F23] shadow-xs">
                    {cake.currency}{cake.price.toFixed(2)}
                  </div>
                </div>

                {/* Bottom Section: Tagline & Interactive Circular Action Button */}
                <div className="pt-6 mt-4 flex items-center justify-between border-t border-black/5">
                  <span className="text-xs font-medium text-[#48534C] tracking-wide">
                    {cake.tagline}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(cake);
                    }}
                    aria-label={`Add ${cake.name} to cart`}
                    style={{ backgroundColor: cake.btnColor }}
                    className="w-10 h-10 rounded-full text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-md cursor-pointer shrink-0 ml-4 group/btn"
                  >
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
