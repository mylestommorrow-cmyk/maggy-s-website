import React, { useState } from 'react';
import { CartItem, formatKSh, MAGGY_PHONE_DISPLAY, MAGGY_PHONE_TEL, getWhatsAppUrl } from '../data/products';
import { X, CheckCircle, CreditCard, Banknote, ShieldCheck, ArrowRight, Printer, Phone, MessageCircle } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  grandTotal: number;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  subtotal,
  discountAmount,
  shippingFee,
  grandTotal,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  
  // Customer details
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Nairobi',
    paymentMethod: 'cod' as 'card' | 'cod' | 'mpesa',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    orderNotes: '',
  });

  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateShipping = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required for courier dispatch';
    if (!formData.address.trim()) errs.address = 'Delivery address / estate is required';
    if (!formData.city.trim()) errs.city = 'Town / City is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep('payment');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.paymentMethod === 'card') {
      const errs: Record<string, string> = {};
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 15) {
        errs.cardNumber = 'Valid 16-digit card number required';
      }
      if (!formData.cardExpiry) errs.cardExpiry = 'MM/YY required';
      if (!formData.cardCvc || formData.cardCvc.length < 3) errs.cardCvc = '3-digit CVC required';
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
    }

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `MC-${randomNum}`;
    setConfirmedOrderId(orderId);
    setStep('confirmation');
    onOrderCompleted();
  };

  const whatsappConfirmationMsg = `Hello Maggy, I have placed Order ${confirmedOrderId} on your website for ${formatKSh(
    grandTotal
  )}. My name is ${formData.fullName}, phone: ${formData.phone}, delivering to ${formData.address}, ${formData.city}.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-6 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-900">
              Maggy Cosmetics · Official Checkout
            </span>
            <h2 className="font-display text-xl font-bold text-stone-900 mt-0.5">
              {step === 'shipping' && '1. Delivery & Contact Details'}
              {step === 'payment' && '2. Payment Selection'}
              {step === 'confirmation' && '3. Order Placed Successfully'}
            </h2>
          </div>
          {step !== 'confirmation' && (
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-200/50 cursor-pointer"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: Shipping */}
          {step === 'shipping' && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Grace Wanjiku"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                  {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone Number (for Courier & M-Pesa) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0712 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900 font-mono"
                  />
                  {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="grace@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Town / City in Kenya *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nairobi, Mombasa, Kisumu, Nakuru, Eldoret..."
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                  {errors.city && <p className="text-xs text-rose-600 mt-1">{errors.city}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Estate, Street Address & Apartment / Landmark *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kilimani, Rose Avenue, Court 3B or Westlands"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
                {errors.address && <p className="text-xs text-rose-600 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Delivery Notes or Special Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="Call before arrival or leave package at reception..."
                  value={formData.orderNotes}
                  onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              {/* Order quick summary in KSh */}
              <div className="p-3 bg-stone-100 rounded-lg flex items-center justify-between text-xs text-stone-700">
                <span>Items ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                <span className="font-mono tabular-nums font-bold text-sm text-stone-900">
                  Total: {formatKSh(grandTotal)}
                </span>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  Need help? Call <strong className="text-stone-800 font-mono">{MAGGY_PHONE_DISPLAY}</strong>
                </span>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-sm"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment */}
          {step === 'payment' && (
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              
              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Select Payment Option
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-stone-900 bg-amber-50/20 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="mt-0.5 text-stone-900 focus:ring-stone-900"
                    />
                    <div>
                      <div className="flex items-center gap-2 font-semibold text-xs text-stone-900">
                        <Banknote className="w-4 h-4 text-emerald-700" />
                        <span>Cash / M-Pesa on Delivery</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        Inspect items first, pay rider via M-Pesa or cash upon arrival.
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-stone-900 bg-amber-50/20 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="mt-0.5 text-stone-900 focus:ring-stone-900"
                    />
                    <div>
                      <div className="flex items-center gap-2 font-semibold text-xs text-stone-900">
                        <CreditCard className="w-4 h-4 text-stone-700" />
                        <span>Credit / Debit Card</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        Visa, Mastercard with 256-bit encrypted security.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Card Inputs if card selected */}
              {formData.paymentMethod === 'card' && (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="4532 •••• •••• 8892"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-lg font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                    {errors.cardNumber && <p className="text-xs text-rose-600 mt-1">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-lg font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                      {errors.cardExpiry && <p className="text-xs text-rose-600 mt-1">{errors.cardExpiry}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        CVC / CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-lg font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                      {errors.cardCvc && <p className="text-xs text-rose-600 mt-1">{errors.cardCvc}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Cash On Delivery Terms Callout */}
              {formData.paymentMethod === 'cod' && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Pay On Delivery (M-Pesa or Cash)</span>
                  </div>
                  <p className="text-emerald-800">
                    Maggy will dispatch your package to <strong>{formData.address}, {formData.city}</strong>. You can verify your luxury pieces before making payment of <strong className="font-mono tabular-nums">{formatKSh(grandTotal)}</strong> to the courier.
                  </p>
                </div>
              )}

              {/* Order Final Summary in KSh */}
              <div className="p-4 bg-stone-100 rounded-xl space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">{formatKSh(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Promotional Savings</span>
                    <span className="font-mono tabular-nums">-{formatKSh(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery to {formData.city || 'your address'}</span>
                  <span className="font-mono tabular-nums">
                    {shippingFee === 0 ? 'Complimentary' : formatKSh(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Due</span>
                  <span className="font-mono tabular-nums text-lg">{formatKSh(grandTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  ← Back to Delivery
                </button>

                <button
                  type="submit"
                  className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-md"
                >
                  Confirm & Place Order ({formatKSh(grandTotal)})
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Order Confirmed */}
          {step === 'confirmation' && (
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">
                  Order Successfully Placed
                </span>
                <h3 className="font-display text-2xl font-bold text-stone-900">
                  Thank You, {formData.fullName}!
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Your luxury pieces are now being packed for dispatch. Maggy will contact you at <strong className="text-stone-800 font-mono">{formData.phone}</strong> for courier coordination.
                </p>
              </div>

              {/* Order details badge */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Order Reference:</span>
                  <span className="font-mono font-bold text-stone-900">{confirmedOrderId}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Total Amount:</span>
                  <span className="font-mono font-bold text-stone-900">{formatKSh(grandTotal)}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Delivery Address:</span>
                  <span className="font-medium text-stone-900 text-right">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-stone-500">Maggy Customer Support:</span>
                  <span className="font-mono font-bold text-stone-900">{MAGGY_PHONE_DISPLAY}</span>
                </div>
              </div>

              {/* Send Order to WhatsApp button */}
              <div className="pt-2 max-w-md mx-auto">
                <a
                  href={getWhatsAppUrl(whatsappConfirmationMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Notify Maggy via WhatsApp</span>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-sm"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
