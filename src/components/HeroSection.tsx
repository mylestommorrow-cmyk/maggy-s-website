import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Clock, MessageCircle, Phone } from 'lucide-react';
import {
  MAGGY_PHONE_DISPLAY,
  MAGGY_PHONE_TEL,
  getWhatsAppUrl,
} from '../data/products';

interface HeroSectionProps {
  onExploreCosmetics: () => void;
  onExploreWatches: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCosmetics,
  onExploreWatches,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid: Editorial Brand Story & Hero Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brand Copy & Actions (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            
            {/* Editorial Kicker */}
            <div className="text-xs tracking-[0.2em] uppercase text-stone-500 font-semibold">
              The Dual Essence of Elegance
            </div>

            {/* Headline with balance */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-stone-900 tracking-tight leading-[1.12] text-balance">
              Luminous beauty, timed to perfection.
            </h1>

            {/* Body */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl font-normal">
              At Maggy Cosmetics, we curate the rare harmony between skin-nourishing botanical formulas and heirloom wristwatches. Fast delivery across Kenya with direct customer support.
            </p>

            {/* Direct Contact & Shopping CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={MAGGY_PHONE_TEL}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-lg text-sm font-medium tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Call {MAGGY_PHONE_DISPLAY}</span>
              </a>
            </div>

            {/* Department Navigation CTAs */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={onExploreCosmetics}
                className="text-xs font-semibold text-stone-700 hover:text-amber-900 underline underline-offset-4 cursor-pointer"
              >
                Shop Beauty & Care →
              </button>
              <span className="text-stone-300">·</span>
              <button
                onClick={onExploreWatches}
                className="text-xs font-semibold text-stone-700 hover:text-amber-900 underline underline-offset-4 cursor-pointer"
              >
                Explore Fine Watches →
              </button>
            </div>

            {/* Subtle editorial notes */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-stone-500 border-t border-stone-200/80">
              <span className="font-medium text-stone-800">Direct Contact: {MAGGY_PHONE_DISPLAY}</span>
              <span aria-hidden="true">·</span>
              <span>100% Authentic</span>
              <span aria-hidden="true">·</span>
              <span>Fast Countrywide Dispatch</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-stone-200 aspect-[16/10] border border-stone-300/60 group">
              <img
                src="/src/assets/images/hero_maggy_showcase_1792849758508.jpg"
                alt="Maggy Cosmetics & Luxury Watches Collection arranged on warm travertine stone"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
              />
              
              {/* Subtle scrim for bottom legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/15 to-transparent pointer-events-none" />

              {/* Caption overlay */}
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-200 font-semibold">Curation 2026</span>
                  <p className="font-display text-lg sm:text-xl font-medium text-stone-100">
                    Artisanal Face Oils & Fluted Gold Timepieces
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-300 font-mono tabular-nums font-semibold">
                    From KSh 2,500 to KSh 24,500
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3-Pillar Full-Width Trust Strip */}
        <div className="mt-16 pt-8 border-t border-stone-200/90 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-100/70 text-amber-900 flex items-center justify-center shrink-0 border border-amber-200/60">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Botanical & Hypoallergenic</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Damask rose, cold-pressed marula, and pure hyaluronic acid tested for ultra-sensitive skin.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-100/70 text-amber-900 flex items-center justify-center shrink-0 border border-amber-200/60">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Heirloom Horology</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Scratchproof sapphire crystals, surgical 316L stainless steel, and 2-year movement warranty.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-100/70 text-amber-900 flex items-center justify-center shrink-0 border border-amber-200/60">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Direct Customer Service</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Call {MAGGY_PHONE_DISPLAY} or chat on WhatsApp for personalized consultations and orders.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
