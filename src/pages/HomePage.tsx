import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChefHat,
  Clock,
  Flame,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react';
import { motion } from 'motion/react';
import React, { useMemo, useState } from 'react';
import { DishModal } from '../components/DishModal';
import { FoodImage } from '../components/FoodImage';
import { KitchenFilmSection } from '../components/KitchenFilmSection';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import {
  CATEGORIES,
  CUSTOMER_REVIEWS,
  IMAGES,
  MENU_ITEMS,
  SPECIAL_OFFERS,
} from '../data/menuData';
import { MenuCategory, MenuItem, RoutePath } from '../types';

interface HomePageProps {
  onNavigate: (path: RoutePath) => void;
}

const HERO_HOTSPOTS = [
  {
    id: 'crust',
    number: '01',
    title: '260°C Lacy Smash Crust',
    detail:
      'Never-frozen prime chuck & brisket seared on cast steel for deep caramelized crunch.',
    posClass: 'top-[46%] left-[20%]',
  },
  {
    id: 'brioche',
    number: '02',
    title: '48h Butter Brioche',
    detail:
      'Cold-fermented bakery buns toasted in clarified butter so every bite stays structured.',
    posClass: 'top-[22%] left-[52%]',
  },
  {
    id: 'sauce',
    number: '03',
    title: 'Smoked Chipotle Drip',
    detail:
      'Emulsified in-house every morning with roasted chili, charred garlic, and tangy pickles.',
    posClass: 'top-[62%] right-[16%]',
  },
];

const MARQUEE_ITEMS = [
  '30 SIGNATURE DISHES',
  'FLAME-SEARED PRIME BEEF',
  '48H SOURDOUGH PIZZA',
  '28-MIN HOT DISPATCH',
  '100% ZABIHA HALAL',
  'CRAVE IT · LOVE IT · LIVE IT',
];

type BestSellerFilter = 'All' | 'Burgers' | 'Pizzas' | 'Chicken & Sides' | 'Drinks & Desserts';

