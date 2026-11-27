import { UtensilsCrossed } from 'lucide-react';
import { useState } from 'react';

interface FoodImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function resolveAssetUrl(path: string): string {
  if (!path) return path;
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}

export function FoodImage({ src, alt, className = '', fallbackLabel }: FoodImageProps) {
  const [hasError, setHasError] = useState(false);
  const resolvedSrc = resolveAssetUrl(src);

  if (hasError || !resolvedSrc) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#1D1D1D] via-[#141414] to-[#261914] text-[#D9CBBF] p-4 ${className}`}
        role="img"
        aria-label={alt}
      >
        <UtensilsCrossed className="w-7 h-7 text-[#FF5A1F] mb-2" aria-hidden="true" />
        <span className="text-xs font-medium text-center text-[#FFF4E8]/80 max-w-[180px] truncate">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
