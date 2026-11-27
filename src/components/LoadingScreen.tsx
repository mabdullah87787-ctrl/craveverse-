import { motion } from 'motion/react';
import { CraveLogoMark } from './Navbar';

interface LoadingScreenProps {
  onDismiss: () => void;
}

export function LoadingScreen({ onDismiss }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 bg-[#101010] flex flex-col items-center justify-center px-6"
      role="status"
      aria-label="Loading CRAVEVERSE"
    >
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="w-12 h-12 rounded-xl bg-[#FF5A1F]/15 border border-[#FF5A1F]/40 flex items-center justify-center mb-5">
          <CraveLogoMark className="w-7 h-7" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#FFF4E8]">
          CRAVEVERSE
        </h1>
        <p className="mt-2 text-xs sm:text-sm font-medium tracking-widest text-[#FFCB45]">
          WHERE EVERY BITE BECOMES AN EXPERIENCE
        </p>

        {/* Progress track */}
        <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden mt-7">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left' }}
            className="h-full bg-[#FF5A1F]"
          />
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="mt-6 text-xs text-[#D9CBBF]/60 hover:text-[#FFF4E8] transition-colors cursor-pointer"
        >
          Enter Kitchen
        </button>
      </div>
    </motion.div>
  );
}
