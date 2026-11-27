import { ArrowLeft, UtensilsCrossed } from 'lucide-react';
import { RoutePath } from '../types';

interface NotFoundPageProps {
  onNavigate: (path: RoutePath) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="bg-[#101010] min-h-[75vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#181818] border border-white/10 flex items-center justify-center mx-auto">
          <UtensilsCrossed className="w-7 h-7 text-[#FF5A1F]" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <p className="font-mono text-sm font-bold text-[#FFCB45]">ERROR 404</p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#FFF4E8]">
            This Dish Isn’t on the Menu
          </h1>
          <p className="text-sm text-[#D9CBBF] leading-relaxed">
            The page you’re looking for doesn’t exist or may have moved. Head back to our
            kitchen to explore fresh smash burgers and deals.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-bold text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Home</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/menu')}
            className="px-5 py-3 rounded-lg border border-white/20 hover:border-[#FFCB45] text-[#FFF4E8] font-bold text-sm transition-colors cursor-pointer"
          >
            Browse Menu
          </button>
        </div>
      </div>
    </div>
  );
}
