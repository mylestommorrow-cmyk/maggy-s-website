import React from 'react';
import { Phone, MessageCircle, Clock, ShieldCheck, Truck } from 'lucide-react';
import {
  MAGGY_PHONE_DISPLAY,
  MAGGY_PHONE_TEL,
  getWhatsAppUrl,
} from '../data/products';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 lg:py-24 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="text-xs uppercase tracking-[0.25em] text-amber-900 font-semibold">
            Official Customer Care & Orders
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900">
            Contact Maggy Directly
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto">
            Have questions about cosmetic shade matching, watch specifications, or delivery anywhere in Kenya? Speak with Maggy right away.
          </p>
        </div>

        {/* 2 Primary Contact Cards: WhatsApp Us & Call Us */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: WhatsApp Us */}
          <div className="bg-white rounded-2xl p-8 border border-stone-200/90 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center border border-[#25D366]/30">
                <MessageCircle className="w-7 h-7 fill-current" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                  Instant Messaging & Orders
                </span>
                <h3 className="font-display text-2xl font-bold text-stone-900 mt-1">
                  WhatsApp Us
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  Start a direct chat with Maggy on WhatsApp for real-time recommendations, stock inquiries, and instant order placement.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                <div className="text-stone-500 font-medium">WhatsApp Number:</div>
                <div className="font-mono text-base font-bold text-stone-900">
                  +254 768 383 036
                </div>
              </div>
            </div>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp Us Now</span>
            </a>
          </div>

          {/* Card 2: Call Us Directly */}
          <div className="bg-white rounded-2xl p-8 border border-stone-200/90 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center border border-amber-200/60">
                <Phone className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-900">
                  Direct Telephone Line
                </span>
                <h3 className="font-display text-2xl font-bold text-stone-900 mt-1">
                  Call Maggy Directly
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  Connect with Maggy by phone for personalized customer guidance, dispatch coordination, and bespoke inquiries.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                <div className="text-stone-500 font-medium">Official Contact Number:</div>
                <div className="font-mono text-base font-bold text-stone-900">
                  {MAGGY_PHONE_DISPLAY}
                </div>
              </div>
            </div>

            <a
              href={MAGGY_PHONE_TEL}
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <Phone className="w-5 h-5 text-amber-300" />
              <span>Call Us: {MAGGY_PHONE_DISPLAY}</span>
            </a>
          </div>

        </div>

        {/* Kenya Customer Commitments */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-4xl mx-auto text-xs text-stone-600">
          <div className="flex flex-col items-center gap-1.5 p-3">
            <Truck className="w-5 h-5 text-amber-900" />
            <span className="font-semibold text-stone-900">Fast Kenya Dispatch</span>
            <span className="text-stone-500">Same-day delivery in Nairobi & 24–48hr countrywide delivery</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 p-3">
            <ShieldCheck className="w-5 h-5 text-amber-900" />
            <span className="font-semibold text-stone-900">Pay on Delivery Available</span>
            <span className="text-stone-500">Pay conveniently via M-Pesa or cash after inspecting your items</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 p-3">
            <Clock className="w-5 h-5 text-amber-900" />
            <span className="font-semibold text-stone-900">Always Ready to Assist</span>
            <span className="text-stone-500">Call or message Maggy anytime on {MAGGY_PHONE_DISPLAY}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
