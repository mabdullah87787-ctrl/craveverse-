import { UtensilsCrossed } from 'lucide-react';
import { useState } from 'react';

interface FoodImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function FoodImage({ src, alt, className = '', fallbackLabel }: FoodImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
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
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
