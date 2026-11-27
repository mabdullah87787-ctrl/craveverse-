import { Check, Eye, Minus, Plus, Star } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MenuItem } from '../types';
import { FoodImage } from './FoodImage';

interface ProductCardProps {
  item: MenuItem;
  onQuickView?: (item: MenuItem) => void;
}

export function ProductCard({ item, onQuickView }: ProductCardProps) {
  const { items, addToCart, updateQuantity } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const cartItem = items.find((i) => i.id === item.id);

  const handleAdd = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <article className="group flex flex-col rounded-xl overflow-hidden bg-[#191919] border border-white/10 hover:border-[#FF5A1F]/60 transition-all duration-200 hover:-translate-y-0.5 shadow-lg">
      {/* Uniform 4:3 food photography */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#101010]">
        <FoodImage
          src={item.image}
          alt={item.name}
          fallbackLabel={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#101010]/85 via-transparent to-transparent"
        />

        {item.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded text-[11px] font-extrabold tracking-wide ${
              item.badge === 'Bestseller'
                ? 'bg-[#FFCB45] text-[#101010]'
                : item.badge === 'New'
                ? 'bg-[#FF5A1F] text-[#101010]'
                : 'bg-[#101010]/90 text-[#FFF4E8] border border-white/15'
            }`}
          >
            {item.badge}
          </span>
        )}

        {onQuickView && (
          <button
            type="button"
            onClick={() => onQuickView(item)}
            aria-label={`Quick view ${item.name}`}
            className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-[#101010]/85 border border-white/15 text-[#FFFFFF] opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity flex items-center justify-center hover:border-[#FFCB45] cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}

        {/* Bottom image metadata strip */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#FFF4E8]">
          <span className="font-medium text-[#FFF4E8]/90">
            {item.prepTime} · {item.calories}
          </span>
          <span className="inline-flex items-center gap-1 font-mono tabular-nums font-bold text-[#FFCB45]">
            <Star className="w-3.5 h-3.5 fill-[#FFCB45]" aria-hidden="true" />
            {item.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#FF5A1F] mb-1.5">
          {item.category}
        </p>

        <h3 className="font-display text-lg font-extrabold leading-snug text-[#FFFFFF] mb-2">
          {onQuickView ? (
            <button
              type="button"
              onClick={() => onQuickView(item)}
              className="text-left hover:text-[#FFCB45] transition-colors cursor-pointer"
            >
              {item.name}
            </button>
          ) : (
            item.name
          )}
        </h3>

        <p className="text-sm text-[#D9CBBF]/85 leading-relaxed line-clamp-2 mb-5 flex-1">
          {item.description}
        </p>

        {/* Bottom Price & Action */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div>
            <span className="block text-[11px] text-[#D9CBBF]/60">Price</span>
            <span className="font-mono tabular-nums text-lg font-extrabold text-[#FFCB45]">
              Rs. {item.price.toLocaleString()}
            </span>
          </div>

          {cartItem ? (
            <div className="inline-flex items-center gap-1 bg-[#101010] border border-[#FF5A1F] rounded-lg p-1">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
                aria-label={`Decrease quantity of ${item.name}`}
                className="w-8 h-8 rounded flex items-center justify-center text-[#FFFFFF] hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono tabular-nums text-sm font-bold text-[#FFFFFF] min-w-[1.75rem] text-center">
                {cartItem.quantity}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
                aria-label={`Increase quantity of ${item.name}`}
                className="w-8 h-8 rounded flex items-center justify-center bg-[#FF5A1F] text-[#101010] hover:bg-[#E84A10] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] text-sm font-extrabold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCB45]"
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
