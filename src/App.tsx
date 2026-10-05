import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCakes } from './components/FeaturedCakes';
import { SpecialBrew } from './components/SpecialBrew';
import { AestheticFeed } from './components/AestheticFeed';
import { CafeLoyalty } from './components/CafeLoyalty';
import { TrustBar } from './components/TrustBar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { ReservationModal } from './components/ReservationModal';
import { MenuDrawer } from './components/MenuDrawer';
import { FEATURED_CAKES, SPECIAL_BREW } from './data/cafeData';
import { CartItem, ProductItem } from './types';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [cart, setCart] = useState<CartItem[]>([
    // Seed with 1 signature pistachio cake for immediate warm preview feel
    { product: FEATURED_CAKES[0], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: ProductItem, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}${product.name} to order`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToFeatured = () => {
    const el = document.getElementById('featured');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#1E2520] relative flex flex-col font-sans selection:bg-[#1A2F23] selection:text-[#F8F5EE]">
      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
      />

      {/* Main Landing Sections matching reference layout exactly */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={scrollToFeatured}
          onOpenItemModal={(id) => {
            const found = [...FEATURED_CAKES, SPECIAL_BREW].find((i) => i.id === id);
            if (found) setSelectedProduct(found);
          }}
        />

        {/* 3 Featured Product Cards (Aatis Pistachio, Lermi Chocolate, Flitre Berry) */}
        <FeaturedCakes
          onSelectItem={(item) => setSelectedProduct(item)}
          onAddToCart={(item) => handleAddToCart(item, 1)}
        />

        {/* Secondary Feature: Müil Coffee Special Roast */}
        <SpecialBrew
          onDiscoverClick={(item) => setSelectedProduct(item)}
        />

        {/* Cafe Loyalty Passport & Rewards Progress Ring */}
        <CafeLoyalty />

        {/* Real-time Aesthetic Photo Grid with Data Visualization & Parallax */}
        <AestheticFeed />

        {/* Trust & Guarantee Ribbon */}
        <TrustBar />
      </main>

      {/* Footer */}
      <Footer onOpenMenuDrawer={() => setIsMenuDrawerOpen(true)} />

      {/* Interactive Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <CafeLoyalty
        isModal
        isOpen={isLoyaltyOpen}
        onClose={() => setIsLoyaltyOpen(false)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, qty) => handleAddToCart(prod, qty)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectItem={(item) => setSelectedProduct(item)}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      <MenuDrawer
        isOpen={isMenuDrawerOpen}
        onClose={() => setIsMenuDrawerOpen(false)}
        onSelectItem={(item) => setSelectedProduct(item)}
      />

      {/* Micro-Interaction Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A2F23] text-white px-5 py-3 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-3 border border-white/10 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#C38B52] animate-ping" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="underline underline-offset-2 hover:text-[#C38B52] ml-1 cursor-pointer"
          >
            View Bag
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
