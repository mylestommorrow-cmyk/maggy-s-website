import React from 'react';
import { Sparkles, Clock, Feather, ShieldCheck } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="story" className="py-20 lg:py-28 bg-[#F4F0E8] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-amber-900 font-semibold">
            Our Philosophy & Heritage
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight text-balance">
            Where ephemeral glow meets enduring craftsmanship.
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Why combine fine cosmetics with horology? Because beauty is the presence you bring to each moment, and a timepiece is the quiet celebration of time itself.
          </p>
        </div>

        {/* 3 Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Pillar 1 */}
          <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-8 border border-stone-300/60 shadow-2xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center border border-amber-200/50">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-semibold text-stone-900">
                Botanical Alchemy
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Every drop of our rose serums and face oils is cold-pressed in small micro-batches. Formulated with triple-molecular hyaluronic acid and wild organic floral distillates to illuminate without synthetic fillers.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="font-medium text-stone-800">100% Cruelty-Free</span>
              <span>Clean Certified</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-8 border border-stone-300/60 shadow-2xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center border border-amber-200/50">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-semibold text-stone-900">
                Precision Horology
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                From hand-finished sunburst dials to surgical-grade 316L stainless steel cases and sapphire crystals, our timepieces are built with Swiss and Japanese calibres meant to last for generations.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="font-medium text-stone-800">Sapphire Crystal</span>
              <span>2-Year Warranty</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-8 border border-stone-300/60 shadow-2xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center border border-amber-200/50">
                <Feather className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-semibold text-stone-900">
                Responsible Luxury
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Luxury should never compromise our world. Our cosmetic bottles utilize 100% recyclable Italian amber glass, and our presentation boxes are hand-wrapped using FSC-certified reclaimed fibers.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="font-medium text-stone-800">Sustainable Sourcing</span>
              <span>Zero Plastic Fillers</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
