import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Coffee, Gift, Check, Sparkles, RotateCcw, Award, ArrowRight, X } from 'lucide-react';

interface CafeLoyaltyProps {
  isOpen?: boolean;
  onClose?: () => void;
  isModal?: boolean;
  onOrderDrink?: () => void;
}

const STORAGE_KEY = 'ellas_cafe_loyalty_v1';
const TOTAL_STAMPS_REQUIRED = 6;

interface LoyaltyState {
  stamps: number;
  totalEarnedRewards: number;
  lastStampDate: string | null;
  voucherCode: string | null;
}

export const CafeLoyalty: React.FC<CafeLoyaltyProps> = ({
  isOpen = true,
  onClose,
  isModal = false,
  onOrderDrink
}) => {
  const [loyalty, setLoyalty] = useState<LoyaltyState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (_) {}
    // Default initial warm state: 4 of 6 stamps
    return {
      stamps: 4,
      totalEarnedRewards: 1,
      lastStampDate: 'Today, 10:15 AM',
      voucherCode: null
    };
  });

  const [justStamped, setJustStamped] = useState(false);
  const [claimedReward, setClaimedReward] = useState(false);

  const circleProgressRef = useRef<SVGCircleElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const radius = 58;
  const circumference = 2 * Math.PI * radius; // ~364.42
  const progressRatio = Math.min(1, loyalty.stamps / TOTAL_STAMPS_REQUIRED);
  const strokeOffset = circumference - progressRatio * circumference;

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loyalty));
    } catch (_) {}
  }, [loyalty]);

  // GSAP animation for the circular progress ring
  useEffect(() => {
    if (circleProgressRef.current) {
      gsap.to(circleProgressRef.current, {
        strokeDashoffset: strokeOffset,
        duration: 1.2,
        ease: 'power3.out'
      });
    }

    if (percentTextRef.current) {
      gsap.fromTo(
        percentTextRef.current,
        { scale: 0.85, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
      );
    }
  }, [loyalty.stamps, strokeOffset]);

  // Add Stamp handler
  const handleAddStamp = () => {
    setJustStamped(true);
    setLoyalty((prev) => {
      const nextStamps = prev.stamps + 1;
      let voucher = prev.voucherCode;
      let earned = prev.totalEarnedRewards;

      if (nextStamps >= TOTAL_STAMPS_REQUIRED) {
        voucher = `ELLA-VELVET-${Math.floor(1000 + Math.random() * 9000)}`;
      }

      return {
        ...prev,
        stamps: Math.min(TOTAL_STAMPS_REQUIRED, nextStamps),
        lastStampDate: 'Just now',
        voucherCode: voucher
      };
    });

    setTimeout(() => setJustStamped(false), 800);
  };

  // Claim Reward handler
  const handleClaimReward = () => {
    setClaimedReward(true);
    setLoyalty((prev) => ({
      ...prev,
      stamps: 0,
      totalEarnedRewards: prev.totalEarnedRewards + 1,
      voucherCode: null
    }));

    setTimeout(() => {
      setClaimedReward(false);
    }, 4000);
  };

  // Reset demo card
  const handleResetCard = () => {
    setLoyalty({
      stamps: 0,
      totalEarnedRewards: loyalty.totalEarnedRewards,
      lastStampDate: null,
      voucherCode: null
    });
  };

  const isComplete = loyalty.stamps >= TOTAL_STAMPS_REQUIRED;
  const stampsRemaining = Math.max(0, TOTAL_STAMPS_REQUIRED - loyalty.stamps);

  const content = (
    <div
      ref={cardRef}
      className="relative bg-gradient-to-br from-[#FFFDF9] to-[#F8F5EE] rounded-[36px] p-6 sm:p-10 border border-[#1A2F23]/12 shadow-[0_16px_40px_rgba(26,47,35,0.06)] overflow-hidden"
    >
      {/* Subtle background seal */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#C38B52]/5 rounded-full pointer-events-none blur-xl" />

      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-[#C38B52]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C38B52]">
              Ella's Society Member Pass
            </span>
          </div>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#1A2F23]">
            Cafe Loyalty Passport
          </h3>
          <p className="text-xs text-[#556259] mt-0.5">
            Collect 6 artisanal drinks &amp; unlock your complimentary signature roast.
          </p>
        </div>

        {isModal && onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#556259] hover:text-[#1A2F23] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left: Circular Animated Progress Ring */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* SVG Progress Ring */}
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 140 140">
              {/* Background Track */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                className="stroke-[#EBE4D5]"
                strokeWidth="9"
                fill="none"
              />
              {/* Animated Progress Ring */}
              <circle
                ref={circleProgressRef}
                cx="70"
                cy="70"
                r={radius}
                stroke="url(#loyaltyGradient)"
                strokeWidth="9.5"
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: circumference // will animate via GSAP
                }}
              />
              <defs>
                <linearGradient id="loyaltyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C38B52" />
                  <stop offset="100%" stopColor="#1A2F23" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
              <span
                ref={percentTextRef}
                className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1A2F23] font-mono tabular-nums"
              >
                {loyalty.stamps}
                <span className="text-lg text-[#7B887E] font-sans font-normal">/{TOTAL_STAMPS_REQUIRED}</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7B887E] mt-0.5">
                {isComplete ? 'Ready to Claim' : 'Cups Brewed'}
              </span>
              <div className="mt-1 flex items-center gap-1 text-[11px] text-[#C38B52] font-medium">
                <Coffee className="w-3 h-3" />
                <span>{Math.round(progressRatio * 100)}%</span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="inline-block text-xs font-semibold text-[#1A2F23] bg-white px-3.5 py-1 rounded-full border border-[#1A2F23]/10 shadow-xs">
              {isComplete
                ? '🎉 Complimentary Drink Unlocked!'
                : `${stampsRemaining} more cup${stampsRemaining === 1 ? '' : 's'} for your free drink`}
            </span>
          </div>
        </div>

        {/* Right: Stamp Card Grid & Interactive Controls */}
        <div className="md:col-span-7 space-y-6">
          {/* The 6 Stamp Slots */}
          <div>
            <div className="flex justify-between items-center text-xs text-[#7B887E] mb-2.5">
              <span>Your Stamp Card:</span>
              <span className="font-mono">{loyalty.lastStampDate ? `Last added: ${loyalty.lastStampDate}` : 'No stamps yet'}</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {Array.from({ length: TOTAL_STAMPS_REQUIRED }).map((_, idx) => {
                const isStamped = idx < loyalty.stamps;
                const isRewardSlot = idx === TOTAL_STAMPS_REQUIRED - 1;

                return (
                  <div
                    key={idx}
                    className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border ${
                      isStamped
                        ? 'bg-[#1A2F23] text-white border-[#1A2F23] shadow-sm scale-102'
                        : isRewardSlot
                        ? 'bg-[#F2ECE1] border-dashed border-[#C38B52]/50 text-[#C38B52]'
                        : 'bg-white border-[#1A2F23]/15 text-[#8D9990]'
                    }`}
                  >
                    {isStamped ? (
                      <div className="flex flex-col items-center">
                        <Check className="w-5 h-5 stroke-[2.5] text-[#C38B52]" />
                        <span className="text-[9px] font-mono font-bold mt-0.5 text-white/90">#{idx + 1}</span>
                      </div>
                    ) : isRewardSlot ? (
                      <div className="flex flex-col items-center">
                        <Gift className="w-5 h-5 animate-bounce" />
                        <span className="text-[9px] font-bold mt-0.5">FREE</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Coffee className="w-4 h-4 stroke-[1.5]" />
                        <span className="text-[9px] font-mono mt-0.5">#{idx + 1}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Unlocked Voucher Announcement */}
          {isComplete && (
            <div className="p-4 bg-[#1A2F23] text-white rounded-2xl border border-[#C38B52]/40 shadow-md space-y-2 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C38B52] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Voucher Code Active
                </span>
                <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded font-mono font-bold text-white tracking-widest">
                  {loyalty.voucherCode || 'ELLA-VELVET-FREE'}
                </span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Show this digital voucher code to your barista at Kohsar F-6 or Beverly Centre for any complimentary handcrafted coffee.
              </p>
              <button
                onClick={handleClaimReward}
                className="w-full mt-2 py-2.5 bg-[#C38B52] hover:bg-[#A56C36] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                {claimedReward ? '✓ Voucher Redeemed! Enjoy!' : 'Redeem Free Coffee Voucher'}
              </button>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {!isComplete ? (
              <button
                onClick={handleAddStamp}
                className="flex-1 py-3 px-5 bg-[#1A2F23] hover:bg-[#122219] text-white rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
              >
                <Coffee className="w-4 h-4 text-[#C38B52]" />
                <span>{justStamped ? 'Stamp Recorded! ✓' : 'Collect Coffee Stamp (+1)'}</span>
              </button>
            ) : (
              <button
                onClick={handleResetCard}
                className="flex-1 py-3 px-5 bg-[#1A2F23] hover:bg-[#122219] text-white rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#C38B52]" />
                <span>Start New Reward Card</span>
              </button>
            )}

            <button
              onClick={handleResetCard}
              title="Reset Card"
              aria-label="Reset Card"
              className="p-3 bg-white hover:bg-[#F2ECE1] text-[#7B887E] hover:text-[#1A2F23] rounded-full border border-[#1A2F23]/15 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#7B887E] pt-1 border-t border-black/5">
            <span>Lifetime Free Drinks Earned: <strong className="text-[#1A2F23]">{loyalty.totalEarnedRewards}</strong></span>
            <span>Saved in browser storage</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div onClick={onClose} className="fixed inset-0 bg-[#1A2F23]/50 backdrop-blur-xs transition-opacity" />
        <div className="relative w-full max-w-2xl z-10 my-8">
          {content}
        </div>
      </div>
    );
  }

  return (
    <section id="loyalty" className="py-16 md:py-24 bg-[#F8F5EE] border-t border-[#1A2F23]/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        {content}
      </div>
    </section>
  );
};
