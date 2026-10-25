import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Phone, MessageCircle, ChevronDown, Search } from 'lucide-react';
import {
  CartItem,
  WATCH_SUBCATEGORIES,
  MAGGY_PHONE_DISPLAY,
  MAGGY_PHONE_TEL,
  getWhatsAppUrl,
  formatKSh,
} from '../data/products';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  activeCategory: string;
  onSelectCategory: (category: string, subcategory?: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [watchMenuOpen, setWatchMenuOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleNavClick = (category: string, subcategory?: string, elementId?: string) => {
    onSelectCategory(category, subcategory);
    setMobileMenuOpen(false);
    setWatchMenuOpen(false);
    if (elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Promotional & Direct Contact Top Ribbon */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="font-medium">Maggy Cosmetics & Timepieces</span>
            <span className="hidden md:inline text-stone-400">·</span>
            <span className="text-stone-300">Complimentary delivery across Kenya on orders over KSh 5,000</span>
          </div>

          {/* Quick Direct Call & WhatsApp in Ribbon */}
          <div className="flex items-center gap-4 text-xs">
            <a
              href={MAGGY_PHONE_TEL}
              className="inline-flex items-center gap-1.5 text-stone-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>Call: <strong className="text-white font-mono">{MAGGY_PHONE_DISPLAY}</strong></span>
            </a>

            <span className="text-stone-600">|</span>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Maggy</span>
            </a>
          </div>

        </div>
      </div>

      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6 sm:gap-8">
          
          {/* Zone 1: Brand title wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('all', undefined, 'hero')}
              className="text-left group cursor-pointer"
            >
              <span className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors whitespace-nowrap shrink-0">
                Maggy Cosmetics
              </span>
            </button>
          </div>

          {/* Zone 2: Category Navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
            <button
              onClick={() => handleNavClick('Skincare', undefined, 'catalog')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'Skincare' ? 'text-amber-900 font-semibold border-b-2 border-amber-900 pb-0.5' : ''
              }`}
            >
              Skincare
            </button>
            <button
              onClick={() => handleNavClick('Makeup', undefined, 'catalog')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'Makeup' ? 'text-amber-900 font-semibold border-b-2 border-amber-900 pb-0.5' : ''
              }`}
            >
              Makeup
            </button>
            <button
              onClick={() => handleNavClick('Haircare', undefined, 'catalog')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'Haircare' ? 'text-amber-900 font-semibold border-b-2 border-amber-900 pb-0.5' : ''
              }`}
            >
              Haircare
            </button>
            <button
              onClick={() => handleNavClick('Fragrances', undefined, 'catalog')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'Fragrances' ? 'text-amber-900 font-semibold border-b-2 border-amber-900 pb-0.5' : ''
              }`}
            >
              Fragrances
            </button>

            {/* Watches with Dropdown for Men's, Women's, Unisex */}
            <div
              className="relative"
              onMouseEnter={() => setWatchMenuOpen(true)}
              onMouseLeave={() => setWatchMenuOpen(false)}
            >
              <button
                onClick={() => handleNavClick('Watches', undefined, 'catalog')}
                className={`flex items-center gap-1 hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-2 ${
                  activeCategory === 'Watches' ? 'text-amber-900 font-semibold border-b-2 border-amber-900 pb-0.5' : ''
                }`}
              >
                <span>Watches</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {watchMenuOpen && (
                <div className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-xl border border-stone-200 py-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-semibold text-stone-400 tracking-wider">
                    Watches Collection
                  </div>
                  <button
                    onClick={() => handleNavClick('Watches', 'All Watches', 'catalog')}
                    className="w-full text-left px-3 py-2 text-xs text-stone-800 hover:bg-stone-50 font-medium cursor-pointer"
                  >
                    All Watches
                  </button>
                  {WATCH_SUBCATEGORIES.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => handleNavClick('Watches', sub, 'catalog')}
                      className="w-full text-left px-3 py-2 text-xs text-stone-800 hover:bg-stone-50 hover:text-amber-900 flex items-center justify-between cursor-pointer"
                    >
                      <span>{sub}</span>
                      <span className="text-[10px] text-stone-400">→</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#contact"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-amber-900 font-semibold"
            >
              Contact Maggy
            </a>
          </nav>

          {/* Zone 3: Direct contact shortcuts + Bag */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Prominent WhatsApp Us Button */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Us on 254768383036"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors cursor-pointer shadow-2xs whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Us</span>
            </a>

            {/* Prominent Call Us Button */}
            <a
              href={MAGGY_PHONE_TEL}
              aria-label="Call Maggy at 0768 383 036"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-800 bg-amber-100 hover:bg-amber-200 border border-amber-300/80 rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-stone-900" />
              <span>Call: {MAGGY_PHONE_DISPLAY}</span>
            </a>

            {/* Shopping Bag Button with KSh calculation */}
            <button
              onClick={onOpenCart}
              aria-label={`Shopping Bag containing ${totalItems} items`}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300/80 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
            >
              <ShoppingBag className="w-4 h-4 text-amber-900" />
              <span>Bag</span>
              <span className="font-mono tabular-nums px-1.5 py-0.2 bg-stone-900 text-white rounded-full text-[11px] font-medium">
                {totalItems}
              </span>
              {totalPrice > 0 && (
                <span className="hidden sm:inline font-mono tabular-nums text-stone-700 border-l border-stone-300 pl-1.5 text-[11px]">
                  {formatKSh(totalPrice)}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-stone-200 px-6 py-5 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
            
            {/* Prominent Direct Mobile Call & WhatsApp Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pb-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={MAGGY_PHONE_TEL}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-stone-900 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Call Maggy</span>
              </a>
            </div>

            <div className="text-center text-xs text-stone-600 bg-stone-100 p-2 rounded-lg font-mono">
              Direct Phone: <strong className="text-stone-900 font-bold">{MAGGY_PHONE_DISPLAY}</strong>
            </div>

            {/* Categories */}
            <div className="flex flex-col space-y-3 font-medium text-stone-700 text-sm pt-2 border-t border-stone-200">
              <button
                onClick={() => handleNavClick('all', undefined, 'catalog')}
                className="text-left py-1 hover:text-stone-900 cursor-pointer font-semibold"
              >
                All Creations
              </button>

              <button
                onClick={() => handleNavClick('Skincare', undefined, 'catalog')}
                className="text-left py-1 hover:text-stone-900 cursor-pointer"
              >
                Skincare
              </button>

              <button
                onClick={() => handleNavClick('Makeup', undefined, 'catalog')}
                className="text-left py-1 hover:text-stone-900 cursor-pointer"
              >
                Makeup
              </button>

              <button
                onClick={() => handleNavClick('Haircare', undefined, 'catalog')}
                className="text-left py-1 hover:text-stone-900 cursor-pointer"
              >
                Haircare
              </button>

              <button
                onClick={() => handleNavClick('Fragrances', undefined, 'catalog')}
                className="text-left py-1 hover:text-stone-900 cursor-pointer"
              >
                Fragrances
              </button>

              {/* Watches & Subcategories in mobile */}
              <div className="pt-2 border-t border-stone-200/80 space-y-2">
                <button
                  onClick={() => handleNavClick('Watches', undefined, 'catalog')}
                  className="text-left py-1 hover:text-stone-900 cursor-pointer font-semibold flex items-center justify-between w-full"
                >
                  <span>Watches Collection</span>
                </button>
                <div className="pl-3 space-y-1.5 text-xs text-stone-600">
                  {WATCH_SUBCATEGORIES.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => handleNavClick('Watches', sub, 'catalog')}
                      className="block w-full text-left py-1 hover:text-stone-900 cursor-pointer"
                    >
                      • {sub}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200/80">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 block text-amber-900 font-semibold cursor-pointer"
                >
                  Contact & Location
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
