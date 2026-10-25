export type ProductCategory = 'Skincare' | 'Makeup' | 'Haircare' | 'Fragrances' | 'Watches';

export type WatchSubcategory = "Men's Watches" | "Women's Watches" | "Unisex Watches";

export interface ProductVariant {
  id: string;
  name: string;
  colorHex?: string;
}

export interface ProductDetailItem {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  price: number; // in Kenyan Shillings (KSh)
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  highlights: string[];
  details: ProductDetailItem[];
  image: string;
  badge?: string;
  inStock: boolean;
  variants?: ProductVariant[];
  isBestseller?: boolean;
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  tagline: string;
  subcategories: string[];
}

// Contact details for Maggy
export const MAGGY_PHONE_DISPLAY = "0768 383 036";
export const MAGGY_PHONE_TEL = "tel:0768383036";
export const MAGGY_WHATSAPP_NUMBER = "254768383036";
export const MAGGY_DEFAULT_WHATSAPP_MESSAGE = "Hello Maggy, I'm interested in your products. Could you please share more information?";

export const getWhatsAppUrl = (customMessage?: string): string => {
  const msg = customMessage || MAGGY_DEFAULT_WHATSAPP_MESSAGE;
  return `https://wa.me/${MAGGY_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

export const formatKSh = (amount: number): string => {
  return `KSh ${Math.round(amount).toLocaleString()}`;
};

export const CATEGORIES_LIST: CategoryInfo[] = [
  {
    id: 'Skincare',
    name: 'Skincare',
    tagline: 'Hydrating botanical elixirs, serums, and cold-pressed facial oils',
    subcategories: ['All Skincare', 'Serums & Elixirs', 'Facial Oils', 'Cleansers & Balms'],
  },
  {
    id: 'Makeup',
    name: 'Makeup',
    tagline: 'Velvet matte lipsticks, silk complexion foundations, and eye palettes',
    subcategories: ['All Makeup', 'Lip Care', 'Eye Cosmetics', 'Complexion'],
  },
  {
    id: 'Haircare',
    name: 'Haircare',
    tagline: 'Nourishing rosemary-infused oils, scalp balms, and gloss elixirs',
    subcategories: ['All Haircare', 'Hair Elixirs & Scalp', 'Hair Masks & Treatments'],
  },
  {
    id: 'Fragrances',
    name: 'Fragrances',
    tagline: 'Artisanal extraits de parfum and crystalline botanical distillates',
    subcategories: ['All Fragrances', 'Eau de Parfum', 'Artisanal Extracts'],
  },
  {
    id: 'Watches',
    name: 'Watches',
    tagline: 'Heirloom Swiss and Japanese chronographs, automatics, and ultra-slim mesh',
    subcategories: ["All Watches", "Men's Watches", "Women's Watches", "Unisex Watches"],
  },
];

export const WATCH_SUBCATEGORIES: WatchSubcategory[] = [
  "Men's Watches",
  "Women's Watches",
  "Unisex Watches",
];

export const PRODUCTS: Product[] = [
  // --- SKINCARE ---
  {
    id: 'rose-hydrating-serum',
    name: 'Valentina Rose Hydrating Serum',
    category: 'Skincare',
    subcategory: 'Serums & Elixirs',
    price: 3800,
    originalPrice: 4500,
    rating: 4.9,
    reviewsCount: 142,
    description: 'An ultra-nourishing botanical elixir infused with Bulgarian Damask Rose water, triple-molecular hyaluronic acid, and botanical squalane to deeply replenish and revitalize dry or tired skin.',
    highlights: [
      'Triple-Molecular Hyaluronic Acid for multi-depth plumping',
      'Wild Bulgarian Rose extract calming redness and inflammation',
      'Non-comedogenic, featherweight silk finish',
      'Clean formula free of parabens, phthalates & artificial dyes'
    ],
    details: [
      { label: 'Volume', value: '30 ml / 1.0 fl. oz.' },
      { label: 'Skin Types', value: 'All skin types, including sensitive' },
      { label: 'Formulation', value: 'Liquid hydro-gel with dropper' },
      { label: 'Key Actives', value: 'Rose Flower Water, Niacinamide, Hyaluronate' }
    ],
    image: '/src/assets/images/product_rose_elixir_1792849758414.jpg',
    badge: 'Bestseller',
    inStock: true,
    variants: [
      { id: 'standard', name: 'Original 30ml' },
      { id: 'jumbo', name: 'Luxury 50ml' }
    ],
    isBestseller: true
  },
  {
    id: 'eclat-solaire-face-oil',
    name: 'Éclat Solaire Luminous Face Oil',
    category: 'Skincare',
    subcategory: 'Facial Oils',
    price: 4200,
    rating: 4.9,
    reviewsCount: 63,
    description: 'A 100% cold-pressed restorative nectar infused with golden jojoba, pure marula oil, and 24K colloidal gold suspension to lock in hydration and impart an angelic candlelit sheen.',
    highlights: [
      'Micro-suspended 24K gold leaves skin with an ethereal glow',
      'Rich in Omegas 6 and 9 plus natural skin-barrier antioxidants',
      'Fast-absorbing dry oil feel without sticky residue',
      'Protects against oxidative stress and dry climates'
    ],
    details: [
      { label: 'Volume', value: '30 ml / 1.0 fl. oz.' },
      { label: 'Skin Types', value: 'Normal, Dry, Mature, Combination' },
      { label: 'Use', value: 'Morning & evening before moisturizer' },
      { label: 'Certification', value: 'Cruelty-Free, Vegan, Organic' }
    ],
    image: '/src/assets/images/hero_maggy_showcase_1792849758508.jpg',
    badge: 'Limited Harvest',
    inStock: true,
    variants: [
      { id: 'standard', name: 'Dropper Bottle 30ml' }
    ],
    isBestseller: false
  },
  {
    id: 'jasmine-cleansing-balm',
    name: 'Jasmine & Blue Tansy Melt Balm',
    category: 'Skincare',
    subcategory: 'Cleansers & Balms',
    price: 3200,
    rating: 4.8,
    reviewsCount: 51,
    description: 'A luxurious velvet botanical cleansing balm that dissolves waterproof cosmetics and SPF on contact, transforming into a soothing milky emulsion that rinses away clean.',
    highlights: [
      'Moroccan Blue Tansy to cool irritated skin',
      'French Jasmine sambac floral extract',
      'Does not strip natural lipids or disturb mantle pH',
      'Includes organic unbleached muslin cleansing cloth'
    ],
    details: [
      { label: 'Weight', value: '100g / 3.5 oz.' },
      { label: 'Texture', value: 'Velvet balm to milk' },
      { label: 'Skin Types', value: 'All skin types' }
    ],
    image: '/src/assets/images/hero_maggy_showcase_1792849758508.jpg',
    inStock: true,
    variants: [
      { id: 'standard', name: 'Glass Jar 100g' }
    ],
    isBestseller: false
  },

  // --- MAKEUP ---
  {
    id: 'velvet-matte-lipstick',
    name: 'Aura Fluted Velvet Matte Lipstick',
    category: 'Makeup',
    subcategory: 'Lip Care',
    price: 2500,
    rating: 4.8,
    reviewsCount: 98,
    description: 'Housed in a weighty, custom fluted gold case, this couture lipstick delivers saturated matte pigment with a feather-light cushion feel that never dries out lips.',
    highlights: [
      'Infused with French camellia seed oil & vitamin E',
      '12-hour comfortable wear without feathering',
      'Ultra-refined micro-pigments with soft blur effect',
      'Solid magnetic click-close brass case'
    ],
    details: [
      { label: 'Finish', value: 'Airbrushed Velvet Matte' },
      { label: 'Weight', value: '3.8g / 0.13 oz' },
      { label: 'Fragrance', value: 'Delicate Tahitian vanilla' },
      { label: 'Wear Time', value: 'Up to 12 Hours' }
    ],
    image: '/src/assets/images/product_velvet_lipstick_1792849759913.jpg',
    badge: 'Award Winner',
    inStock: true,
    variants: [
      { id: 'berry', name: 'Royal Cabernet', colorHex: '#781d42' },
      { id: 'rose', name: 'Blushing Peony', colorHex: '#c76b77' },
      { id: 'nude', name: 'Velvet Cashmere', colorHex: '#b27461' },
      { id: 'crimson', name: 'Imperial Rouge', colorHex: '#991b1b' }
    ],
    isBestseller: true
  },
  {
    id: 'celestial-eyeshadow-palette',
    name: 'Celestial Silk Eye Sculpt Palette',
    category: 'Makeup',
    subcategory: 'Eye Cosmetics',
    price: 3500,
    rating: 4.8,
    reviewsCount: 88,
    description: 'Nine ultra-blendable powders milled to silk perfection. Features satin champagne, brushed bronze, molten rose gold, and velvety espresso for day-to-evening transformative eye looks.',
    highlights: [
      'Zero fallout micro-fine pigment pressing',
      'Contains soothing marigold flower and jojoba esters',
      'Dual mirror compact with gold art-deco embossing',
      'Crease-resistant 14-hour formula'
    ],
    details: [
      { label: 'Pan Count', value: '9 Multi-finish Shades' },
      { label: 'Finishes', value: 'Matte, Satin, Foil Duochrome' },
      { label: 'Net Weight', value: '14.5g / 0.51 oz' }
    ],
    image: '/src/assets/images/hero_maggy_showcase_1792849758508.jpg',
    inStock: true,
    variants: [
      { id: 'celestial-warm', name: 'Dawn Radiance (Warm Gold & Rose)' },
      { id: 'celestial-cool', name: 'Dusk Velvet (Smoky Quartz & Plum)' }
    ],
    isBestseller: false
  },
  {
    id: 'luminescent-silk-foundation',
    name: 'Luminescent Silk Mineral Foundation',
    category: 'Makeup',
    subcategory: 'Complexion',
    price: 3000,
    rating: 4.7,
    reviewsCount: 76,
    description: 'A breathable, weightless liquid foundation enriched with hyaluronic spheres that melts into the skin for a seamless second-skin radiance with medium buildable coverage.',
    highlights: [
      'Buildable medium-to-full satin coverage',
      'Non-comedogenic with SPF 20 mineral protection',
      'Resistant to sweat and humidity for 16 hours',
      'Enriched with vitamin C for brightened tone'
    ],
    details: [
      { label: 'Volume', value: '30 ml / 1.0 fl. oz.' },
      { label: 'Coverage', value: 'Medium buildable' },
      { label: 'Finish', value: 'Natural candlelit satin' }
    ],
    image: '/src/assets/images/product_velvet_lipstick_1792849759913.jpg',
    inStock: true,
    variants: [
      { id: 'f-fair', name: 'Fair Ivory Neutral', colorHex: '#f5e4d7' },
      { id: 'f-warm', name: 'Warm Beige', colorHex: '#e8cbb1' },
      { id: 'f-golden', name: 'Golden Honey', colorHex: '#cfa282' },
      { id: 'f-deep', name: 'Deep Espresso', colorHex: '#7d5236' }
    ],
    isBestseller: false
  },

  // --- HAIRCARE ---
  {
    id: 'botanical-hair-oil-elixir',
    name: 'Botanical Restorative Hair Oil Elixir',
    category: 'Haircare',
    subcategory: 'Hair Elixirs & Scalp',
    price: 2800,
    originalPrice: 3400,
    rating: 4.9,
    reviewsCount: 93,
    description: 'A dual-action scalp and strand elixir formulated with pure cold-pressed rosemary distillate, Moroccan argan oil, and golden jojoba to stimulate roots and seal split ends with glassy mirror shine.',
    highlights: [
      'Rosemary leaf extract clinically verified for follicle strength',
      'Moroccan Argan oil taming frizz without heaviness',
      'Heat protection up to 450°F / 232°C',
      'Subtle fragrance of wild mint and Mediterranean herbs'
    ],
    details: [
      { label: 'Volume', value: '30 ml / 1.01 fl. oz.' },
      { label: 'Hair Types', value: 'Straight, Wavy, Curly, Coily' },
      { label: 'Application', value: 'Scalp drops pre-wash or strand finish' },
      { label: 'Ingredients', value: '100% cold-pressed botanicals' }
    ],
    image: '/src/assets/images/product_botanical_hair_oil_1792858347975.jpg',
    badge: 'Trending Beauty',
    inStock: true,
    variants: [
      { id: 'standard', name: 'Dropper Bottle 30ml' },
      { id: 'jumbo', name: 'Salon Size 60ml' }
    ],
    isBestseller: true
  },
  {
    id: 'silk-gloss-hair-mask',
    name: 'Silk Peptide Intensive Repair Hair Mask',
    category: 'Haircare',
    subcategory: 'Hair Masks & Treatments',
    price: 2600,
    rating: 4.8,
    reviewsCount: 47,
    description: 'A restorative 5-minute deep conditioning treatment enriched with hydrolyzed silk proteins and camellia butter that reconstructs chemically treated and heat-damaged cuticles.',
    highlights: [
      'Reconstructs internal keratin bonds',
      'Restores 89% of hair elasticity after single application',
      'Lightweight rinse formula that maintains bounce',
      'Sulfate-free and safe for color-treated hair'
    ],
    details: [
      { label: 'Weight', value: '200 ml / 6.7 fl. oz.' },
      { label: 'Treatment Time', value: '5 to 10 Minutes' },
      { label: 'Frequency', value: '1 to 2 times weekly' }
    ],
    image: '/src/assets/images/product_botanical_hair_oil_1792858347975.jpg',
    inStock: true,
    variants: [
      { id: 'standard', name: 'Amber Tub 200ml' }
    ],
    isBestseller: false
  },

  // --- FRAGRANCES ---
  {
    id: 'aurea-botanica-perfume',
    name: 'Aurea Botanica Artisanal Eau de Parfum',
    category: 'Fragrances',
    subcategory: 'Eau de Parfum',
    price: 8500,
    originalPrice: 9500,
    rating: 5.0,
    reviewsCount: 84,
    description: 'An evocative olfactory journey opening with sun-drenched Italian bergamot, blossoming into Damask rose and nocturnal jasmine, anchored by warm golden amber and cedarwood.',
    highlights: [
      'Handcrafted crystalline glass flacon with engraved brass stopper',
      'Concentrated 22% Eau de Parfum oil formulation',
      'Wear time exceeding 10 hours with sophisticated sillage',
      'Clean organic alcohol carrier derived from organic sugarcane'
    ],
    details: [
      { label: 'Volume', value: '50 ml / 1.7 fl. oz.' },
      { label: 'Family', value: 'Warm Amber Floral' },
      { label: 'Top Notes', value: 'Calabrian Bergamot, Bitter Orange' },
      { label: 'Heart Notes', value: 'Damask Rose, Grasse Jasmine' },
      { label: 'Base Notes', value: 'Golden Amber Resin, Virginian Cedar' }
    ],
    image: '/src/assets/images/product_luxury_perfume_1792858347093.jpg',
    badge: 'Signature Scent',
    inStock: true,
    variants: [
      { id: 'edp-50', name: 'Crystalline Flacon 50ml' },
      { id: 'edp-100', name: 'Grand Flacon 100ml' }
    ],
    isBestseller: true
  },
  {
    id: 'ambre-imperiale-extrait',
    name: 'Ambre Impériale Extrait de Parfum',
    category: 'Fragrances',
    subcategory: 'Artisanal Extracts',
    price: 9800,
    rating: 4.9,
    reviewsCount: 39,
    description: 'A deeply sensual nocturnal composition featuring 30% pure perfume oil. Smoked Madagascar vanilla, rare benzoin tears, tonka bean, and velvety labdanum create a lingering aura of magnetic distinction.',
    highlights: [
      'High-potency 30% Extrait de Parfum',
      'Blended with rare wild-harvested resins',
      'Over 14-hour skin longevity',
      'Housed in a weighted gift box with velvet lining'
    ],
    details: [
      { label: 'Volume', value: '50 ml / 1.7 fl. oz.' },
      { label: 'Family', value: 'Woody Oriental Resin' },
      { label: 'Key Notes', value: 'Smoked Vanilla, Benzoin, Labdanum' }
    ],
    image: '/src/assets/images/product_luxury_perfume_1792858347093.jpg',
    inStock: true,
    variants: [
      { id: 'standard', name: 'Black Velvet Flacon 50ml' }
    ],
    isBestseller: false
  },

  // --- WATCHES: MEN'S WATCHES ---
  {
    id: 'aethelred-diver-automatic',
    name: 'Aethelred 300m Steel Automatic Diver',
    category: 'Watches',
    subcategory: "Men's Watches",
    price: 24500,
    originalPrice: 28000,
    rating: 5.0,
    reviewsCount: 52,
    description: 'A rugged yet refined tool watch engineered for maritime depth and boardroom polish. Features a scratchproof black ceramic 120-click unidirectional bezel, matte black dial with Super-LumiNova indices, and solid 316L oyster bracelet.',
    highlights: [
      'Swiss Calibre automatic mechanical movement with 42-hour reserve',
      'Scratchproof black ceramic 120-click rotating bezel',
      '300m (30 ATM / 1000ft) professional water resistance',
      'Solid link 316L stainless steel bracelet with diver extension'
    ],
    details: [
      { label: 'Case Diameter', value: '42 mm' },
      { label: 'Case Thickness', value: '12.8 mm' },
      { label: 'Glass', value: 'Domed Sapphire Crystal with Internal AR' },
      { label: 'Movement', value: '26-Jewel High-Beat Automatic (28,800 vph)' },
      { label: 'Lug Width', value: '20 mm' }
    ],
    image: '/src/assets/images/product_mens_diver_watch_1792858347878.jpg',
    badge: 'Pro Diver Spec',
    inStock: true,
    variants: [
      { id: 'steel-black', name: 'Oyster Steel / Ceramic Black', colorHex: '#18181b' },
      { id: 'steel-blue', name: 'Oyster Steel / Ocean Blue', colorHex: '#1e3a5f' }
    ],
    isBestseller: true
  },
  {
    id: 'nocturne-obsidian-automatic',
    name: 'Nocturne Obsidian 40mm Automatic',
    category: 'Watches',
    subcategory: "Men's Watches",
    price: 22000,
    originalPrice: 25500,
    rating: 4.9,
    reviewsCount: 41,
    description: 'A masterclass in contemporary horology. Featuring an open-heart dial with an exhibition sapphire caseback revealing the 24-jewel Japanese mechanical movement self-wound by everyday movement.',
    highlights: [
      'Japanese NH38 Automatic Movement with 41-hour power reserve',
      'Diamond-Like Carbon (DLC) matte black stainless steel casing',
      'Exhibition open-heart escapement window',
      'Integrated quick-release aerospace grade silicone & leather band'
    ],
    details: [
      { label: 'Case Diameter', value: '40 mm' },
      { label: 'Movement', value: '24-Jewel Self-Winding Mechanical' },
      { label: 'Power Reserve', value: '41 Hours' },
      { label: 'Water Resistance', value: '100m (10 ATM)' }
    ],
    image: '/src/assets/images/product_gold_chronograph_1792849760931.jpg',
    badge: 'Collector Choice',
    inStock: true,
    variants: [
      { id: 'matte-black', name: 'Matte Obsidian Steel', colorHex: '#18181b' },
      { id: 'gunmetal', name: 'Brushed Gunmetal', colorHex: '#475569' }
    ],
    isBestseller: false
  },

  // --- WATCHES: WOMEN'S WATCHES ---
  {
    id: 'aurelia-rose-mesh-timepiece',
    name: 'Aurélia Ultra-Slim Rose Mesh Timepiece',
    category: 'Watches',
    subcategory: "Women's Watches",
    price: 14500,
    rating: 4.9,
    reviewsCount: 112,
    description: 'Engineered for understated grace. Boasting an ultra-slender 6.4mm profile, pristine porcelain dial, and a fluid rose-gold Milanese mesh bracelet that contours effortlessly to your wrist.',
    highlights: [
      'Ultra-thin 6.4 mm case engineered for lightweight everyday comfort',
      'Mother-of-pearl minimalist indices and delicate sword hands',
      'Self-adjustable magnetic clasp for seamless sizing',
      'Hypoallergenic 316L medical grade stainless steel'
    ],
    details: [
      { label: 'Case Diameter', value: '34 mm' },
      { label: 'Case Thickness', value: '6.4 mm' },
      { label: 'Glass', value: 'Hardened Mineral Sapphire Finish' },
      { label: 'Movement', value: 'Miyota Super-Slim Quartz' },
      { label: 'Strap', value: 'Fluid Milanese Mesh (Rose Gold)' }
    ],
    image: '/src/assets/images/product_minimalist_timepiece_1792849759942.jpg',
    badge: 'Top Gift',
    inStock: true,
    variants: [
      { id: 'rose-gold', name: 'Rose Gold Mesh', colorHex: '#e0a899' },
      { id: 'champagne', name: 'Champagne Gold', colorHex: '#e5c158' },
      { id: 'silver', name: 'Sterling Silver', colorHex: '#cbd5e1' }
    ],
    isBestseller: true
  },
  {
    id: 'riviera-two-tone-classic',
    name: 'Riviera Roman Two-Tone Classic Date',
    category: 'Watches',
    subcategory: "Women's Watches",
    price: 16800,
    rating: 4.7,
    reviewsCount: 56,
    description: 'An enduring icon designed for all occasions. Fluted 18K yellow gold tone bezel, sunray silver dial with embossed Roman numerals, and cyclops magnification over the date indicator.',
    highlights: [
      'Two-tone 316L stainless steel jubilee style bracelet',
      'Fluted bezel reflecting light from every angle',
      'Cyclops date window at 3 o’clock position',
      'Dual safety folding deployment clasp'
    ],
    details: [
      { label: 'Case Diameter', value: '34 mm' },
      { label: 'Dial Color', value: 'Silver Sunburst with Gold Roman Numerals' },
      { label: 'Movement', value: 'High Precision Quartz with Date' },
      { label: 'Water Resistance', value: '50m (5 ATM)' }
    ],
    image: '/src/assets/images/product_minimalist_timepiece_1792849759942.jpg',
    inStock: true,
    variants: [
      { id: 'two-tone-gold', name: 'Silver & Yellow Gold', colorHex: '#d4af37' },
      { id: 'two-tone-rose', name: 'Silver & Rose Gold', colorHex: '#e0a899' }
    ],
    isBestseller: false
  },

  // --- WATCHES: UNISEX WATCHES ---
  {
    id: 'aurum-emerald-chronograph',
    name: 'Aurum Heritage Emerald Chronograph',
    category: 'Watches',
    subcategory: "Unisex Watches",
    price: 18500,
    originalPrice: 21000,
    rating: 5.0,
    reviewsCount: 74,
    description: 'A striking statement in precision horology. Featuring a deep emerald green sunburst dial encased in warm brushed 18K gold-plated 316L stainless steel, paired with supple saddle brown Italian leather.',
    highlights: [
      'Swiss precision quartz movement with 3 sub-dials',
      'Scratch-resistant anti-reflective sapphire crystal',
      '50m (5 ATM) water resistance rating',
      'Hand-stitched Tuscan vegetable-tanned leather band'
    ],
    details: [
      { label: 'Case Diameter', value: '40 mm (Unisex Fit)' },
      { label: 'Case Thickness', value: '10.5 mm' },
      { label: 'Glass', value: 'Sapphire Crystal with AR Coating' },
      { label: 'Movement', value: 'Calibre 5030.D Precision Quartz' },
      { label: 'Strap Width', value: '20 mm Quick-Release' }
    ],
    image: '/src/assets/images/product_gold_chronograph_1792849760931.jpg',
    badge: 'Iconic Design',
    inStock: true,
    variants: [
      { id: 'emerald-brown', name: 'Emerald / Cognac Leather', colorHex: '#064e3b' },
      { id: 'black-gold', name: 'Obsidian / Midnight Black', colorHex: '#18181b' }
    ],
    isBestseller: true
  },
  {
    id: 'klassik-bauhaus-minimalist',
    name: 'Klassik Bauhaus 38mm Monochromatic Quartz',
    category: 'Watches',
    subcategory: "Unisex Watches",
    price: 13500,
    rating: 4.8,
    reviewsCount: 65,
    description: 'Clean architectural lines inspired by the timeless German Bauhaus movement. Unadorned white dial, crisp typography, and an interchangeable Horween leather strap that flatters every wrist size.',
    highlights: [
      'Perfect 38mm unisex case proportion',
      'Double-domed anti-reflective sapphire crystal',
      'Swiss Ronda quartz calibre with 5-year battery life',
      'Tool-less quick change strap pins'
    ],
    details: [
      { label: 'Case Diameter', value: '38 mm' },
      { label: 'Case Thickness', value: '7.8 mm' },
      { label: 'Strap Material', value: 'Genuine Horween Leather' },
      { label: 'Water Resistance', value: '50m (5 ATM)' }
    ],
    image: '/src/assets/images/product_minimalist_timepiece_1792849759942.jpg',
    inStock: true,
    variants: [
      { id: 'tan-leather', name: 'Natural Tan Leather', colorHex: '#b27461' },
      { id: 'black-leather', name: 'Onyx Black Leather', colorHex: '#18181b' }
    ],
    isBestseller: false
  }
];

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  productName: string;
  comment: string;
  verifiedPurchase: boolean;
}

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Elena Vance',
    role: 'Verified Buyer',
    rating: 5,
    date: 'October 18, 2026',
    productName: 'Valentina Rose Hydrating Serum',
    comment: 'I was hesitant about oil serums causing breakouts, but this sank in completely in 2 minutes. My skin has had that lit-from-within glow all week, and the natural rose fragrance is sublime.',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    author: 'Julian Mercer',
    role: 'Verified Buyer',
    rating: 5,
    date: 'October 21, 2026',
    productName: 'Aethelred 300m Steel Automatic Diver',
    comment: 'Solid build, clean ceramic bezel action, and the lume is stellar. The weight of the 316L steel feels like a four-figure luxury diver. Outstanding addition to Maggy’s watch catalogue.',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    author: 'Sophie Chen',
    role: 'Verified Buyer',
    rating: 5,
    date: 'October 08, 2026',
    productName: 'Aura Fluted Velvet Matte Lipstick',
    comment: 'Royal Cabernet is the most flattering berry shade I have ever worn. The fluted gold tube has that satisfying magnetic snap that feels like couture every time you touch it.',
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    author: 'Claire D’Agostino',
    role: 'Verified Buyer',
    rating: 5,
    date: 'September 29, 2026',
    productName: 'Aurélia Ultra-Slim Rose Mesh Timepiece',
    comment: 'Exceptionally light and sits so flush against the wrist. I wear it stacked with my gold bangles. Maggy delivered it in gorgeous branded velvet packaging within 48 hours.',
    verifiedPurchase: true
  },
  {
    id: 'rev-5',
    author: 'Amara Nyambura',
    role: 'Verified Buyer',
    rating: 5,
    date: 'October 23, 2026',
    productName: 'Aurea Botanica Artisanal Eau de Parfum',
    comment: 'The amber and damask rose drydown is rich, romantic, and lasts through a 10-hour day. I received three compliments before lunchtime alone.',
    verifiedPurchase: true
  }
];
