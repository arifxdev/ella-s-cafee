import React, { useState } from 'react';
import { Menu, Instagram, Facebook, Twitter, Check } from 'lucide-react';
import { SoundscapeToggle } from './SoundscapeToggle';

interface FooterProps {
  onOpenMenuDrawer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenMenuDrawer }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#F8F5EE] text-[#1E2520] pt-12 pb-10 border-t border-[#1A2F23]/10">
      {/* Brand & Boutique Story section */}
      <div id="story" className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start pb-10 border-b border-[#1A2F23]/10">
          <div className="md:col-span-5">
            <h3 className="font-serif-display text-2xl font-semibold text-[#1A2F23] mb-3">
              Ella's Cafe &amp; Patisserie
            </h3>
            <p className="text-sm text-[#556259] leading-relaxed max-w-sm mb-4">
              Where Parisian patisserie artistry meets specialty espresso craft. Handcrafting slow-steeped pistachio cakes, delicate Basque cheesecakes, and velvety signature roasts every single morning.
            </p>
            <div className="text-xs text-[#7B887E]">
              <span>Kohsar Market &amp; F-6 Islamabad</span>
              <span className="mx-2">·</span>
              <span>Gulberg III Lahore</span>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2F23] mb-3">
              Cafe Hours &amp; Ambiance
            </h4>
            <ul className="text-xs text-[#556259] space-y-1.5 mb-4">
              <li>Monday – Friday: 7:30 AM – 11:30 PM</li>
              <li>Saturday &amp; Sunday: 8:00 AM – Midnight</li>
              <li className="pt-1 text-[#C38B52] font-medium">Afternoon High Tea served daily 3 PM – 6 PM</li>
            </ul>
            <div className="pt-1">
              <SoundscapeToggle />
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2F23] mb-3">
              The Morning Gazette
            </h4>
            <p className="text-xs text-[#556259] mb-3">
              Receive secret weekend pastry drops and private roast invites directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-white border border-[#1A2F23]/15 rounded-full px-4 py-2 text-xs text-[#1A2F23] placeholder:text-[#8D9990] focus:outline-none focus:border-[#1A2F23] flex-1"
              />
              <button
                type="submit"
                className="bg-[#1A2F23] hover:bg-[#122219] text-white text-xs font-semibold px-5 py-2 rounded-full transition-colors shrink-0 cursor-pointer"
              >
                {subscribed ? 'Joined ✓' : 'Subscribe'}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-[#44634E] mt-2 flex items-center gap-1 font-medium">
                <Check className="w-3.5 h-3.5" /> Welcome to Ella's Society.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Exact bottom bar replica matching reference image */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-[#556259]">
        {/* Left: Hamburger button + Copyright */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenMenuDrawer}
            aria-label="Open cafe drawer"
            className="p-1.5 hover:text-[#1A2F23] hover:bg-[#1A2F23]/5 rounded-md transition-colors cursor-pointer"
          >
            <Menu className="w-4 h-4 stroke-[2]" />
          </button>
          <span>© 2024 Coffee · Ella's Cafe. All rights reserved.</span>
        </div>

        {/* Ambient Soundscape Toggle in bottom bar */}
        <div className="flex items-center">
          <SoundscapeToggle />
        </div>

        {/* Center: Payment methods matching reference */}
        <div className="flex items-center gap-3">
          <span className="text-[#7B887E]">We Accept</span>
          <span className="font-bold tracking-wider text-[#1A2F23] text-[11px]">VISA</span>
          <div className="flex items-center -space-x-1">
            <span className="w-3.5 h-3.5 rounded-full bg-[#EB001B] inline-block" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#F79E1B]/90 inline-block" />
          </div>
          <span className="font-semibold text-[#003087]">PayPal</span>
          <span className="font-semibold text-[#1A2F23]">Pay</span>
        </div>

        {/* Right: Social icons */}
        <div className="flex items-center gap-3">
          <span className="text-[#7B887E]">Follow Us</span>
          <a
            href="https://www.instagram.com/ellas.pk?stkn=eHljODd6cG1heXUx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ella's Instagram"
            className="p-1.5 hover:text-[#1A2F23] hover:bg-[#1A2F23]/5 rounded-full transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="p-1.5 hover:text-[#1A2F23] hover:bg-[#1A2F23]/5 rounded-full transition-colors"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="p-1.5 hover:text-[#1A2F23] hover:bg-[#1A2F23]/5 rounded-full transition-colors"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="#"
            aria-label="Pinterest"
            className="p-1.5 hover:text-[#1A2F23] hover:bg-[#1A2F23]/5 rounded-full transition-colors text-xs font-bold"
          >
            P
          </a>
        </div>
      </div>
    </footer>
  );
};

