import { ArrowUpDown, Flame, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DishModal } from '../components/DishModal';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS } from '../data/menuData';
import { MenuCategory, MenuItem } from '../types';

const FILTER_CATEGORIES: (MenuCategory | 'All')[] = [
  'All',
  'Burgers',
  'Pizzas',
  'Fried Chicken',
  'Fries & Sides',
  'Sandwiches',
  'Drinks',
  'Desserts',
];

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc';
type TagFilter = 'all' | 'Bestseller' | 'New';

export function MenuPage() {
  const { selectedMenuCategory, setSelectedMenuCategory } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [tagFilter, setTagFilter] = useState<TagFilter>('all');
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: MENU_ITEMS.length };
    for (const item of MENU_ITEMS) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, []);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = MENU_ITEMS.filter((item) => {
      const matchesCat =
        selectedMenuCategory === 'All' || item.category === selectedMenuCategory;
      const matchesTag = tagFilter === 'all' || item.badge === tagFilter;
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return matchesCat && matchesTag && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating-desc') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [selectedMenuCategory, tagFilter, searchQuery, sortBy]);

  return (
    <div className="bg-[#101010] min-h-screen">
      {/* Deep Black Architectural Header */}
      <section className="bg-[#101010] border-b border-white/10 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-bold text-[#FF5A1F] tracking-[0.2em]">
              7 KITCHEN CHAPTERS · 30 UNIQUE ITEMS
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#FFFFFF]">
              Our Signature Menu
            </h1>
            <p className="text-sm sm:text-base text-[#D9CBBF] leading-relaxed">
              Every single dish features its own bespoke recipe, transparent PKR pricing, and
              instant cart ordering.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#191919] border border-white/10 shrink-0 flex items-center gap-4">
            <div>
              <span className="block text-[11px] text-[#D9CBBF]/70">Total Catalog</span>
              <span className="font-mono tabular-nums text-2xl font-extrabold text-[#FFCB45]">
                {MENU_ITEMS.length} Dishes
              </span>
            </div>
            <div className="h-8 w-px bg-white/10" aria-hidden="true" />
            <div className="text-xs text-[#D9CBBF]">
              Free Delivery <strong className="text-[#FFFFFF] block">Rs. 2,000+</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Search, Bestseller/New Toggle & Price Sort Bar */}
        <div className="space-y-5 p-5 rounded-2xl bg-[#191919] border border-white/10">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="w-4 h-4 text-[#D9CBBF]/60 absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 30 dishes (e.g. Inferno, Tikka, Shake)..."
                aria-label="Search menu items"
                className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-[#101010] border border-white/15 text-sm text-[#FFFFFF] placeholder:text-[#D9CBBF]/45 focus:outline-none focus:border-[#FF5A1F]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D9CBBF]/60 hover:text-[#FFFFFF] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Bestseller / New Filter */}
              <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#101010] border border-white/10">
                {(
                  [
                    { id: 'all', label: 'All (30)' },
                    { id: 'Bestseller', label: 'Bestsellers' },
                    { id: 'New', label: 'New' },
                  ] as { id: TagFilter; label: string }[]
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTagFilter(opt.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      tagFilter === opt.id
                        ? 'bg-[#FFCB45] text-[#101010]'
                        : 'text-[#D9CBBF] hover:text-[#FFFFFF]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-[#FFCB45]" aria-hidden="true" />
                <label htmlFor="menu-sort" className="sr-only">
                  Sort dishes
                </label>
                <select
                  id="menu-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3.5 py-2.5 rounded-lg bg-[#101010] border border-white/15 text-xs sm:text-sm text-[#FFFFFF] focus:outline-none focus:border-[#FF5A1F] cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* 7 Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Menu Categories"
            className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10"
          >
            {FILTER_CATEGORIES.map((category) => {
              const isActive = selectedMenuCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setSelectedMenuCategory(category)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#FF5A1F] text-[#101010]'
                      : 'bg-[#101010] text-[#D9CBBF] border border-white/10 hover:border-white/25 hover:text-[#FFFFFF]'
                  }`}
                >
                  {category}{' '}
                  <span className="font-mono text-[11px] opacity-80">
                    ({categoryCounts[category] || 0})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Result Count & 30-Product Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-[#D9CBBF]/80">
            <p className="inline-flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#FF5A1F]" aria-hidden="true" />
              <span>
                Showing{' '}
                <strong className="font-mono text-[#FFFFFF]">{filteredItems.length}</strong> of{' '}
                <strong className="font-mono text-[#FFCB45]">{MENU_ITEMS.length}</strong>{' '}
                unique products
                {selectedMenuCategory !== 'All' ? ` in ${selectedMenuCategory}` : ''}
              </span>
            </p>
            {(selectedMenuCategory !== 'All' || tagFilter !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedMenuCategory('All');
                  setTagFilter('all');
                }}
                className="text-[#FF5A1F] hover:text-[#FFCB45] font-semibold cursor-pointer"
              >
                Show All 30 Items
              </button>
            )}
          </div>

          {filteredItems.length === 0 ? (
            <div className="py-16 px-6 rounded-2xl bg-[#191919] border border-white/10 text-center space-y-4">
              <p className="font-display text-xl font-bold text-[#FFFFFF]">
                No dishes matched “{searchQuery}”
              </p>
              <p className="text-sm text-[#D9CBBF]/80">
                Try clearing your search or switching back to all 30 items.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedMenuCategory('All');
                  setTagFilter('all');
                }}
                className="px-5 py-2.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-bold text-sm transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredItems.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  onQuickView={setQuickViewItem}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <DishModal item={quickViewItem} onClose={() => setQuickViewItem(null)} />
    </div>
  );
}