export function HomePage({ onNavigate }: HomePageProps) {
  const { addToCart, setSelectedMenuCategory, totalLoyaltyBalance } = useCart();
  const [activeHotspotId, setActiveHotspotId] = useState<string>('crust');
  const [bestSellerFilter, setBestSellerFilter] = useState<BestSellerFilter>('All');
  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number>(0);
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const bestSellersPool = useMemo(
    () => MENU_ITEMS.filter((item) => item.badge === 'Bestseller'),
    []
  );

  const visibleBestSellers = useMemo(() => {
    if (bestSellerFilter === 'All') return bestSellersPool.slice(0, 6);
    if (bestSellerFilter === 'Burgers') {
      return bestSellersPool.filter((i) => i.category === 'Burgers');
    }
    if (bestSellerFilter === 'Pizzas') {
      return bestSellersPool.filter((i) => i.category === 'Pizzas');
    }
    if (bestSellerFilter === 'Chicken & Sides') {
      return bestSellersPool.filter(
        (i) => i.category === 'Fried Chicken' || i.category === 'Fries & Sides' || i.category === 'Sandwiches'
      );
    }
    return bestSellersPool.filter((i) => i.category === 'Drinks' || i.category === 'Desserts');
  }, [bestSellerFilter, bestSellersPool]);

  const spotlightBurger = MENU_ITEMS.find((item) => item.id === 'double-smash-burger')!;
  const familyFeastOffer = SPECIAL_OFFERS[1];
  const activeHotspot =
    HERO_HOTSPOTS.find((h) => h.id === activeHotspotId) || HERO_HOTSPOTS[0];
  const activeCategory = CATEGORIES[activeCategoryIdx];

  const handleCategoryExplore = (category: MenuCategory) => {
    setSelectedMenuCategory(category);
    onNavigate('/menu');
  };

  const handleHeroOrderNow = () => {
    addToCart(
      {
        id: spotlightBurger.id,
        name: spotlightBurger.name,
        price: spotlightBurger.price,
        image: spotlightBurger.image,
        category: spotlightBurger.category,
      },
      true
    );
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim())) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterEmail('');
  };

  const loyaltyProgress = Math.min(100, Math.round((totalLoyaltyBalance / 500) * 100));

  return (
    <div className="bg-[#101010] text-[#FFF4E8]">
      {/* 1. DEEP BLACK HERO WITH AMBIENT FLAME LIGHTING & INTERACTIVE HOTSPOTS */}
      <section
        className="relative overflow-hidden bg-[#101010]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 75% 40%, rgba(255, 90, 31, 0.16), transparent 55%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Copy */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-6"
            >
              <p className="text-xs font-bold tracking-[0.22em] text-[#FFCB45]">
                WHERE EVERY BITE BECOMES AN EXPERIENCE.
              </p>

              <h1
                className="font-display font-extrabold tracking-tight text-[#FFFFFF] leading-[0.98]"
                style={{ fontSize: 'clamp(2.75rem, 5.4vw, 4.75rem)' }}
              >
                BIG CRAVINGS.{' '}
                <span className="text-[#FF5A1F]">BIGGER FLAVORS.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#D9CBBF] max-w-xl leading-relaxed">
                Freshly crafted. Boldly flavored. Delivered to your door. Open-flame smash
                burgers, blistered sourdough pizzas, and crisp buttermilk crunch from our
                30-item chef menu.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMenuCategory('All');
                    onNavigate('/menu');
                  }}
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-extrabold text-sm tracking-wide transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCB45]"
                >
                  <span>EXPLORE MENU</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={handleHeroOrderNow}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-[#191919] border border-white/20 hover:border-[#FFCB45] text-[#FFFFFF] font-bold text-sm tracking-wide transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCB45]"
                >
                  <span>ORDER NOW</span>
                </button>
              </div>

              {/* Clean unboxed proof metrics */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-5 max-w-lg">
                <div>
                  <span className="block font-mono tabular-nums text-2xl font-extrabold text-[#FFFFFF]">
                    30
                  </span>
                  <span className="text-xs text-[#D9CBBF]/75">Unique signature items</span>
                </div>
                <div>
                  <span className="block font-mono tabular-nums text-2xl font-extrabold text-[#FFCB45]">
                    4.9 / 5
                  </span>
                  <span className="text-xs text-[#D9CBBF]/75">12,400+ guest reviews</span>
                </div>
                <div>
                  <span className="block font-mono tabular-nums text-2xl font-extrabold text-[#FFFFFF]">
                    28 min
                  </span>
                  <span className="text-xs text-[#D9CBBF]/75">Avg. hot dispatch</span>
                </div>
              </div>
            </motion.div>

            {/* Interactive Burger Showcase with Floating Elements & Hotspots */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#191919] shadow-2xl">
                <FoodImage
                  src={IMAGES.heroBurger}
                  alt="CRAVEVERSE Signature Double Smash Burger with floating fries and chipotle sauce"
                  className="w-full aspect-[16/11] lg:aspect-[4/3] object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#101010]/90 via-transparent to-transparent"
                />

                {/* Interactive Hotspot Pins */}
                {HERO_HOTSPOTS.map((spot) => {
                  const isActive = spot.id === activeHotspotId;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => setActiveHotspotId(spot.id)}
                      aria-label={`Inspect ${spot.title}`}
                      className={`hidden sm:flex absolute ${spot.posClass} w-9 h-9 rounded-lg font-mono text-xs font-extrabold items-center justify-center transition-transform duration-150 cursor-pointer shadow-xl ${
                        isActive
                          ? 'bg-[#FF5A1F] text-[#101010] scale-110 ring-2 ring-[#FFCB45]'
                          : 'bg-[#101010]/85 text-[#FFFFFF] border border-white/30 hover:border-[#FF5A1F]'
                      }`}
                    >
                      {spot.number}
                    </button>
                  );
                })}

                {/* Floating Culinary Tag */}
                <div className="animate-float-slow hidden sm:flex absolute top-4 left-4 bg-[#101010]/90 backdrop-blur-md border border-white/15 rounded-xl px-3.5 py-2.5 items-center gap-2.5 shadow-xl">
                  <Flame className="w-4 h-4 text-[#FF5A1F]" aria-hidden="true" />
                  <span className="text-xs font-bold text-[#FFFFFF]">
                    Open-Flame Searing
                  </span>
                </div>

                {/* Floating Price Stamp */}
                <div className="animate-float-alt absolute top-4 right-4 bg-[#FFCB45] text-[#101010] rounded-xl px-4 py-2.5 shadow-xl">
                  <span className="block text-[10px] font-bold uppercase tracking-wider">
                    Double Smash
                  </span>
                  <span className="font-mono tabular-nums text-lg font-extrabold">
                    Rs. 1,099
                  </span>
                </div>

                {/* Interactive Hotspot Readout Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#101010]/90 backdrop-blur-md border border-white/15 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-[#FFCB45]">
                      <span>CRAFT NOTE {activeHotspot.number}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#FF5A1F]">{activeHotspot.title}</span>
                    </div>
                    <p className="text-xs text-[#D9CBBF] leading-snug">
                      {activeHotspot.detail}
                    </p>
                  </div>
                  <div className="flex sm:hidden gap-1.5 shrink-0">
                    {HERO_HOTSPOTS.map((spot) => (
                      <button
                        key={spot.id}
                        type="button"
                        onClick={() => setActiveHotspotId(spot.id)}
                        className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                          spot.id === activeHotspotId
                            ? 'bg-[#FF5A1F] text-[#101010]'
                            : 'bg-white/10 text-[#FFFFFF]'
                        }`}
                      >
                        {spot.number}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* KINETIC FLAME MARQUEE STRIP */}
        <div
          aria-hidden="true"
          className="bg-[#FF5A1F] text-[#101010] py-3 border-y border-[#101010]/20 overflow-hidden"
        >
          <div className="animate-marquee">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((phrase, idx) => (
              <span
                key={`${phrase}-${idx}`}
                className="font-display text-xs sm:text-sm font-extrabold tracking-widest mx-6 whitespace-nowrap inline-flex items-center gap-4"
              >
                <span>{phrase}</span>
                <Flame className="w-3.5 h-3.5 fill-[#101010]" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE BEST SELLERS (DEEP BLACK) */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 lg:py-24 bg-[#101010] border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold text-[#FF5A1F] tracking-[0.2em] mb-2">
                01. INTERACTIVE BEST SELLERS
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#FFFFFF]">
                Most Craved Across Cities
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  'All',
                  'Burgers',
                  'Pizzas',
                  'Chicken & Sides',
                  'Drinks & Desserts',
                ] as BestSellerFilter[]
              ).map((tab) => {
                const active = bestSellerFilter === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setBestSellerFilter(tab)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#FF5A1F] text-[#101010]'
                        : 'bg-[#191919] text-[#D9CBBF] border border-white/10 hover:text-[#FFFFFF]'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visibleBestSellers.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                onQuickView={setQuickViewItem}
              />
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => {
                setSelectedMenuCategory('All');
                onNavigate('/menu');
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#191919] border border-white/20 hover:border-[#FF5A1F] text-[#FFFFFF] text-sm font-bold transition-colors cursor-pointer"
            >
              <span>Explore All 30 Menu Items</span>
              <ArrowRight className="w-4 h-4 text-[#FF5A1F]" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* 3. INTERACTIVE 7-CHAPTER CATEGORY STAGE */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 lg:py-24 bg-[#141414] border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold text-[#FF5A1F] tracking-[0.2em] mb-2">
              02. SEVEN KITCHEN CHAPTERS
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#FFFFFF]">
              Explore Our Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 divide-y divide-white/10 border-y border-white/10">
              {CATEGORIES.map((cat, index) => {
                const isActive = index === activeCategoryIdx;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onMouseEnter={() => setActiveCategoryIdx(index)}
                    onClick={() => handleCategoryExplore(cat.name)}
                    className={`w-full py-4 px-4 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer ${
                      isActive ? 'bg-[#191919]' : 'hover:bg-[#161616]'
                    }`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`font-mono text-xs font-bold ${
                          isActive ? 'text-[#FF5A1F]' : 'text-[#D9CBBF]/50'
                        }`}
                      >
                        0{index + 1}
                      </span>
                      <div>
                        <span
                          className={`font-display text-xl sm:text-2xl font-extrabold block ${
                            isActive ? 'text-[#FFFFFF]' : 'text-[#D9CBBF]/85'
                          }`}
                        >
                          {cat.name}
                        </span>
                        <span className="text-xs text-[#D9CBBF]/65">{cat.tagline}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-xs text-[#FFCB45]">
                        {cat.itemCount} items
                      </span>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${
                          isActive
                            ? 'text-[#FF5A1F] translate-x-1'
                            : 'text-[#D9CBBF]/40'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-6 flex flex-col rounded-2xl overflow-hidden bg-[#191919] border border-white/10">
              <div className="relative flex-1 min-h-[320px] overflow-hidden">
                <FoodImage
                  src={activeCategory.image}
                  alt={activeCategory.name}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/25 to-transparent"
                />
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-[#FFCB45] mb-1">
                      CHAPTER 0{activeCategoryIdx + 1} · {activeCategory.itemCount} DISHES
                    </p>
                    <h3 className="font-display text-3xl font-extrabold text-[#FFFFFF]">
                      {activeCategory.name}
                    </h3>
                    <p className="text-sm text-[#D9CBBF] mt-1">{activeCategory.tagline}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCategoryExplore(activeCategory.name)}
                    className="px-5 py-3 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-extrabold text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Browse {activeCategory.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SHORT PROMO VIDEO REEL */}
      <KitchenFilmSection onNavigate={onNavigate} />

      {/* 4. SPECIAL DEAL PROMOTIONAL BANNER & DAILY SPECIAL FOOD SPOTLIGHT */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 lg:py-24 bg-[#101010] border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Bold Fiery Orange & Deep Black Deal Banner */}
          <div className="rounded-2xl overflow-hidden bg-[#191919] border border-[#FF5A1F]/40 grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-2xl">
            <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-5">
              <p className="font-mono text-xs font-extrabold tracking-widest text-[#FF5A1F]">
                SPECIAL DEAL · SAVE {familyFeastOffer.savingsPercent}%
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#FFFFFF] leading-tight">
                {familyFeastOffer.title}
              </h2>
              <p className="text-sm sm:text-base text-[#D9CBBF] max-w-xl leading-relaxed">
                {familyFeastOffer.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono tabular-nums text-3xl sm:text-4xl font-extrabold text-[#FFCB45]">
                    Rs. {familyFeastOffer.offerPrice.toLocaleString()}
                  </span>
                  <span className="font-mono tabular-nums text-sm line-through text-[#D9CBBF]/55">
                    Rs. {familyFeastOffer.originalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      addToCart(
                        {
                          id: familyFeastOffer.id,
                          name: familyFeastOffer.title,
                          price: familyFeastOffer.offerPrice,
                          image: familyFeastOffer.image,
                          category: familyFeastOffer.tag,
                        },
                        true
                      )
                    }
                    className="px-6 py-3.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-extrabold text-sm transition-colors cursor-pointer"
                  >
                    Order Feast Deal
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('/offers')}
                    className="px-6 py-3.5 rounded-lg border border-white/20 hover:border-[#FFCB45] text-[#FFFFFF] font-bold text-sm transition-colors cursor-pointer"
                  >
                    All Special Offers
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 min-h-[260px]">
              <FoodImage
                src={IMAGES.familyFeast}
                alt="CRAVEVERSE Family Feast Spread"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Daily Special Food Spotlight */}
          <div className="rounded-2xl bg-[#191919] border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 min-h-[260px]">
              <FoodImage
                src={spotlightBurger.image}
                alt={spotlightBurger.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FFCB45]">
                <Star className="w-4 h-4 fill-[#FFCB45]" aria-hidden="true" />
                <span>DAILY FOOD SPOTLIGHT · 612 VERIFIED REVIEWS</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#FFFFFF]">
                {spotlightBurger.name}
              </h3>
              <p className="text-sm sm:text-base text-[#D9CBBF] leading-relaxed">
                {spotlightBurger.description} Built with twin 260°C smashed patties, crisp
                dill pickles, and signature Crave glaze.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div>
                  <span className="block text-xs text-[#D9CBBF]/70">Chef Price</span>
                  <span className="font-mono tabular-nums text-2xl font-extrabold text-[#FFCB45]">
                    Rs. {spotlightBurger.price.toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleHeroOrderNow}
                  className="px-6 py-3.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-extrabold text-sm transition-colors cursor-pointer"
                >
                  Add Spotlight to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. WHY CHOOSE CRAVEVERSE & CUSTOMER TESTIMONIALS */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 lg:py-24 bg-[#141414] border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-bold text-[#FF5A1F] tracking-[0.2em] mb-2">
                03. KITCHEN DISCIPLINE
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#FFFFFF]">
                Why Choose CRAVEVERSE
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  num: '01',
                  icon: ChefHat,
                  title: '260°C Smash Craft',
                  desc: 'Never-frozen prime beef smashed fresh to order for crisp lacy edges.',
                },
                {
                  num: '02',
                  icon: ShieldCheck,
                  title: '100% Halal Certified',
                  desc: 'Traceable whole-muscle cuts, fresh greens, and zero artificial fillers.',
                },
                {
                  num: '03',
                  icon: Clock,
                  title: '28-Minute Dispatch',
                  desc: 'Vented thermal boxes lock in brioche toast and fry crunch.',
                },
                {
                  num: '04',
                  icon: Truck,
                  title: 'Free Delivery Rs. 2,000+',
                  desc: 'Zero delivery surcharge on family feasts and group combos.',
                },
              ].map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-6 rounded-xl bg-[#191919] border border-white/10 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="w-6 h-6 text-[#FF5A1F]" aria-hidden="true" />
                      <span className="font-mono text-xs font-bold text-[#D9CBBF]/50">
                        {pillar.num}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-extrabold text-[#FFFFFF]">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#D9CBBF]/80 leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer Testimonials */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-bold text-[#FFCB45] tracking-[0.2em] mb-2">
                  GUEST TESTIMONIALS
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#FFFFFF]">
                  Rated 4.9 Across Pakistan
                </h2>
              </div>
              <p className="text-sm text-[#D9CBBF]">12,400+ verified customer orders</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CUSTOMER_REVIEWS.map((review) => (
                <blockquote
                  key={review.id}
                  className="p-6 rounded-xl bg-[#191919] border border-white/10 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-[#FFCB45]">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-4 h-4 fill-[#FFCB45]"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-[#FFF4E8]/90 leading-relaxed">
                      “{review.comment}”
                    </p>
                  </div>

                  <footer className="pt-4 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <cite className="not-italic font-bold text-[#FFFFFF] block">
                        {review.name}
                      </cite>
                      <span className="text-[#D9CBBF]/75">
                        {review.role} · {review.city}
                      </span>
                    </div>
                    <span className="text-[#FFCB45] font-medium">{review.orderedItem}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 6. CRAVEVERSE LOYALTY CLUB & 7. NEWSLETTER (DEEP BLACK) */}
      <section className="py-16 lg:py-24 bg-[#101010]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* CRAVEVERSE Loyalty Club */}
          <div className="rounded-2xl bg-[#191919] border border-[#FFCB45]/30 p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFCB45]">
                <Award className="w-4 h-4" aria-hidden="true" />
                <span>CRAVEVERSE LOYALTY CLUB</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">
                Earn 10 Crave Points on Every Rs. 100
              </h2>
              <p className="text-sm sm:text-base text-[#D9CBBF] max-w-xl leading-relaxed">
                Every order automatically boosts your Crave Balance. Reach{' '}
                <strong className="font-mono text-[#FFCB45]">500 pts</strong> to unlock a
                complimentary Chocolate Overload Shake.
              </p>

              <div className="pt-2 max-w-md space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#FFFFFF]">{totalLoyaltyBalance} pts earned</span>
                  <span className="text-[#FFCB45]">500 pts Free Shake</span>
                </div>
                <div className="h-2.5 w-full bg-[#101010] rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-[#FF5A1F] transition-all duration-300"
                    style={{ width: `${loyaltyProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#101010] border border-white/10">
                <span className="block text-xs text-[#D9CBBF]/70 mb-1">Active Balance</span>
                <span className="font-mono tabular-nums text-3xl font-extrabold text-[#FFCB45]">
                  {totalLoyaltyBalance}
                </span>
                <span className="block text-[11px] text-[#D9CBBF]/65 mt-1">Crave Points</span>
              </div>
              <div className="p-5 rounded-xl bg-[#FF5A1F] text-[#101010]">
                <span className="block text-xs text-[#101010]/80 font-bold mb-1">
                  Club Rate
                </span>
                <span className="font-mono tabular-nums text-3xl font-extrabold">10%</span>
                <span className="block text-[11px] text-[#101010]/80 font-semibold mt-1">
                  Back in points
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="rounded-2xl bg-[#191919] border border-white/10 p-8 sm:p-12 text-center space-y-5">
            <p className="text-xs font-bold tracking-[0.2em] text-[#FF5A1F]">
              SECRET MENU DISPATCH
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#FFFFFF]">
              Join the CRAVEVERSE Insider List
            </h2>
            <p className="text-sm sm:text-base text-[#D9CBBF] max-w-xl mx-auto">
              Receive early access to limited-edition burger drops, BOGO invites, and
              late-night combo releases.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterEmail(e.target.value);
                  if (newsletterStatus !== 'idle') setNewsletterStatus('idle');
                }}
                placeholder="you@example.com"
                className="flex-1 px-4 py-3.5 rounded-lg bg-[#101010] border border-white/15 text-sm text-[#FFFFFF] placeholder:text-[#D9CBBF]/45 focus:outline-none focus:border-[#FF5A1F]"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-extrabold text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Subscribe
              </button>
            </form>

            {newsletterStatus === 'error' && (
              <p className="text-xs font-semibold text-[#FF5A1F]">
                Please enter a valid email address.
              </p>
            )}
            {newsletterStatus === 'success' && (
              <p className="inline-flex items-center gap-2 text-xs font-bold text-[#FFCB45]">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                Subscribed! Watch your inbox for Friday’s drop.
              </p>
            )}
          </div>
        </div>
      </section>

      <DishModal item={quickViewItem} onClose={() => setQuickViewItem(null)} />
    </div>
  );
}
