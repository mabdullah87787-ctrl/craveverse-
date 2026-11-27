import { Clock, Flame, Minus, Plus, Star, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MenuItem } from '../types';
import { FoodImage } from './FoodImage';

interface DishModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export function DishModal({ item, onClose }: DishModalProps) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!item) return null;

  const handleAddMultiple = () => {
    for (let i = 0; i < qty; i += 1) {
      addToCart(
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
        },
        i === qty - 1
      );
    }
    setQty(1);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl bg-[#141414] border border-white/15 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dish details"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-lg bg-[#101010]/85 border border-white/15 text-[#FFF4E8] hover:border-[#FF5A1F] flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="md:col-span-6 aspect-[4/3] md:aspect-auto bg-[#101010]">
          <FoodImage
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-[#FFCB45] font-semibold">
              <span>{item.category}</span>
              {item.badge && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{item.badge}</span>
                </>
              )}
            </div>

            <h2 className="font-display text-2xl font-extrabold text-[#FFF4E8]">
              {item.name}
            </h2>

            <p className="text-sm text-[#D9CBBF] leading-relaxed">{item.description}</p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#D9CBBF]/85">
              <span className="inline-flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#FFCB45] fill-[#FFCB45]" />
                <strong className="font-mono text-[#FFF4E8]">{item.rating.toFixed(1)}</strong>{' '}
                ({item.reviewsCount})
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF5A1F]" />
                {item.prepTime}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#FF5A1F]" />
                {item.calories}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-[11px] text-[#D9CBBF]/70">Total</span>
                <span className="font-mono tabular-nums text-2xl font-extrabold text-[#FFCB45]">
                  Rs. {(item.price * qty).toLocaleString()}
                </span>
              </div>

              <div className="inline-flex items-center gap-1 bg-[#1E1E1E] border border-white/15 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-8 h-8 rounded flex items-center justify-center text-[#FFF4E8] hover:bg-white/10 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono tabular-nums text-sm font-bold min-w-[2rem] text-center">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-8 h-8 rounded flex items-center justify-center text-[#FFF4E8] hover:bg-white/10 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddMultiple}
              className="w-full py-3 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-bold text-sm transition-colors cursor-pointer"
            >
              Add {qty} to Bag · Rs. {(item.price * qty).toLocaleString()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
