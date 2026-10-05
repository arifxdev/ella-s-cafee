import React, { useState } from 'react';
import { X, Star, Heart, Check, Plus, Minus, Coffee } from 'lucide-react';
import { ProductItem } from '../types';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1A2F23]/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#F8F5EE] rounded-[32px] overflow-hidden shadow-2xl border border-[#1A2F23]/10 z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1A2F23] flex items-center justify-center shadow-sm transition-transform hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Left: Product Image */}
          <div
            className="p-8 flex items-center justify-center relative"
            style={{ backgroundColor: product.bgColor }}
          >
            <div className="w-full max-w-[260px] aspect-square rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {product.rating && (
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#1A2F23] flex items-center gap-1 shadow-xs">
                <Star className="w-3.5 h-3.5 fill-[#C38B52] text-[#C38B52]" />
                <span className="font-mono tabular-nums">{product.rating}</span>
                <span className="text-[#7B887E]">({product.reviewsCount})</span>
              </div>
            )}
          </div>

          {/* Right: Info & Purchase Controls */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <p
                className="font-script-accent text-2xl mb-1 select-none"
                style={{ color: product.accentColor }}
              >
                {product.subtitle}
              </p>
              <h2 className="font-serif-display text-3xl font-semibold text-[#1A2F23]">
                {product.name}
              </h2>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A56C36] mt-0.5">
                {product.tagline}
              </p>

              <div className="mt-4 text-2xl font-serif-display font-bold text-[#1A2F23] font-mono tabular-nums">
                {product.currency}{(product.price * quantity).toFixed(2)}
              </div>

              <p className="text-xs text-[#556259] leading-relaxed mt-3">
                {product.description}
              </p>

              {/* Pairing Note */}
              {product.pairing && (
                <div className="mt-4 p-3 bg-white/80 rounded-xl border border-[#1A2F23]/10 text-xs text-[#556259] flex items-start gap-2">
                  <Coffee className="w-4 h-4 text-[#C38B52] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1A2F23]">Barista Pairing:</span>{' '}
                    {product.pairing}
                  </div>
                </div>
              )}

              {/* Allergens / Dietary */}
              {product.allergens && (
                <div className="mt-3 flex items-center gap-1.5 flex-wrap text-[11px] text-[#7B887E]">
                  <span>Contains:</span>
                  {product.allergens.map((alg) => (
                    <span key={alg} className="text-[#1A2F23] font-medium">
                      {alg} ·
                    </span>
                  ))}
                  {product.calories && <span>{product.calories}</span>}
                </div>
              )}
            </div>

            {/* Stepper & Add to Bag CTA */}
            <div className="pt-4 border-t border-[#1A2F23]/10 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#1A2F23]/20 rounded-full px-3 py-1.5 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-[#1A2F23] hover:text-[#C38B52]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-sm font-semibold font-mono tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-[#1A2F23] hover:text-[#C38B52]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  style={{ backgroundColor: product.btnColor }}
                  className="flex-1 py-3 px-6 text-white rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Order!
                    </>
                  ) : (
                    <span>Add to Bag</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
