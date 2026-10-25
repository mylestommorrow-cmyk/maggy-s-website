import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import {
  MAGGY_PHONE_DISPLAY,
  MAGGY_PHONE_TEL,
  getWhatsAppUrl,
} from '../data/products';

export const ContactFloatingBar: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5">
      {/* Call Us Quick Button */}
      <a
        href={MAGGY_PHONE_TEL}
        className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full shadow-lg border border-stone-700 text-xs font-semibold transition-all hover:scale-102 cursor-pointer"
        aria-label="Call Maggy directly at 0768 383 036"
      >
        <Phone className="w-3.5 h-3.5 text-amber-300" />
        <span>Call {MAGGY_PHONE_DISPLAY}</span>
      </a>

      {/* Prominent WhatsApp Us Button with pre-filled message */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-xl hover:shadow-2xl text-xs sm:text-sm font-semibold transition-all hover:scale-105 cursor-pointer ring-4 ring-emerald-500/20"
        aria-label="Chat with Maggy on WhatsApp at 254768383036"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="font-bold">WhatsApp Us</span>
      </a>
    </div>
  );
};
