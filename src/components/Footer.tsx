import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import {
  MAGGY_PHONE_DISPLAY,
  MAGGY_PHONE_TEL,
  getWhatsAppUrl,
} from '../data/products';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      
      {/* Prominent Direct Contact Banner in Footer */}
      <div className="border-b border-stone-800/80 py-12 bg-stone-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            <div className="space-y-1 text-center lg:text-left">
              <span className="text-xs uppercase tracking-[0.2em] text-amber-300 font-semibold">
                Direct Customer Care & Inquiries
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-normal text-white">
                Maggy Customer Contact: <span className="font-mono font-bold text-amber-200">{MAGGY_PHONE_DISPLAY}</span>
              </h3>
              <p className="text-xs text-stone-400">
                Contact Maggy directly via phone or WhatsApp for instant order assistance across Kenya.
              </p>
            </div>

            {/* Direct Contact Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={MAGGY_PHONE_TEL}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer"
              >
                <Phone className="w-4 h-4 text-stone-900" />
                <span>Call Us ({MAGGY_PHONE_DISPLAY})</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <span className="font-display text-2xl font-bold tracking-tight text-white block">
              Maggy Cosmetics
            </span>
            <p className="text-stone-400 leading-relaxed">
              Artisanal botanical skincare, makeup, haircare, fine fragrances, and precision watches.
            </p>
            <div className="pt-2 text-stone-300 space-y-1.5 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>Phone: <strong className="text-white">{MAGGY_PHONE_DISPLAY}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp: <strong className="text-white">+254 768 383 036</strong></span>
              </div>
            </div>
          </div>

          {/* Cosmetics Departments */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Beauty & Care
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#catalog" className="hover:text-amber-200 transition-colors">Skincare Serums & Oils</a></li>
              <li><a href="#catalog" className="hover:text-amber-200 transition-colors">Velvet Lipsticks & Makeup</a></li>
              <li><a href="#catalog" className="hover:text-amber-200 transition-colors">Botanical Haircare Elixirs</a></li>
              <li><a href="#catalog" className="hover:text-amber-200 transition-colors">Artisanal Fragrances</a></li>
            </ul>
          </div>

          {/* Watches Collections */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Horology Collections
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#catalog" className="hover:text-amber-200 transition-colors">Men's Watches (Divers & Automatics)</a></li>
              <li><a href="#catalog" className="hover:text-amber-200 transition-colors">Women's Watches (Rose Mesh & Classic)</a></li>
              <li><a href="#catalog" className="hover:text-amber-200 transition-colors">Unisex Watches (Emerald Chronograph)</a></li>
              <li><a href="#catalog" className="hover:text-amber-200 transition-colors">Sapphire Crystal & 316L Steel</a></li>
            </ul>
          </div>

          {/* Orders & Delivery in Kenya */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Customer Service
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><span className="text-stone-300">Official Contact: {MAGGY_PHONE_DISPLAY}</span></li>
              <li><span className="text-stone-300">WhatsApp Orders Available</span></li>
              <li><span className="text-stone-300">Free Delivery over KSh 5,000</span></li>
              <li><span className="text-stone-300">Pay on Delivery via M-Pesa or Cash</span></li>
              <li><span className="text-stone-300">Same-Day Nairobi & Countrywide Dispatch</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Clean copyright without social icons */}
        <div className="pt-8 mt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} Maggy Cosmetics. Official Customer Line: {MAGGY_PHONE_DISPLAY}
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <a href={MAGGY_PHONE_TEL} className="hover:text-amber-200 transition-colors">
              Call: {MAGGY_PHONE_DISPLAY}
            </a>
            <span>·</span>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              WhatsApp: +254 768 383 036
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
