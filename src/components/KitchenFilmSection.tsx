import { Film, Pause, Play, RotateCcw } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { IMAGES } from '../data/menuData';
import { RoutePath } from '../types';
import { resolveAssetUrl } from './FoodImage';

interface KitchenFilmSectionProps {
  onNavigate: (path: RoutePath) => void;
}

const FILM_CHAPTERS = [
  {
    id: 'smash',
    code: '01',
    label: '260°C Smash Craft',
    caption: 'Never-frozen chuck & brisket smashed fresh for lacy caramelized edges.',
    startTime: 0,
  },
  {
    id: 'kitchen',
    code: '02',
    label: 'Open-Flame Kitchen',
    caption: 'Live fire grill stations firing every ticket strictly to order.',
    startTime: 2.8,
  },
  {
    id: 'pizza',
    code: '03',
    label: '48h Sourdough Fire',
    caption: 'Wood-fired crusts blistered in high-heat stone decks.',
    startTime: 5.5,
  },
  {
    id: 'wings',
    code: '04',
    label: 'Buttermilk Crunch',
    caption: '24-hour marinated chicken glazed in cayenne honey chili oil.',
    startTime: 8.2,
  },
  {
    id: 'feast',
    code: '05',
    label: 'Grand Feast Drop',
    caption: 'Hot thermal dispatch across Lahore, Karachi & Islamabad in 28 mins.',
    startTime: 10.9,
  },
];

function formatClock(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function KitchenFilmSection({ onNavigate }: KitchenFilmSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(14);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    const tryAutoplay = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };
    void tryAutoplay();
  }, [prefersReducedMotion]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play();
    setIsPlaying(true);
  };

  const handleJumpChapter = (startTime: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = startTime;
    setCurrentTime(startTime);
    if (video.paused) {
      void video.play();
      setIsPlaying(true);
    }
  };

  const activeChapterIndex = FILM_CHAPTERS.reduce((bestIdx, chapter, idx) => {
    return currentTime >= chapter.startTime ? idx : bestIdx;
  }, 0);
  const activeChapter = FILM_CHAPTERS[activeChapterIndex];
  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="py-16 lg:py-24 bg-[#101010] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold text-[#FF5A1F] tracking-[0.2em] mb-2">
              <Film className="w-3.5 h-3.5" aria-hidden="true" />
              <span>INSIDE THE CRAVEVERSE KITCHEN</span>
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#FFFFFF]">
              Crafted Over Live Fire
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#D9CBBF] max-w-md leading-relaxed">
            A quick 14-second look inside our kitchen — from 260°C smash crust to
            blistered sourdough and buttermilk crunch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* 16:9 Cinema Video Frame */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden bg-[#191919] border border-white/15 shadow-2xl flex flex-col">
            <div className="relative aspect-video bg-[#0B0B0B] overflow-hidden">
              <video
                ref={videoRef}
                src={resolveAssetUrl('/videos/craveverse-film.mp4')}
                poster={resolveAssetUrl(IMAGES.openKitchen)}
                muted
                loop
                playsInline
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => {
                  if (Number.isFinite(e.currentTarget.duration) && e.currentTarget.duration > 0) {
                    setDuration(e.currentTarget.duration);
                  }
                }}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer"
                aria-label="CRAVEVERSE 14-second kitchen and food reel"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101010]/90 via-transparent to-[#101010]/30"
              />

              {/* Top Overlay Brand Stamp */}
              <div className="pointer-events-none absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1.5 rounded-lg bg-[#101010]/85 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold text-[#FFCB45]">
                  CRAVEVERSE REEL · {activeChapter.code}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#101010]/85 backdrop-blur-md border border-white/15 font-mono tabular-nums text-[11px] text-[#FFF4E8]">
                  {formatClock(currentTime)} / {formatClock(duration)}
                </span>
              </div>

              {/* Center Play Overlay when Paused */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Play CRAVEVERSE kitchen video"
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] flex items-center justify-center shadow-2xl transition-transform hover:scale-105 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCB45]"
                >
                  <Play className="w-7 h-7 fill-[#101010] ml-0.5" aria-hidden="true" />
                </button>
              )}

              {/* Bottom Caption & Progress */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 space-y-3">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-lg sm:text-xl font-extrabold text-[#FFFFFF]">
                      {activeChapter.label}
                    </p>
                    <p className="text-xs sm:text-sm text-[#D9CBBF]">
                      {activeChapter.caption}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      className="w-9 h-9 rounded-lg bg-[#101010]/90 border border-white/20 hover:border-[#FF5A1F] text-[#FFFFFF] flex items-center justify-center transition-colors cursor-pointer"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" aria-hidden="true" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleRestart}
                      aria-label="Restart video"
                      className="w-9 h-9 rounded-lg bg-[#101010]/90 border border-white/20 hover:border-[#FFCB45] text-[#FFFFFF] flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Playback Scrubber Track */}
                <div className="h-1.5 w-full rounded-full bg-white/15 overflow-hidden">
                  <div
                    className="h-full bg-[#FF5A1F] transition-all duration-150"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Chapter Index */}
          <div className="lg:col-span-4 rounded-2xl bg-[#191919] border border-white/10 p-5 sm:p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs font-bold text-[#FFCB45] tracking-wider">
                  REEL CHAPTERS
                </span>
                <span className="font-mono text-xs text-[#D9CBBF]/65">
                  CLICK TO JUMP
                </span>
              </div>

              <div className="space-y-2">
                {FILM_CHAPTERS.map((chapter, idx) => {
                  const isActive = idx === activeChapterIndex;
                  return (
                    <button
                      key={chapter.id}
                      type="button"
                      onClick={() => handleJumpChapter(chapter.startTime)}
                      className={`w-full text-left p-3 rounded-xl border transition-colors cursor-pointer flex items-start gap-3 ${
                        isActive
                          ? 'bg-[#101010] border-[#FF5A1F]'
                          : 'bg-[#141414] border-white/5 hover:border-white/20'
                      }`}
                    >
                      <span
                        className={`font-mono text-xs font-extrabold pt-0.5 ${
                          isActive ? 'text-[#FF5A1F]' : 'text-[#D9CBBF]/50'
                        }`}
                      >
                        {chapter.code}
                      </span>
                      <div className="min-w-0 flex-1">
                        <span
                          className={`block font-display text-sm font-bold ${
                            isActive ? 'text-[#FFFFFF]' : 'text-[#D9CBBF]'
                          }`}
                        >
                          {chapter.label}
                        </span>
                        <span className="block text-xs text-[#D9CBBF]/65 line-clamp-1 mt-0.5">
                          {chapter.caption}
                        </span>
                      </div>
                      <span className="font-mono tabular-nums text-[11px] text-[#FFCB45] shrink-0">
                        {formatClock(chapter.startTime)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('/menu')}
              className="w-full py-3.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-extrabold text-sm transition-colors cursor-pointer"
            >
              Order Featured Dishes
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
