import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import React, { useState } from 'react';
import { WhatsAppChatButton } from '../components/WhatsAppButton';
import { useCart } from '../context/CartContext';

interface SubmittedRequest {
  reference: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

const BRANCHES = [
  {
    city: 'Lahore',
    branch: 'Gulberg III Flagship',
    address: '48-B MM Alam Road, Gulberg III, Lahore',
    dispatchTime: '24–28 mins',
    zones: 'Gulberg, DHA Phases 1–6, Model Town, Johar Town',
    hotline: '0301 7344024',
  },
  {
    city: 'Karachi',
    branch: 'Clifton Block 4 Kitchen',
    address: 'Plot 14 Marine Drive, Clifton Block 4, Karachi',
    dispatchTime: '26–32 mins',
    zones: 'Clifton, DHA Phases 1–8, PECHS, Bahadurabad',
    hotline: '0301 7344024',
  },
  {
    city: 'Islamabad',
    branch: 'F-7 Markaz Hub',
    address: 'Jinnah Super Market, Sector F-7, Islamabad',
    dispatchTime: '22–28 mins',
    zones: 'F-6, F-7, F-8, F-10, Blue Area, G-6',
    hotline: '0301 7344024',
  },
];

export function ContactPage() {
  const { items, total, openDrawer } = useCart();

  const [selectedCityIdx, setSelectedCityIdx] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<SubmittedRequest | null>(null);

  const activeBranch = BRANCHES[selectedCityIdx];

  const validate = () => {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) {
      next.name = 'Please enter your full name.';
    }
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!/^(\+92|0)?3\d{9}$/.test(cleanPhone) && cleanPhone.length < 10) {
      next.phone = 'Enter a valid phone number (e.g. 0300 1234567).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (address.trim().length < 8) {
      next.address = 'Please enter your complete delivery street address.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const refCode = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmitted({
      reference: refCode,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      notes: notes.trim(),
    });
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setNotes('');
    setErrors({});
  };

  return (
    <div className="bg-[#101010] min-h-screen">
      {/* Deep Black Header */}
      <section className="bg-[#101010] py-12 lg:py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <p className="text-xs font-bold text-[#FF5A1F] tracking-[0.2em]">
            DIRECT DISPATCH & BRANCH HUBS
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#FFFFFF]">
            Contact & Order
          </h1>
          <p className="text-sm sm:text-base text-[#D9CBBF] max-w-2xl leading-relaxed">
            Submit custom group orders, delivery requests, or check coverage across our
            Lahore, Karachi, and Islamabad kitchens.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
        {items.length > 0 && (
          <div className="p-5 rounded-xl bg-[#191919] border border-[#FFCB45]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#FFCB45] shrink-0" aria-hidden="true" />
              <p className="text-sm text-[#FFFFFF]">
                You currently have{' '}
                <strong className="font-mono text-[#FFCB45]">
                  {items.reduce((s, i) => s + i.quantity, 0)} items (Rs.{' '}
                  {total.toLocaleString()})
                </strong>{' '}
                ready in your Crave Bag.
              </p>
            </div>
            <button
              type="button"
              onClick={openDrawer}
              className="px-5 py-2.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-extrabold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Open Bag & Checkout
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact & Order Form */}
          <div className="lg:col-span-7 rounded-2xl bg-[#191919] border border-white/10 p-6 sm:p-8">
            {submitted ? (
              <div className="py-8 text-center space-y-5">
                <CheckCircle2
                  className="w-12 h-12 text-[#FFCB45] mx-auto"
                  aria-hidden="true"
                />
                <p className="font-mono text-xs text-[#FFCB45]">
                  DEMO REFERENCE #{submitted.reference}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">
                  Request Submitted, {submitted.name}!
                </h2>
                <p className="text-sm text-[#D9CBBF] max-w-md mx-auto leading-relaxed">
                  Demo confirmation generated for{' '}
                  <span className="font-mono text-[#FFFFFF]">{submitted.phone}</span> and{' '}
                  <span className="text-[#FFFFFF]">{submitted.email}</span>.
                </p>

                <div className="max-w-md mx-auto text-left p-4 rounded-xl bg-[#101010] border border-white/10 text-xs space-y-1.5 text-[#D9CBBF]">
                  <p>
                    <strong className="text-[#FFFFFF]">Address:</strong> {submitted.address}
                  </p>
                  {submitted.notes && (
                    <p>
                      <strong className="text-[#FFFFFF]">Order Notes:</strong> {submitted.notes}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(null)}
                  className="px-6 py-3 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-extrabold text-sm transition-colors cursor-pointer"
                >
                  Send Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <h2 className="font-display text-2xl font-bold text-[#FFFFFF]">
                    Customer & Delivery Details
                  </h2>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#D9CBBF]/80">
                    <ShieldCheck className="w-4 h-4 text-[#FF5A1F]" aria-hidden="true" />
                    Demo Form
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#D9CBBF] mb-1.5"
                    >
                      Customer Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Bilal Ahmed"
                      className="w-full px-4 py-3 rounded-lg bg-[#101010] border border-white/15 text-sm text-[#FFFFFF] placeholder:text-[#D9CBBF]/40 focus:outline-none focus:border-[#FF5A1F]"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-[#FF5A1F]">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-[#D9CBBF] mb-1.5"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full px-4 py-3 rounded-lg bg-[#101010] border border-white/15 text-sm font-mono text-[#FFFFFF] placeholder:text-[#D9CBBF]/40 focus:outline-none focus:border-[#FF5A1F]"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-[#FF5A1F]">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-[#D9CBBF] mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-[#101010] border border-white/15 text-sm text-[#FFFFFF] placeholder:text-[#D9CBBF]/40 focus:outline-none focus:border-[#FF5A1F]"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-[#FF5A1F]">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-address"
                    className="block text-xs font-semibold text-[#D9CBBF] mb-1.5"
                  >
                    Complete Delivery Address *
                  </label>
                  <textarea
                    id="contact-address"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House / Office #, Street, Sector / Phase, City"
                    className="w-full px-4 py-3 rounded-lg bg-[#101010] border border-white/15 text-sm text-[#FFFFFF] placeholder:text-[#D9CBBF]/40 focus:outline-none focus:border-[#FF5A1F]"
                  />
                  {errors.address && (
                    <p className="mt-1.5 text-xs text-[#FF5A1F]">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-notes"
                    className="block text-xs font-semibold text-[#D9CBBF] mb-1.5"
                  >
                    Order Notes / Custom Instructions
                  </label>
                  <textarea
                    id="contact-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Mention preferred burgers, spice level, event headcount, or delivery gate instructions..."
                    className="w-full px-4 py-3 rounded-lg bg-[#101010] border border-white/15 text-sm text-[#FFFFFF] placeholder:text-[#D9CBBF]/40 focus:outline-none focus:border-[#FF5A1F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-extrabold text-sm transition-colors cursor-pointer"
                >
                  Submit Order & Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Interactive 3-City Branch Selector + Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-[#191919] border border-white/10 p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-[#FF5A1F]" aria-hidden="true" />
                <h2 className="font-display text-xl font-bold text-[#FFFFFF]">
                  Flagship Kitchen Locations
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {BRANCHES.map((branch, idx) => (
                  <button
                    key={branch.city}
                    type="button"
                    onClick={() => setSelectedCityIdx(idx)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      idx === selectedCityIdx
                        ? 'bg-[#FF5A1F] text-[#101010]'
                        : 'bg-[#101010] text-[#D9CBBF] border border-white/10 hover:border-white/25'
                    }`}
                  >
                    {branch.city}
                  </button>
                ))}
              </div>

              <div className="p-5 rounded-xl bg-[#101010] border border-white/10 space-y-3">
                <h3 className="font-display text-lg font-extrabold text-[#FFFFFF]">
                  {activeBranch.branch}
                </h3>
                <p className="text-xs text-[#D9CBBF]">{activeBranch.address}</p>
                <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between gap-2">
                    <span className="text-[#D9CBBF]/70">Avg. Dispatch</span>
                    <span className="font-mono font-bold text-[#FFCB45]">
                      {activeBranch.dispatchTime}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#D9CBBF]/70">Direct Hotline</span>
                    <a
                      href="tel:+923017344024"
                      className="font-mono text-[#FFFFFF] hover:text-[#FFCB45] transition-colors"
                    >
                      {activeBranch.hotline}
                    </a>
                  </div>
                  <p className="text-[#D9CBBF]/75 pt-1">
                    <strong className="text-[#FFFFFF]">Delivery Zones:</strong>{' '}
                    {activeBranch.zones}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#191919] border border-white/10 p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#FFCB45]" aria-hidden="true" />
                <h2 className="font-display text-xl font-bold text-[#FFFFFF]">
                  Opening Hours & Contact
                </h2>
              </div>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4 pb-2.5 border-b border-white/10">
                  <dt className="text-[#D9CBBF]">Monday – Thursday</dt>
                  <dd className="font-mono tabular-nums text-[#FFFFFF]">12:00 PM – 1:00 AM</dd>
                </div>
                <div className="flex justify-between gap-4 pb-2.5 border-b border-white/10">
                  <dt className="text-[#D9CBBF]">Friday – Sunday</dt>
                  <dd className="font-mono tabular-nums text-[#FFFFFF]">12:00 PM – 3:00 AM</dd>
                </div>
              </dl>
              <div className="flex flex-wrap items-center gap-5 pt-1 text-xs text-[#D9CBBF]">
                <a
                  href="tel:+923017344024"
                  className="inline-flex items-center gap-1.5 hover:text-[#FFCB45]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  <span className="font-mono">0301 7344024</span>
                </a>
                <a
                  href="mailto:hello@craveverse.pk"
                  className="inline-flex items-center gap-1.5 hover:text-[#FFCB45]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  <span>hello@craveverse.pk</span>
                </a>
              </div>
              <div className="pt-2">
                <WhatsAppChatButton className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
