import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [selectedTip, setSelectedTip] = useState(15);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeDeliveryThreshold = 29.00;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const progressToFree = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const remainingForFree = Math.max(0, freeDeliveryThreshold - subtotal);
  const deliveryFee = items.length === 0 ? 0 : (isFreeDelivery ? 0 : 3.50);
  const tipAmount = (subtotal * selectedTip) / 100;
  const total = subtotal + deliveryFee + tipAmount;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderConfirmed(true);

      // Award loyalty stamp for this order
      try {
        const savedLoyalty = localStorage.getItem('ellas_cafe_loyalty_v1');
        if (savedLoyalty) {
          const parsed = JSON.parse(savedLoyalty);
          const nextStamps = Math.min(6, (parsed.stamps || 0) + 1);
          let voucher = parsed.voucherCode;
          if (nextStamps >= 6) {
            voucher = `ELLA-VELVET-${Math.floor(1000 + Math.random() * 9000)}`;
          }
          localStorage.setItem('ellas_cafe_loyalty_v1', JSON.stringify({
            ...parsed,
            stamps: nextStamps,
            lastStampDate: 'Just now (Order #1042)',
            voucherCode: voucher
          }));
        }
      } catch (_) {}

      onClearCart();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1A2F23]/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F5EE] shadow-2xl flex flex-col justify-between border-l border-[#1A2F23]/10">
          {/* Header */}
          <div className="p-6 border-b border-[#1A2F23]/10 flex items-center justify-between">
            <div>
              <h2 className="font-serif-display text-2xl font-semibold text-[#1A2F23]">
                Your Order Bag
              </h2>
              <p className="text-xs text-[#556259]">
                {items.length === 0
                  ? 'Bag is empty'
                  : `${items.reduce((sum, i) => sum + i.quantity, 0)} item(s) selected`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#1A2F23]/5 text-[#556259] hover:text-[#1A2F23] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderConfirmed ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[#44634E]/10 text-[#44634E] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 stroke-[2]" />
                </div>
                <h3 className="font-serif-display text-2xl font-semibold text-[#1A2F23]">
                  Order #1042 Confirmed
                </h3>
                <p className="text-xs text-[#556259] leading-relaxed max-w-xs mx-auto">
                  Thank you, <span className="font-semibold text-[#1A2F23]">{customerName || 'Coffee Lover'}</span>! Our barista and pastry team at Ella’s are preparing your artisanal treats with care.
                </p>
                <div className="p-4 bg-white rounded-2xl border border-[#1A2F23]/10 text-left text-xs space-y-1.5 max-w-xs mx-auto">
                  <div className="flex justify-between text-[#7B887E]">
                    <span>Estimated Preparation:</span>
                    <span className="font-semibold text-[#1A2F23]">18–25 mins</span>
                  </div>
                  <div className="flex justify-between text-[#7B887E]">
                    <span>Pickup / Delivery to:</span>
                    <span className="font-semibold text-[#1A2F23] truncate max-w-[140px]">
                      {deliveryAddress || 'Dine-In Table 4'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setOrderConfirmed(false);
                    onClose();
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#1A2F23] text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#111F17]"
                >
                  Continue Browsing
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <p className="font-script-accent text-3xl text-[#C38B52]">
                  Fresh Delights Await
                </p>
                <p className="text-sm text-[#556259]">
                  Explore our signature pistachio bliss cake or hand-pulled espresso to begin your order.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 bg-[#1A2F23] text-white text-xs font-semibold rounded-full uppercase tracking-wider hover:bg-[#111F17]"
                >
                  View Patisserie Menu
                </button>
              </div>
            ) : (
              <>
                {/* Free Delivery Banner */}
                <div className="p-3.5 bg-white rounded-2xl border border-[#1A2F23]/10 text-xs">
                  <div className="flex justify-between items-center mb-1.5 font-medium text-[#1A2F23]">
                    <span>
                      {isFreeDelivery
                        ? '🎉 You unlocked Complimentary Delivery!'
                        : `Add $${remainingForFree.toFixed(2)} more for Free Delivery`}
                    </span>
                    <span className="font-mono tabular-nums">{Math.round(progressToFree)}%</span>
                  </div>
                  <div className="w-full bg-[#EAE3D2] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#1A2F23] h-full transition-all duration-500 rounded-full"
                      style={{ width: `${progressToFree}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3.5 p-3.5 bg-white rounded-2xl border border-[#1A2F23]/5 shadow-xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif-display text-sm font-semibold text-[#1A2F23] truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-[#7B887E] truncate">
                          {item.product.subtitle}
                        </p>
                        <p className="text-xs font-semibold text-[#1A2F23] mt-1 font-mono tabular-nums">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center border border-[#1A2F23]/20 rounded-full px-1.5 py-0.5 bg-[#F8F5EE]">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 text-[#1A2F23] hover:text-[#C38B52]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold font-mono tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 text-[#1A2F23] hover:text-[#C38B52]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1.5 text-[#A84357] hover:bg-[#FAEAEC] rounded-full transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkout Mini Form */}
                <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-3 pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#1A2F23]">
                    Delivery or Pickup Details
                  </p>
                  <input
                    type="text"
                    required
                    placeholder="Your Name (e.g. Ayesha Khan)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white border border-[#1A2F23]/15 rounded-xl px-3.5 py-2 text-xs text-[#1A2F23] focus:outline-none focus:border-[#1A2F23]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number (e.g. +92 300 1234567)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-white border border-[#1A2F23]/15 rounded-xl px-3.5 py-2 text-xs text-[#1A2F23] focus:outline-none focus:border-[#1A2F23]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Address or Table # (e.g. Beverly Centre / Table 4)"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-white border border-[#1A2F23]/15 rounded-xl px-3.5 py-2 text-xs text-[#1A2F23] focus:outline-none focus:border-[#1A2F23]"
                  />

                  {/* Tip Bar */}
                  <div className="pt-2">
                    <div className="flex justify-between items-center text-xs text-[#7B887E] mb-1.5">
                      <span>Barista Tip</span>
                      <span className="font-semibold text-[#1A2F23] font-mono tabular-nums">
                        ${tipAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[0, 10, 15, 20].map((tip) => (
                        <button
                          key={tip}
                          type="button"
                          onClick={() => setSelectedTip(tip)}
                          className={`py-1 text-xs font-semibold rounded-lg border transition-colors ${
                            selectedTip === tip
                              ? 'bg-[#1A2F23] text-white border-[#1A2F23]'
                              : 'bg-white text-[#556259] border-[#1A2F23]/15 hover:border-[#1A2F23]'
                          }`}
                        >
                          {tip === 0 ? 'None' : `${tip}%`}
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {!orderConfirmed && items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#1A2F23]/10 space-y-3">
              <div className="space-y-1.5 text-xs text-[#556259]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#1A2F23] font-semibold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-mono tabular-nums text-[#1A2F23]">
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Barista Tip ({selectedTip}%)</span>
                  <span className="font-mono tabular-nums text-[#1A2F23]">
                    ${tipAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#1A2F23] pt-2 border-t border-black/5">
                  <span className="font-serif-display">Total</span>
                  <span className="font-mono tabular-nums">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isCheckingOut}
                className="w-full py-3.5 bg-[#1A2F23] hover:bg-[#122219] text-white rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <span>{isCheckingOut ? 'Processing Order...' : 'Confirm & Place Order'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-center text-[#7B887E]">
                Cash on Delivery or Card on Terminal Accepted
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
