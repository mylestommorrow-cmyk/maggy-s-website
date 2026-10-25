import React from 'react';
import { REVIEWS } from '../data/products';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-amber-900 font-semibold">
              Verified Patron Testimonials
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-stone-900">
              Loved by connoisseurs of beauty & time.
            </h2>
          </div>

          <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/80">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="text-xs text-stone-700">
              <span className="font-bold font-mono tabular-nums text-stone-900">4.9 / 5.0</span>
              <span className="text-stone-500 ml-1">across 2,400+ orders</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#FAF8F5] rounded-xl p-6 border border-stone-200/80 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono tabular-nums text-stone-400">
                    {review.date}
                  </span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-200/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900">
                      {review.author}
                    </h4>
                    <span className="text-[11px] text-amber-900 font-medium line-clamp-1">
                      {review.productName}
                    </span>
                  </div>
                  {review.verifiedPurchase && (
                    <span
                      title="Verified Patron Purchase"
                      className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-medium"
                    >
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
