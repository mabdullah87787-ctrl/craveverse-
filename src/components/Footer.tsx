import { Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { RoutePath } from '../types';
import { CraveLogoMark } from './Navbar';
import { WhatsAppChatButton } from './WhatsAppButton';

interface FooterProps {
  onNavigate: (path: RoutePath) => void;
}

const FOOTER_LINKS: { label: string; path: RoutePath }[] = [
  { label: 'Home', path: '/' },
  { label: 'Our Menu (30 Items)', path: '/menu' },
  { label: 'Special Offers', path: '/offers' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact & Order', path: '/contact' },
];

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#090909] border-t border-white/10 text-[#D9CBBF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="inline-flex items-center gap-2.5 font-display text-2xl font-extrabold tracking-tight text-[#FFFFFF]"
            >
              <CraveLogoMark className="w-7 h-7" />
              <span>CRAVEVERSE</span>
            </a>
            <p className="text-xs font-bold text-[#FFCB45] tracking-wider">
              WHERE EVERY BITE BECOMES AN EXPERIENCE.
            </p>
            <p className="text-sm leading-relaxed text-[#D9CBBF]/80">
              Flame-seared smash burgers, 48-hour sourdough pizzas, and crisp buttermilk
              chicken crafted fresh to order across Lahore, Karachi, and Islamabad.
            </p>
            <p className="font-display text-sm font-extrabold tracking-widest text-[#FF5A1F] pt-1">
              CRAVE IT. LOVE IT. LIVE IT.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-display text-sm font-bold text-[#FFFFFF] mb-4">
              Explore CRAVEVERSE
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.path);
                    }}
                    className="hover:text-[#FF5A1F] transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kitchen Hours */}
          <div>
            <h3 className="font-display text-sm font-bold text-[#FFFFFF] mb-4">
              Kitchen Hours
            </h3>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-[#D9CBBF]/75">Mon – Thu</dt>
                <dd className="font-mono tabular-nums text-[#FFFFFF]">12:00 PM – 1:00 AM</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#D9CBBF]/75">Fri – Sun</dt>
                <dd className="font-mono tabular-nums text-[#FFFFFF]">12:00 PM – 3:00 AM</dd>
              </div>
              <div className="pt-2 text-xs text-[#FFCB45]">
                Free express delivery on orders above Rs. 2,000
              </div>
            </dl>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-display text-sm font-bold text-[#FFFFFF] mb-4">
              Flagship Kitchens
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" aria-hidden="true" />
                <span>MM Alam Road, Gulberg III, Lahore · Clifton Block 4, Karachi</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF5A1F] shrink-0" aria-hidden="true" />
                <a href="tel:+923017344024" className="font-mono tabular-nums hover:text-[#FFFFFF]">
                  0301 7344024
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF5A1F] shrink-0" aria-hidden="true" />
                <a href="mailto:hello@craveverse.pk" className="hover:text-[#FFFFFF]">
                  hello@craveverse.pk
                </a>
              </li>
            </ul>

            <div className="mt-5">
              <WhatsAppChatButton className="w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm" />
            </div>

            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="CRAVEVERSE on Instagram"
                className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-[#FFFFFF] hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="CRAVEVERSE on YouTube"
                className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-[#FFFFFF] hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D9CBBF]/60">
          <p>© {new Date().getFullYear()} CRAVEVERSE Culinary Group. All rights reserved.</p>
          <p>100% Zabiha Halal Certified · Fresh Daily Prep</p>
        </div>
      </div>
    </footer>
  );
}
