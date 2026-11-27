import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { FloatingControls } from './components/FloatingControls';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { CartProvider } from './context/CartContext';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OffersPage } from './pages/OffersPage';
import { RoutePath } from './types';

const VALID_ROUTES: RoutePath[] = ['/', '/menu', '/offers', '/about', '/contact'];

function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePath(window.location.pathname)
  );
  const [showLoader, setShowLoader] = useState<boolean>(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !prefersReduced;
  });

  useEffect(() => {
    if (!showLoader) return;
    const timer = window.setTimeout(() => {
      setShowLoader(false);
    }, 850);
    return () => window.clearTimeout(timer);
  }, [showLoader]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((path: RoutePath) => {
    const normalized = normalizePath(path);
    if (normalized !== currentPath) {
      window.history.pushState({}, '', normalized);
      setCurrentPath(normalized);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  const isKnownRoute = VALID_ROUTES.includes(currentPath as RoutePath);

  const renderPage = () => {
    if (!isKnownRoute) {
      return <NotFoundPage onNavigate={navigate} />;
    }
    switch (currentPath as RoutePath) {
      case '/':
        return <HomePage onNavigate={navigate} />;
      case '/menu':
        return <MenuPage />;
      case '/offers':
        return <OffersPage />;
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/contact':
        return <ContactPage />;
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <AnimatePresence>
          {showLoader && <LoadingScreen onDismiss={() => setShowLoader(false)} />}
        </AnimatePresence>

        <div className="min-h-screen flex flex-col bg-[#101010] text-[#FFF4E8]">
          <Navbar currentPath={currentPath} onNavigate={navigate} />

          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPath}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer onNavigate={navigate} />
          <CartDrawer onNavigate={navigate} />
          <FloatingControls />
        </div>
      </CartProvider>
    </MotionConfig>
  );
}
