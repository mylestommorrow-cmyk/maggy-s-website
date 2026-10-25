import React, { useState } from 'react';
import { Product, ProductVariant, formatKSh } from '../data/products';
import { Star, Eye, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, variant?: ProductVariant) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
}) => {
  const [imageError, setImageError] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    onAddToCart(product, selectedVariant);
    setTimeout(() => setIsAdding(false), 1200);
  };

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group flex flex-col bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-left"
    >
      {/* Visual Slot with Fallback Container */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200/60 p-6 text-center">
            <span className="font-display text-base font-medium text-stone-700">
              {product.name}
            </span>
            <span className="text-xs text-stone-400 mt-1 uppercase tracking-wider">
              {product.category}
            </span>
          </div>
        )}

        {/* Single subtle editorial text badge if present */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-stone-900 text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded shadow-2xs">
            {product.badge}
          </div>
        )}

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-end">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 text-stone-900 rounded-md text-xs font-medium shadow-xs">
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* Product Content & Typography */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Unboxed Metadata with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
            <span className="uppercase tracking-wider font-medium text-stone-600">
              {product.subcategory}
            </span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700">In Stock</span>
          </div>

          {/* Product Name */}
          <h3 className="text-base font-semibold text-stone-900 leading-snug group-hover:text-amber-900 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Star Rating & Count */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-stone-600">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-medium font-mono tabular-nums text-stone-800">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-stone-400 font-mono tabular-nums">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Variants selection if applicable */}
        {product.variants && product.variants.length > 1 && (
          <div
            className="flex items-center gap-1.5 pt-1"
            onClick={(e) => e.stopPropagation()}
          >
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariant(v)}
                title={v.name}
                className={`relative w-4.5 h-4.5 rounded-full border transition-all cursor-pointer ${
                  selectedVariant?.id === v.id
                    ? 'ring-2 ring-stone-900 ring-offset-1 border-transparent'
                    : 'border-stone-300 hover:border-stone-500'
                }`}
                style={{ backgroundColor: v.colorHex || '#d4cebe' }}
                aria-label={`Select ${v.name}`}
              />
            ))}
            <span className="text-[11px] text-stone-500 truncate ml-1 max-w-[120px]">
              {selectedVariant?.name}
            </span>
          </div>
        )}

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-mono tabular-nums text-base font-bold text-stone-900">
              {formatKSh(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-mono tabular-nums text-xs text-stone-400 line-through">
                {formatKSh(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={isAdding}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
              isAdding
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-white'
            }`}
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-200" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-amber-200" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
