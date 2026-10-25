import React, { useState, useMemo, useEffect } from 'react';
import {
  Product,
  ProductVariant,
  ProductCategory,
  CATEGORIES_LIST,
  WATCH_SUBCATEGORIES,
  PRODUCTS,
} from '../data/products';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Sparkles, Watch, Search, X, Droplet, Palette, Scissors, Wind } from 'lucide-react';

interface CatalogSectionProps {
  activeCategory: string;
  activeSubcategory?: string;
  onSelectCategory: (cat: string, subcategory?: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, variant?: ProductVariant) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  activeCategory,
  activeSubcategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(activeSubcategory || 'all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Synchronize incoming subcategory change
  useEffect(() => {
    if (activeSubcategory) {
      setSelectedSubcategory(activeSubcategory);
    } else {
      setSelectedSubcategory('all');
    }
  }, [activeCategory, activeSubcategory]);

  // Current category metadata
  const currentCategoryInfo = useMemo(() => {
    return CATEGORIES_LIST.find((c) => c.id === activeCategory);
  }, [activeCategory]);

  // Dynamic subcategories based on active category
  const subcategoryOptions = useMemo(() => {
    if (activeCategory === 'Watches') {
      return ['All Watches', ...WATCH_SUBCATEGORIES];
    }
    if (currentCategoryInfo) {
      return currentCategoryInfo.subcategories;
    }
    return [
      'all',
      'Skincare',
      'Makeup',
      'Haircare',
      'Fragrances',
      "Men's Watches",
      "Women's Watches",
      "Unisex Watches",
    ];
  }, [activeCategory, currentCategoryInfo]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // 1. Primary Category Filter
      if (activeCategory !== 'all' && activeCategory !== 'bestsellers') {
        if (item.category !== activeCategory) {
          return false;
        }
      }

      if (activeCategory === 'bestsellers' && !item.isBestseller) {
        return false;
      }

      // 2. Subcategory Filter
      if (
        selectedSubcategory &&
        selectedSubcategory !== 'all' &&
        selectedSubcategory !== 'All Watches' &&
        selectedSubcategory !== 'All Skincare' &&
        selectedSubcategory !== 'All Makeup' &&
        selectedSubcategory !== 'All Haircare' &&
        selectedSubcategory !== 'All Fragrances'
      ) {
        // If it's a Watch subcategory ("Men's Watches", "Women's Watches", "Unisex Watches")
        if (item.category === 'Watches') {
          if (item.subcategory !== selectedSubcategory) {
            return false;
          }
        } else {
          // General subcategories
          if (item.subcategory !== selectedSubcategory && item.category !== selectedSubcategory) {
            return false;
          }
        }
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        const matchesSub = item.subcategory.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesSub && !matchesDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [activeCategory, selectedSubcategory, searchQuery, sortBy]);

  // Helper icons
  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'Skincare':
        return <Droplet className="w-3.5 h-3.5 text-rose-500" />;
      case 'Makeup':
        return <Palette className="w-3.5 h-3.5 text-amber-600" />;
      case 'Haircare':
        return <Scissors className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Fragrances':
        return <Wind className="w-3.5 h-3.5 text-indigo-500" />;
      case 'Watches':
        return <Watch className="w-3.5 h-3.5 text-amber-800" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-stone-600" />;
    }
  };

  return (
    <section id="catalog" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-amber-900 font-semibold mb-2">
              Curated Departments
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-stone-900">
              {activeCategory === 'all' && 'The Complete Maggy Boutique'}
              {activeCategory === 'Skincare' && 'Botanical Skincare & Elixirs'}
              {activeCategory === 'Makeup' && 'Couture Makeup & Velvet Pigments'}
              {activeCategory === 'Haircare' && 'Restorative Haircare & Scalp Treatments'}
              {activeCategory === 'Fragrances' && 'Artisanal Fragrances & Extraits'}
              {activeCategory === 'Watches' && 'Heirloom Timepieces & Chronographs'}
              {activeCategory === 'bestsellers' && 'Most Coveted Bestsellers'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              {currentCategoryInfo?.tagline ||
                'Explore high-performance botanical beauty alongside Swiss and Japanese precision horology.'}{' '}
              Showing <strong className="font-mono tabular-nums text-stone-800">{filteredProducts.length}</strong> items.
            </p>
          </div>

          {/* Category Tabs (Primary Filter Controls) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-200/70 rounded-xl self-start md:self-auto">
            <button
              onClick={() => {
                onSelectCategory('all');
                setSelectedSubcategory('all');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All
            </button>

            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setSelectedSubcategory('all');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Watches Subcategory Spotlight Strip (When Watches is active or highlighted) */}
        {activeCategory === 'Watches' && (
          <div className="mb-8 p-4 bg-white rounded-2xl border border-stone-200/90 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-900 uppercase tracking-wider">
                <Watch className="w-4 h-4 text-amber-900" />
                <span>Horology Departments</span>
              </div>
              <span className="text-xs text-stone-500">
                Swiss & Japanese quartz & automatic calibres · 316L surgical steel
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => setSelectedSubcategory('All Watches')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedSubcategory === 'all' || selectedSubcategory === 'All Watches'
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                }`}
              >
                <div className="font-semibold text-xs">All Timepieces</div>
                <div className={`text-[11px] mt-0.5 ${selectedSubcategory === 'all' || selectedSubcategory === 'All Watches' ? 'text-stone-300' : 'text-stone-500'}`}>
                  Full catalog ({PRODUCTS.filter(p => p.category === 'Watches').length} models)
                </div>
              </button>

              {WATCH_SUBCATEGORIES.map((sub) => {
                const count = PRODUCTS.filter((p) => p.category === 'Watches' && p.subcategory === sub).length;
                const isSelected = selectedSubcategory === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                    }`}
                  >
                    <div className="font-semibold text-xs">{sub}</div>
                    <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                      {sub === "Men's Watches" && 'Automatic divers & chronographs'}
                      {sub === "Women's Watches" && 'Slim rose mesh & two-tone date'}
                      {sub === "Unisex Watches" && '38-40mm Bauhaus & heritage'}
                      <span className="ml-1 font-mono tabular-nums">({count})</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Subcategories Filter & Sort Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
          
          {/* Subcategory Filter Pills/Tabs (for Non-watches or secondary filtering) */}
          {activeCategory !== 'Watches' && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {subcategoryOptions.map((sub) => {
                const isSelected =
                  selectedSubcategory === sub ||
                  (sub.startsWith('All') && selectedSubcategory === 'all');
                return (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    {sub === 'all' ? 'All Types' : sub}
                  </button>
                );
              })}
            </div>
          )}

          {activeCategory === 'Watches' && <div />}

          {/* Search Indicator & Sort Dropdown */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            {searchQuery && (
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 text-xs px-2.5 py-1 rounded-lg">
                <span>Filtering: <strong>"{searchQuery}"</strong></span>
                <button
                  onClick={() => onSearchChange('')}
                  className="hover:text-amber-950 font-bold ml-1 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-stone-600">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
              <label htmlFor="sort-select" className="hidden sm:inline">Sort:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated (★)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-stone-200 p-8 space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-semibold text-stone-800">
              No matching creations found
            </h3>
            <p className="text-xs text-stone-500">
              Try adjusting your subcategory selection or clear search terms to view all available pieces.
            </p>
            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('all');
                setSelectedSubcategory('all');
              }}
              className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
