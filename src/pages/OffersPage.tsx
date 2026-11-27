import { Check, Clock, Plus, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FoodImage } from '../components/FoodImage';
import { useCart } from '../context/CartContext';
import { SPECIAL_OFFERS } from '../data/menuData';
import { SpecialOffer } from '../types';

function getRotationSeconds(): number {
  const now = new Date();
  const cycleEnd = new Date(now);
  cycleEnd.setHours(24, 0, 0, 0);
  return Math.max(0, Math.floor((cycleEnd.getTime() - now.getTime()) / 1000));
}

export function OffersPage() {
  const { addToCart } = useCart();
  const [secondsLeft, setSecondsLeft] = useState<number>(getRotationSeconds);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsLeft(getRotationSeconds());
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  const handleOrderOffer = (offer: SpecialOffer) => {
    addToCart(
      {
        id: offer.id,
        name: offer.title,
        price: offer.offerPrice,
        image: offer.image,
        category: offer.tag,
      },
      true
    );
  };

  return (
    <div className="bg-[#101010] min-h-screen">
      {/* Deep Black & Fiery Orange Promotional Header */}
      <section className="bg-[#101010] border-b border-white/10 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-bold text-[#FF5A1F] tracking-[0.2em]">
              BOGO · FAMILY FEASTS · STUDENT COMBOS
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#FFFFFF]">
              Special Offers & Combos
            </h1>
            <p className="text-sm sm:text-base text-[#D9CBBF] leading-relaxed">
              Curated promotional bundles built for solo cravings, campus nights, and full
              group feasts. Click Order Now to add any combo straight to your bag.
            </p>
          </div>

          <div className="shrink-0 p-6 rounded-2xl bg-[#191919] border border-[#FF5A1F]/40 space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-xs text-[#FFCB45] font-bold">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>Daily Promotional Cycle</span>
            </div>
            <div className="flex items-center gap-2 font-mono tabular-nums text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">
              <span className="px-3 py-1.5 rounded bg-[#101010] border border-white/10">
                {hours}h
              </span>
              <span className="text-[#FF5A1F]">:</span>
              <span className="px-3 py-1.5 rounded bg-[#101010] border border-white/10">
                {minutes}m
              </span>
              <span className="text-[#FF5A1F]">:</span>
              <span className="px-3 py-1.5 rounded bg-[#101010] border border-white/10">
                {seconds}s
              </span>
            </div>
            <p className="text-[11px] text-[#D9CBBF]/65">
              Preview showcase timer · Deals rotate daily
            </p>
          </div>
        </div>
      </section>

      {/* Bold Orange & Deep Charcoal Promotional Banner Strip */}
      <div className="bg-[#FF5A1F] text-[#101010] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm font-extrabold tracking-wide">
          <span>FREE EXPRESS DELIVERY ON ALL ORDERS ABOVE RS. 2,000</span>
          <span className="font-mono">6 ACTIVE PROMO BUNDLES</span>
        </div>
      </div>

      {/* 6 Special Offer Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SPECIAL_OFFERS.map((offer, index) => (
            <article
              key={offer.id}
              className={`flex flex-col sm:flex-row rounded-2xl overflow-hidden border transition-transform duration-200 hover:-translate-y-0.5 ${
                offer.featured
                  ? 'bg-[#191919] border-[#FF5A1F]/60'
                  : 'bg-[#191919] border-white/10 hover:border-[#FF5A1F]/40'
              }`}
            >
              <div className="sm:w-5/12 relative aspect-[4/3] sm:aspect-auto bg-[#101010]">
                <FoodImage
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#101010]/75 via-transparent to-transparent"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#FFCB45] text-[#101010] text-xs font-extrabold">
                  Save {offer.savingsPercent}%
                </span>
                <span className="absolute bottom-3 left-3 font-mono text-xs font-bold text-[#FFF4E8]/90">
                  OFFER 0{index + 1}
                </span>
              </div>

              <div className="sm:w-7/12 p-6 sm:p-7 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#FF5A1F]">
                    <Tag className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{offer.tag}</span>
                  </div>
                  <h2 className="font-display text-2xl font-extrabold text-[#FFFFFF] leading-snug">
                    {offer.title}
                  </h2>
                  <p className="text-xs text-[#D9CBBF]/85 leading-relaxed">
                    {offer.description}
                  </p>

                  <ul className="space-y-1.5 pt-1">
                    {offer.itemsIncluded.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-2 text-xs text-[#FFF4E8]/90"
                      >
                        <Check className="w-3.5 h-3.5 text-[#FFCB45] shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="block font-mono tabular-nums text-xs line-through text-[#D9CBBF]/55">
                      Rs. {offer.originalPrice.toLocaleString()}
                    </span>
                    <span className="font-mono tabular-nums text-2xl font-extrabold text-[#FFCB45]">
                      Rs. {offer.offerPrice.toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOrderOffer(offer)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-extrabold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                    <span>Order Now</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
