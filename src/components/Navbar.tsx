import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenReservation: () => void;
  onOpenLoyalty: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenReservation,
  onOpenLoyalty
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Cosset', href: '#featured' },
    { label: 'Confect', href: '#special' },
    { label: 'Moments', href: '#aesthetic-feed' },
    { label: 'Abouts', href: '#story' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F8F5EE]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(26,47,35,0.06)] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-between">
        {/* Zone 1: Single element wordmark matching reference */}
        <a
          href="#hero"
          className="group relative flex items-center text-3xl font-serif-display font-medium tracking-tight text-[#1A2F23] select-none"
        >
          <span>Ella'</span>
          <span className="relative">
            s
            {/* The twin coffee beans above the 'e' as in reference */}
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center gap-[2px] transition-transform group-hover:scale-110">
              <span className="w-1.5 h-2 bg-[#C38B52] rounded-full rotate-[-24deg] transform shadow-xs inline-block" />
              <span className="w-1.5 h-2 bg-[#C38B52] rounded-full rotate-[24deg] transform shadow-xs inline-block" />
            </span>
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-10 text-[15px] font-medium text-[#4A554D]">
          {navItems.map((item) => {
            const isActive = activeLink === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveLink(item.label)}
                className={`relative py-1 transition-colors hover:text-[#1A2F23] ${
                  isActive ? 'text-[#1A2F23] font-semibold' : ''
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#1A2F23] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Search, User, Cart Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Table Reservation Button (Micro-action) */}
          <button
            onClick={onOpenReservation}
            className="hidden lg:inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#1A2F23] hover:text-[#C38B52] transition-colors px-3 py-1.5 rounded-full border border-[#1A2F23]/20 hover:border-[#C38B52]"
          >
            Book Table
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search menu"
            className="p-2 text-[#28392F] hover:text-[#C38B52] hover:bg-[#1A2F23]/5 rounded-full transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* User Profile Avatar with Loyalty Stamp Pip */}
          <button
            onClick={onOpenLoyalty}
            aria-label="Cafe Loyalty Passport"
            title="Ella's Society Loyalty Passport"
            className="relative w-8 h-8 rounded-full overflow-hidden border border-[#1A2F23]/15 transition-transform hover:scale-105 cursor-pointer ring-2 ring-transparent hover:ring-[#C38B52]/50 group"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
              alt="Ella's Member"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#C38B52] border-2 border-white rounded-full" />
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            aria-label={`Shopping cart with ${cartCount} items`}
            className="relative p-2 text-[#28392F] hover:text-[#C38B52] transition-colors cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 flex items-center justify-center bg-[#1A2F23] text-white text-[10px] font-bold rounded-full border border-[#F8F5EE]">
                {cartCount}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
