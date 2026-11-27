import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { RoutePath } from '../types';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: RoutePath) => void;
}

const NAV_LINKS: { label: string; path: RoutePath }[] = [
  { label: 'Home', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'Offers', path: '/offers' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export function CraveLogoMark({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="9" fill="#FF5A1F" />
      {/* Crown brioche bun + flame arc */}
      <path
        d="M9.5 16.5C9.5 11.8 13.3 8.5 18 8.5C22.7 8.5 26.5 11.8 26.5 16.5H9.5Z"
        fill="#101010"
      />
      {/* Melted golden cheese wave */}
      <path
        d="M8.5 19H27.5L24.5 22L21 19.8L18 22.5L15 19.8L11.5 22L8.5 19Z"
        fill="#FFCB45"
      />
      {/* Seared smash patty + bottom bun */}
      <rect x="9.5" y="23.5" width="17" height="3.2" rx="1.6" fill="#101010" />
    </svg>
  );
}

export function Navbar({ currentPath, onNavigate }: NavbarProps) {
  const { itemCount, openDrawer } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (path: RoutePath) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#101010]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Custom SVG burger icon + wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/');
          }}
          className="inline-flex items-center gap-2.5 font-display text-xl sm:text-2xl font-extrabold tracking-tight text-[#FFFFFF] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F] rounded"
        >
          <CraveLogoMark className="w-7 h-7 shrink-0" />
          <span>CRAVEVERSE</span>
        </a>

        {/* Zone 2: Exactly 5 concise single-line navigation links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.path);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F] rounded ${
                  isActive
                    ? 'text-[#FFFFFF]'
                    : 'text-[#D9CBBF] hover:text-[#FFFFFF]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#FF5A1F] rounded-full"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Open shopping bag, ${itemCount} items`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] text-sm font-extrabold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCB45]"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span>Bag</span>
            <span className="font-mono tabular-nums text-xs bg-[#101010] text-[#FFFFFF] px-1.5 py-0.5 rounded">
              {itemCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 text-[#FFFFFF] hover:border-[#FF5A1F] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-white/10 bg-[#191919] px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.path);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#FF5A1F]/15 text-[#FF5A1F]'
                    : 'text-[#FFF4E8] hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="text-xs font-mono">Current</span>}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}
