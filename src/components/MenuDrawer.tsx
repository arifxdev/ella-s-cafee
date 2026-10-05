import React from 'react';
import { X, MapPin, Phone, Instagram, Coffee, Sparkles } from 'lucide-react';
import { EXTENDED_MENU } from '../data/cafeData';
import { ProductItem } from '../types';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: ProductItem) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onSelectItem
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1A2F23]/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-md bg-[#F8F5EE] shadow-2xl flex flex-col justify-between border-r border-[#1A2F23]/10">
          <div className="p-6 border-b border-[#1A2F23]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-serif-display text-2xl font-bold text-[#1A2F23]">
                Ella's Cafe
              </span>
              <span className="text-[10px] bg-[#C38B52]/15 text-[#C38B52] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Boutique
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#1A2F23]/5 text-[#556259]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7B887E]">
                Explore Collections
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm font-medium text-[#1A2F23]">
                <a
                  href="#hero"
                  onClick={onClose}
                  className="p-3 bg-white rounded-xl border border-black/[0.04] hover:border-[#1A2F23] transition-colors"
                >
                  ☕ Coffee Bar
                </a>
                <a
                  href="#featured"
                  onClick={onClose}
                  className="p-3 bg-white rounded-xl border border-black/[0.04] hover:border-[#1A2F23] transition-colors"
                >
                  🍰 Pistachio &amp; Cakes
                </a>
                <a
                  href="#special"
                  onClick={onClose}
                  className="p-3 bg-white rounded-xl border border-black/[0.04] hover:border-[#1A2F23] transition-colors"
                >
                  ✨ Signature Müil
                </a>
                <a
                  href="#story"
                  onClick={onClose}
                  className="p-3 bg-white rounded-xl border border-black/[0.04] hover:border-[#1A2F23] transition-colors"
                >
                  📖 Our Story
                </a>
              </div>
            </div>

            {/* Popular Items Showcase */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7B887E]">
                All Daily Creations
              </h4>
              <div className="space-y-2">
                {EXTENDED_MENU.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectItem(item);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2.5 bg-white rounded-xl hover:bg-[#F2ECE1] transition-colors cursor-pointer group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-semibold text-[#1A2F23] group-hover:text-[#C38B52] truncate">
                          {item.name}
                        </span>
                        <span className="text-xs font-mono tabular-nums text-[#1A2F23] ml-2">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7B887E] truncate">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div className="space-y-3 pt-4 border-t border-[#1A2F23]/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7B887E]">
                Our Cafe Locations
              </h4>
              <div className="space-y-3 text-xs text-[#556259]">
                <div className="p-3 bg-white rounded-xl border border-black/[0.04]">
                  <p className="font-semibold text-[#1A2F23] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C38B52]" /> Kohsar Market, F-6 Islamabad
                  </p>
                  <p className="text-[11px] text-[#7B887E] mt-1">Open 8 AM – 11:30 PM Daily</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-black/[0.04]">
                  <p className="font-semibold text-[#1A2F23] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C38B52]" /> Beverly Centre, Blue Area Islamabad
                  </p>
                  <p className="text-[11px] text-[#7B887E] mt-1">Open 7:30 AM – Midnight</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-black/[0.04]">
                  <p className="font-semibold text-[#1A2F23] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C38B52]" /> Gulberg III, Lahore
                  </p>
                  <p className="text-[11px] text-[#7B887E] mt-1">Open 8 AM – Midnight</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border-t border-[#1A2F23]/10 text-xs text-center text-[#7B887E]">
            <p>Instagram: @ellas.pk · Artisan Roasters &amp; Bakers</p>
          </div>
        </div>
      </div>
    </div>
  );
};
