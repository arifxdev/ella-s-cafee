import React from 'react';
import { Truck, ShieldCheck, Award, Headphones } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <section className="bg-[#1A2F23] text-white py-8 border-y border-[#2A4434]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center">
          {/* Item 1 */}
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0 text-[#C38B52] transition-colors group-hover:bg-white/10">
              <Truck className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight">Free Delivery</h3>
              <p className="text-xs text-white/70">On orders over $29</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0 text-[#C38B52] transition-colors group-hover:bg-white/10">
              <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight">Secure Payment</h3>
              <p className="text-xs text-white/70">100% secure checkout</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0 text-[#C38B52] transition-colors group-hover:bg-white/10">
              <Award className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight">Premium Quality</h3>
              <p className="text-xs text-white/70">Best coffee, always</p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0 text-[#C38B52] transition-colors group-hover:bg-white/10">
              <Headphones className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight">24/7 Support</h3>
              <p className="text-xs text-white/70">We’re here for you</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
