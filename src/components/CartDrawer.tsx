import React, { useState } from 'react';
import { CartItem, formatKSh, getWhatsAppUrl, MAGGY_PHONE_TEL, MAGGY_PHONE_DISPLAY } from '../data/products';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Truck, MessageCircle, Phone } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, variantId: string | undefined, delta: number) => void;
  onRemoveItem: (productId: string, variantId: string | undefined) => void;
  onProceedCheckout: () => void;
  discountCode: string;
  discountPercent: number;
  onApplyDiscount: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  discountCode,
  discountPercent,
  onApplyDiscount,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 5000; // in KSh
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const eligibleForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = subtotal > 0 ? (eligibleForFreeShipping ? 0 : 350) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyDiscount(promoInput.trim());
    if (success) {
      setPromoMessage({ text: `Code ${promoInput.toUpperCase()} applied successfully!`, error: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: 'Invalid promo code. Try "MAGGY10" for 10% off.', error: true });
    }
  };

  // WhatsApp order text generator
  const itemsText = cart
    .map(
      (item) =>
        `- ${item.quantity}x ${item.product.name}${item.selectedVariant ? ` (${item.selectedVariant.name})` : ''} @ ${formatKSh(item.product.price)}`
    )
    .join('\n');
  const cartWhatsAppMessage = `Hello Maggy, I'd like to place an order from your website:\n\n${itemsText}\n\nSubtotal: ${formatKSh(subtotal)}\nTotal: ${formatKSh(grandTotal)}\n\nPlease assist me with delivery and payment.`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-stone-200">
          
          {/* Header */}
          <div className="p-6 bg-white border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-900" />
              <h2 className="font-display text-xl font-semibold text-stone-900">
                Your Shopping Bag
              </h2>
              <span className="font-mono tabular-nums text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full font-medium">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter across Kenya */}
          {cart.length > 0 && (
            <div className="px-6 py-3 bg-amber-50/60 border-b border-amber-200/50 text-xs">
              <div className="flex items-center justify-between text-stone-700 font-medium mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-amber-800" />
                  {eligibleForFreeShipping ? (
                    <span className="text-emerald-800 font-semibold">Free Countrywide Delivery Unlocked!</span>
                  ) : (
                    <span>
                      Add <strong className="font-mono tabular-nums">{formatKSh(remainingForFreeShipping)}</strong> more for Free Delivery
                    </span>
                  )}
                </span>
                <span className="font-mono tabular-nums text-stone-500">{progressPercent.toFixed(0)}%</span>
              </div>
              <div className="w-full h-1.5 bg-amber-200/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-800 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-stone-800">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    Discover our collection of radiant cosmetics and fine watches to find your next luxury piece.
                  </p>
                </div>
                <div className="pt-2 flex flex-col gap-2 w-full max-w-xs">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-all cursor-pointer"
                  >
                    Start Exploring
                  </button>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp Maggy ({MAGGY_PHONE_DISPLAY})</span>
                  </a>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedVariant?.id || 'default'}`}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-stone-200/80 shadow-2xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover rounded-lg bg-stone-100 shrink-0 border border-stone-100"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-stone-900 leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id, item.selectedVariant?.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.selectedVariant && (
                        <p className="text-xs text-stone-500 mt-0.5">
                          Option: <span className="text-stone-800 font-medium">{item.selectedVariant.name}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedVariant?.id, -1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:text-stone-900 font-bold cursor-pointer"
                        >
                          –
                        </button>
                        <span className="font-mono tabular-nums px-2 text-xs font-semibold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedVariant?.id, 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:text-stone-900 font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Price calculation in KSh */}
                      <div className="text-right">
                        <span className="font-mono tabular-nums text-sm font-bold text-stone-900">
                          {formatKSh(item.product.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-stone-400 font-mono tabular-nums">
                            ({formatKSh(item.product.price)} each)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-stone-200 space-y-3.5">
              
              {/* Promo code form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. MAGGY10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-800 uppercase focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-medium bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg text-stone-800 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-[11px] ${promoMessage.error ? 'text-rose-600' : 'text-emerald-700 font-medium'}`}>
                    {promoMessage.text}
                  </p>
                )}
                {discountCode && (
                  <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
                    <span>Discount applied ({discountCode}):</span>
                    <span className="font-semibold font-mono tabular-nums">-{discountPercent}%</span>
                  </div>
                )}
              </form>

              {/* Price summary in Kenyan Shillings */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums font-medium text-stone-900">{formatKSh(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-mono tabular-nums font-medium">-{formatKSh(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping (Kenya)</span>
                  <span className="font-mono tabular-nums font-medium text-stone-900">
                    {shippingFee === 0 ? <strong className="text-emerald-700">Free</strong> : formatKSh(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Amount</span>
                  <span className="font-mono tabular-nums text-lg">{formatKSh(grandTotal)}</span>
                </div>
              </div>

              {/* Actions: Proceed to Checkout or WhatsApp Order */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={onProceedCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-sm"
                >
                  <span>Proceed to Online Checkout</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>

                <a
                  href={getWhatsAppUrl(cartWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-sm font-bold transition-all shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order Directly via WhatsApp</span>
                </a>
              </div>

              {/* Help & Calling line */}
              <div className="text-[11px] text-stone-500 text-center pt-1 flex items-center justify-center gap-1.5">
                <Phone className="w-3 h-3 text-stone-400" />
                <span>Questions? Call Maggy directly at </span>
                <a href={MAGGY_PHONE_TEL} className="font-bold text-stone-800 underline font-mono">
                  {MAGGY_PHONE_DISPLAY}
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
