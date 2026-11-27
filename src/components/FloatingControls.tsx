import { ArrowUp, CheckCircle2, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { WhatsAppIcon } from './WhatsAppButton';

export function FloatingControls() {
  const { itemCount, total, openDrawer, toastMessage, dismissToast } = useCart();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 420);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Added-to-cart toast feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 right-4 sm:right-6 z-40 max-w-xs bg-[#181818] border border-[#FF5A1F]/40 text-[#FFF4E8] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3"
        >
          <CheckCircle2 className="w-4 h-4 text-[#FFCB45] shrink-0" aria-hidden="true" />
          <span className="text-xs sm:text-sm font-medium truncate">{toastMessage}</span>
          <button
            type="button"
            onClick={dismissToast}
            aria-label="Dismiss notification"
            className="text-[#D9CBBF]/70 hover:text-[#FFF4E8] shrink-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating WhatsApp CTA on bottom-left */}
      <a
        href="https://wa.me/923017344024"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp 0301 7344024"
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-30 h-11 px-4 rounded-full bg-gradient-to-r from-[#25D366] to-[#0D8A6F] hover:brightness-110 text-[#FFFFFF] font-bold text-xs sm:text-sm shadow-xl shadow-[#25D366]/20 flex items-center gap-2 transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
      >
        <WhatsAppIcon className="w-5 h-5 shrink-0" />
        <span className="hidden sm:inline whitespace-nowrap">WhatsApp: 0301 7344024</span>
        <span className="sm:hidden">WhatsApp</span>
      </a>

      {/* Compact bottom-right floating actions */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2.5">
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-11 h-11 rounded-xl bg-[#181818]/95 border border-white/15 hover:border-[#FF5A1F] text-[#FFF4E8] flex items-center justify-center shadow-lg transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F]"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={openDrawer}
          aria-label={`View shopping cart (${itemCount} items)`}
          className="h-11 px-4 rounded-xl bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-bold text-sm shadow-xl flex items-center gap-2.5 transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCB45]"
        >
          <ShoppingBag className="w-4 h-4" aria-hidden="true" />
          <span className="font-mono tabular-nums">
            {itemCount > 0 ? `${itemCount} · Rs. ${total.toLocaleString()}` : 'Cart (0)'}
          </span>
        </button>
      </div>
    </>
  );
}
