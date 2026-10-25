/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CatalogSection } from './components/CatalogSection';
import { BrandStorySection } from './components/BrandStorySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { ContactFloatingBar } from './components/ContactFloatingBar';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Product, ProductVariant, CartItem, PRODUCTS } from './data/products';
import { Check } from 'lucide-react';

const CART_STORAGE_KEY = 'maggy_cosmetics_cart_v2_ksh';

export default function App() {
  // Cart state with persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
    // Initial luxury sample item in KSh
    return [
      {
        product: PRODUCTS[0], // Valentina Rose Hydrating Serum (KSh 3,800)
        quantity: 1,
      },
    ];
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // Category & Subcategory state
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Discount / Coupon state
  const [discountCode, setDiscountCode] = useState<string>('MAGGY10');
  const [discountPercent, setDiscountPercent] = useState<number>(10);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to persist cart', e);
    }
  }, [cart]);

  // Handle category & subcategory selection
  const handleSelectCategory = (category: string, subcategory?: string) => {
    setActiveCategory(category);
    setActiveSubcategory(subcategory);
  };

  // Cart operations
  const handleAddToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant?.id === variant?.id
      );

      if (existingIndex > -1) {
        const next = [...prevCart];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prevCart,
          {
            product,
            selectedVariant: variant,
            quantity,
          },
        ];
      }
    });

    const itemLabel = variant ? `${product.name} (${variant.name})` : product.name;
    setToastMessage(`Added ${quantity > 1 ? `${quantity}× ` : ''}"${itemLabel}" to your bag.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleUpdateQuantity = (productId: string, variantId: string | undefined, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedVariant?.id === variantId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string, variantId: string | undefined) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedVariant?.id === variantId)
      )
    );
  };

  const handleApplyDiscount = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'MAGGY10' || normalized === 'WELCOME10') {
      setDiscountCode(normalized);
      setDiscountPercent(10);
      return true;
    }
    if (normalized === 'MAGGY15' || normalized === 'VIP15') {
      setDiscountCode(normalized);
      setDiscountPercent(15);
      return true;
    }
    return false;
  };

  // Calculations for checkout in Kenyan Shillings (KSh)
  const FREE_SHIPPING_THRESHOLD = 5000;
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const eligibleForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = subtotal > 0 ? (eligibleForFreeShipping ? 0 : 350) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleOrderCompleted = () => {
    setCart([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  };

  const scrollToCatalog = (category: string, subcategory?: string) => {
    handleSelectCategory(category, subcategory);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans relative">
      
      {/* Top Navigation */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Storefront Body */}
      <main className="flex-1">
        
        {/* Campaign Hero Section */}
        <HeroSection
          onExploreCosmetics={() => scrollToCatalog('Skincare')}
          onExploreWatches={() => scrollToCatalog('Watches')}
        />

        {/* Catalog Section with Categories & Subcategories in KSh */}
        <CatalogSection
          activeCategory={activeCategory}
          activeSubcategory={activeSubcategory}
          onSelectCategory={handleSelectCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
        />

        {/* Brand Philosophy & Craftsmanship Section */}
        <BrandStorySection />

        {/* Testimonials & Proof */}
        <TestimonialsSection />

        {/* Dedicated Contact Maggy Section */}
        <ContactSection />

      </main>

      {/* Global Concierge Footer */}
      <Footer />

      {/* Prominent Floating WhatsApp Us & Call Us Bar */}
      <ContactFloatingBar />

      {/* Floating Bag Notification */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-20 sm:bottom-6 left-6 z-50 flex items-center gap-3 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-stone-800 text-xs animate-in slide-in-from-bottom-3 duration-200"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium text-stone-200">{toastMessage}</span>
          <button
            onClick={() => {
              setToastMessage(null);
              setIsCartOpen(true);
            }}
            className="ml-2 font-semibold text-amber-300 hover:text-amber-200 underline cursor-pointer whitespace-nowrap"
          >
            View Bag
          </button>
        </aside>
      )}

      {/* Product Quick View / PDP Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Bag Slide-Over Drawer with WhatsApp Order */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        discountCode={discountCode}
        discountPercent={discountPercent}
        onApplyDiscount={handleApplyDiscount}
      />

      {/* Express Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        subtotal={subtotal}
        discountAmount={discountAmount}
        shippingFee={shippingFee}
        grandTotal={grandTotal}
        onOrderCompleted={handleOrderCompleted}
      />

    </div>
  );
}
