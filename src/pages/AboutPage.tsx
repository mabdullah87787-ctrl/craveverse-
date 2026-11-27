import { ArrowRight, Award, Compass, Flame, Leaf, ShieldCheck, Target } from 'lucide-react';
import { useState } from 'react';
import { FoodImage } from '../components/FoodImage';
import { IMAGES } from '../data/menuData';
import { RoutePath } from '../types';

interface AboutPageProps {
  onNavigate: (path: RoutePath) => void;
}

const KITCHEN_STAGES = [
  {
    time: '07:00 AM',
    title: '48-Hour Dough & Brioche Bake',
    detail:
      'Our pastry deck pulls cold-fermented potato buns and blister-ready sourdough balls straight from stone ovens every dawn.',
  },
  {
    time: '10:30 AM',
    title: 'Daily Whole-Muscle Prime Grind',
    detail:
      '100% Zabiha Halal chuck and brisket cuts are ground fresh on-site—never frozen, never pre-pattied in central factories.',
  },
  {
    time: 'ON ORDER',
    title: '260°C Cast-Steel Smash',
    detail:
      'The moment your ticket prints, patties hit screaming-hot steel to create caramelized lacy edges while sealing natural juices.',
  },
  {
    time: 'UNDER 28M',
    title: 'Vented Thermal Dispatch',
    detail:
      'Custom perforated boxes vent steam so fries stay crisp and brioche never turns soggy on the ride to your doorstep.',
  },
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="bg-[#101010] min-h-screen">
      {/* Deep Black Editorial Story Hero */}
      <section className="py-14 lg:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-4xl space-y-4">
            <p className="text-xs font-bold text-[#FF5A1F] tracking-[0.2em]">
              OUR STORY & CULINARY PHILOSOPHY
            </p>
            <h1
              className="font-display font-extrabold tracking-tight text-[#FFFFFF] leading-[1.02]"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)' }}
            >
              NOT JUST FAST FOOD. IT’S A FLAVOR REVOLUTION.
            </h1>
            <p className="text-base sm:text-lg text-[#D9CBBF] max-w-2xl leading-relaxed">
              Born in Lahore with an obsession for open-flame precision, CRAVEVERSE reimagines
              everyday fast food using artisanal bakery doughs, fresh whole-muscle cuts, and
              house-crafted sauces made from scratch every morning.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#191919] shadow-2xl">
            <FoodImage
              src={IMAGES.openKitchen}
              alt="CRAVEVERSE chefs searing smash burgers on an open-flame flat-top grill"
              className="w-full aspect-[16/9] max-h-[540px] object-cover"
            />
          </div>

          {/* Quantitative Highlights */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { value: '45,000+', label: 'Monthly Orders Crafted' },
              { value: '28 min', label: 'Average Hot Dispatch' },
              { value: '100%', label: 'Never-Frozen Halal Beef' },
              { value: '30 Dishes', label: 'Handcrafted Menu Lineup' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-xl bg-[#191919] border border-white/10"
              >
                <span className="block font-mono tabular-nums text-2xl sm:text-3xl font-extrabold text-[#FFCB45]">
                  {stat.value}
                </span>
                <span className="block text-xs sm:text-sm text-[#D9CBBF] mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story, Mission & Vision */}
      <section className="py-16 lg:py-24 bg-[#141414] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-2xl bg-[#191919] border border-white/10 space-y-3">
            <Flame className="w-6 h-6 text-[#FF5A1F]" aria-hidden="true" />
            <h2 className="font-display text-2xl font-extrabold text-[#FFFFFF]">Our Story</h2>
            <p className="text-sm text-[#D9CBBF] leading-relaxed">
              Started as a late-night smash grill testing 42 bun recipes, CRAVEVERSE grew into
              a multi-city kitchen collective obsessed with craft speed and fearless flavor.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#191919] border border-white/10 space-y-3">
            <Target className="w-6 h-6 text-[#FFCB45]" aria-hidden="true" />
            <h2 className="font-display text-2xl font-extrabold text-[#FFFFFF]">Our Mission</h2>
            <p className="text-sm text-[#D9CBBF] leading-relaxed">
              Serve restaurant-grade smash burgers, sourdough pizzas, and buttermilk chicken
              in under 30 minutes without touching frozen patties or shortcuts.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#191919] border border-white/10 space-y-3">
            <Compass className="w-6 h-6 text-[#FF5A1F]" aria-hidden="true" />
            <h2 className="font-display text-2xl font-extrabold text-[#FFFFFF]">Our Vision</h2>
            <p className="text-sm text-[#D9CBBF] leading-relaxed">
              Redefine South Asian quick-service dining as an international culinary benchmark
              where quality, transparency, and design lead every bite.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive 4-Stage Kitchen Craft Timeline & Quality Standards */}
      <section className="py-16 lg:py-24 bg-[#101010] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-bold text-[#FFCB45] tracking-[0.2em]">
              COOKING PHILOSOPHY & FOOD QUALITY
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#FFFFFF]">
              Inside a Day at CRAVEVERSE
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 space-y-3">
              {KITCHEN_STAGES.map((stage, idx) => {
                const isSelected = idx === activeStage;
                return (
                  <button
                    key={stage.time}
                    type="button"
                    onClick={() => setActiveStage(idx)}
                    className={`w-full text-left p-5 rounded-xl border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#FF5A1F] text-[#101010] border-[#FF5A1F]'
                        : 'bg-[#191919] text-[#FFFFFF] border-white/10 hover:border-white/25'
                    }`}
                  >
                    <span
                      className={`block font-mono text-xs font-bold mb-1 ${
                        isSelected ? 'text-[#101010]/80' : 'text-[#FFCB45]'
                      }`}
                    >
                      {stage.time}
                    </span>
                    <span className="font-display text-lg font-extrabold block">
                      {stage.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 rounded-2xl bg-[#191919] border border-white/10 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="font-mono text-sm font-bold text-[#FFCB45]">
                  STAGE 0{activeStage + 1} · {KITCHEN_STAGES[activeStage].time}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">
                  {KITCHEN_STAGES[activeStage].title}
                </h3>
                <p className="text-base text-[#D9CBBF] leading-relaxed">
                  {KITCHEN_STAGES[activeStage].detail}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-[#FF5A1F] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display text-sm font-bold text-[#FFFFFF]">
                      Fresh Ingredients Daily
                    </h4>
                    <p className="text-xs text-[#D9CBBF]/80 mt-0.5">
                      Hydroponic greens, vine tomatoes, and fresh herbs delivered at dawn.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#FF5A1F] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display text-sm font-bold text-[#FFFFFF]">
                      Food Quality Audits
                    </h4>
                    <p className="text-xs text-[#D9CBBF]/80 mt-0.5">
                      100% Zabiha Halal sourcing and batch-checked fry oil every 4 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Customers Love Us CTA */}
      <section className="py-16 lg:py-20 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#191919] border border-[#FF5A1F]/40 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#FFCB45]">
                <Award className="w-4 h-4" aria-hidden="true" />
                <span>WHY CUSTOMERS LOVE CRAVEVERSE</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#FFFFFF]">
                Consistent Heat, Crisp Crunch & Zero Compromises
              </h2>
              <p className="text-sm sm:text-base text-[#D9CBBF] max-w-2xl">
                Explore all 30 handcrafted menu dishes or unlock savings on today’s combo
                bundles.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
              <button
                type="button"
                onClick={() => onNavigate('/menu')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-extrabold text-sm transition-colors cursor-pointer"
              >
                <span>Explore 30 Dishes</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/offers')}
                className="px-6 py-3.5 rounded-lg border border-white/20 hover:border-[#FFCB45] text-[#FFFFFF] font-bold text-sm transition-colors cursor-pointer"
              >
                View Offers
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
