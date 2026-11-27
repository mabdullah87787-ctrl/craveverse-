interface WhatsAppIconProps {
  className?: string;
}

export function WhatsAppIcon({ className = 'w-5 h-5' }: WhatsAppIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3C8.82 3 3 8.82 3 16c0 2.45.68 4.74 1.86 6.7L3.1 28.9l6.36-1.67A12.93 12.93 0 0016 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.62c-2.08 0-4.02-.59-5.67-1.6l-.41-.24-3.77.99 1.01-3.67-.27-.43A10.57 10.57 0 015.38 16c0-5.86 4.76-10.62 10.62-10.62S26.62 10.14 26.62 16 21.86 26.62 16 26.62zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.1-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65 0 1.56 1.14 3.07 1.3 3.28.16.21 2.24 3.42 5.42 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37z"
        fill="currentColor"
      />
    </svg>
  );
}

interface WhatsAppChatButtonProps {
  className?: string;
}

export function WhatsAppChatButton({ className = '' }: WhatsAppChatButtonProps) {
  return (
    <a
      href="https://wa.me/923017344024"
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#0D8A6F] hover:brightness-110 text-[#FFFFFF] font-bold text-sm shadow-lg shadow-[#25D366]/20 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] ${className}`}
    >
      <WhatsAppIcon className="w-5 h-5 shrink-0" />
      <span className="whitespace-nowrap">Chat on WhatsApp: 0301 7344024</span>
    </a>
  );
}
