import React, { useState } from 'react';
import { Product, ProductVariant, formatKSh, getWhatsAppUrl, MAGGY_PHONE_TEL, MAGGY_PHONE_DISPLAY } from '../data/products';
import { X, Star, ShoppingBag, ShieldCheck, Truck, RotateCcw, Check, MessageCircle, Phone } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'highlights' | 'specifications'>('highlights');

  const handleAdd = () => {
    setIsAdded(true);
    onAddToCart(product, selectedVariant, quantity);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const productWhatsAppMessage = `Hello Maggy, I'm interested in "${product.name}"${
    selectedVariant ? ` (${selectedVariant.name})` : ''
  } priced at ${formatKSh(product.price)}. Could you please share more information?`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 bg-white/80 backdrop-blur-xs rounded-full border border-stone-200/80 transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* Gallery Left */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-white/95 text-stone-900 text-xs font-semibold uppercase px-2.5 py-1 rounded shadow-2xs">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Guarantees strip */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs text-stone-600">
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100 flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-stone-700" />
                  <span className="font-medium text-[11px]">Kenya Delivery</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100 flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-stone-700" />
                  <span className="font-medium text-[11px]">Direct Support</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100 flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-stone-700" />
                  <span className="font-medium text-[11px]">100% Authentic</span>
                </div>
              </div>

              {/* Instant WhatsApp Order / Inquiry Link */}
              <div className="pt-2">
                <a
                  href={getWhatsAppUrl(productWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order or Inquire via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Purchase & Info Right */}
            <div className="flex flex-col space-y-5">
              
              {/* Category & Status */}
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                  <span className="uppercase tracking-widest font-semibold text-amber-900">
                    {product.subcategory}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize">{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 font-medium">In Stock</span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 leading-tight">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2 text-sm text-stone-600">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-current'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-stone-900 font-mono tabular-nums">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-stone-400 font-mono tabular-nums">
                    ({product.reviewsCount} verified reviews)
                  </span>
                </div>
              </div>

              {/* Price in Kenyan Shillings */}
              <div className="flex items-baseline gap-3 pb-3 border-b border-stone-200">
                <span className="font-mono tabular-nums text-3xl font-bold text-stone-900">
                  {formatKSh(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-mono tabular-nums text-base text-stone-400 line-through">
                    {formatKSh(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-stone-500 font-medium">
                  Tax included
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Variant Picker */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                    Select Option / Shade: <span className="text-stone-900 font-normal">{selectedVariant?.name}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          selectedVariant?.id === v.id
                            ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                            : 'border-stone-200 hover:border-stone-400 text-stone-700 bg-stone-50/50'
                        }`}
                      >
                        {v.colorHex && (
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/40 shrink-0"
                            style={{ backgroundColor: v.colorHex }}
                          />
                        )}
                        <span>{v.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add Button */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2.5 text-stone-600 hover:text-stone-900 font-medium text-sm cursor-pointer disabled:opacity-40"
                    disabled={quantity <= 1}
                  >
                    –
                  </button>
                  <span className="font-mono tabular-nums px-3 py-2.5 text-sm font-semibold text-stone-900 min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2.5 text-stone-600 hover:text-stone-900 font-medium text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={isAdded}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-sm ${
                    isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>Added {quantity > 1 ? `(${quantity})` : ''} to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-amber-200" />
                      <span>Add to Bag · {formatKSh(product.price * quantity)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick Call Maggy Direct line */}
              <div className="flex items-center justify-between text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-200">
                <span className="flex items-center gap-1.5 font-medium">
                  <Phone className="w-3.5 h-3.5 text-amber-800" />
                  <span>Prefer to speak with Maggy?</span>
                </span>
                <a
                  href={MAGGY_PHONE_TEL}
                  className="font-bold text-stone-900 hover:text-amber-900 underline font-mono"
                >
                  {MAGGY_PHONE_DISPLAY}
                </a>
              </div>

              {/* Tabs: Highlights vs Specifications */}
              <div className="pt-2 border-t border-stone-200">
                <div className="flex gap-4 border-b border-stone-200 pb-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('highlights')}
                    className={`text-xs font-semibold pb-1 cursor-pointer transition-colors ${
                      activeTab === 'highlights'
                        ? 'text-stone-900 border-b-2 border-stone-900'
                        : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    Key Highlights
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('specifications')}
                    className={`text-xs font-semibold pb-1 cursor-pointer transition-colors ${
                      activeTab === 'specifications'
                        ? 'text-stone-900 border-b-2 border-stone-900'
                        : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    Specifications & Details
                  </button>
                </div>

                <div className="pt-3">
                  {activeTab === 'highlights' ? (
                    <ul className="space-y-2 text-xs text-stone-600">
                      {product.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-800 font-bold">✓</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                      {product.details.map((item, idx) => (
                        <div key={idx} className="py-1 border-b border-stone-100">
                          <dt className="text-stone-400 uppercase tracking-wider text-[10px]">
                            {item.label}
                          </dt>
                          <dd className="font-medium text-stone-800 mt-0.5 font-mono tabular-nums">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
