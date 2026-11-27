import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { FREE_DELIVERY_THRESHOLD, useCart } from '../context/CartContext';
import { ConfirmedOrder, RoutePath } from '../types';
import { FoodImage } from './FoodImage';

interface CartDrawerProps {
  onNavigate: (path: RoutePath) => void;
}

type DrawerStep = 'cart' | 'checkout' | 'confirmed';

export function CartDrawer({ onNavigate }: CartDrawerProps) {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    total,
    freeDeliveryRemaining,
    loyaltyPointsEarned,
    lastConfirmedOrder,
    recordConfirmedOrder,
    clearConfirmedOrder,
  } = useCart();

  const [step, setStep] = useState<DrawerStep>('cart');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isDrawerOpen) return null;

  const activeStep: DrawerStep = lastConfirmedOrder ? 'confirmed' : step;

  const handleClose = () => {
    if (activeStep === 'confirmed') {
      clearConfirmedOrder();
      setStep('cart');
    }
    closeDrawer();
  };

  const validateCheckout = () => {
    const nextErrors: Record<string, string> = {};
    if (customerName.trim().length < 2) {
      nextErrors.customerName = 'Please enter your full name.';
    }
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!/^(\+92|0)?3\d{9}$/.test(cleanPhone) && cleanPhone.length < 10) {
      nextErrors.phone = 'Enter a valid mobile number (e.g. 0300 1234567).';
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (address.trim().length < 8) {
      nextErrors.address = 'Please enter your complete street address & area.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCheckout() || items.length === 0) return;

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const confirmed: ConfirmedOrder = {
      orderNumber: `CV-${randomCode}`,
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email.trim() || 'guest@craveverse.pk',
      address: address.trim(),
      notes: notes.trim(),
      items: [...items],
      subtotal,
      deliveryFee,
      total,
      pointsEarned: loyaltyPointsEarned,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    recordConfirmedOrder(confirmed);
    setStep('confirmed');
  };

  const handleBrowseMenu = () => {
    handleClose();
    onNavigate('/menu');
  };

  const freeDeliveryProgress = Math.min(
    100,
    Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100)
  );

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart and Checkout"
    >
      <div className="fixed inset-0" onClick={handleClose} aria-hidden="true" />

      <aside className="relative w-full max-w-md bg-[#141414] border-l border-white/10 h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {activeStep === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                aria-label="Back to cart"
                className="w-8 h-8 rounded-lg border border-white/15 flex items-center justify-center text-[#FFF4E8] hover:border-[#FF5A1F] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-display text-xl font-bold text-[#FFF4E8]">
              {activeStep === 'cart' && 'Your Crave Bag'}
              {activeStep === 'checkout' && 'Express Checkout'}
              {activeStep === 'confirmed' && 'Order Confirmed'}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close cart drawer"
            className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-[#D9CBBF] hover:text-[#FFF4E8] hover:border-[#FF5A1F] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {activeStep === 'confirmed' && lastConfirmedOrder ? (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-[#1C1C1C] border border-[#FFCB45]/40 text-center">
                <CheckCircle2
                  className="w-11 h-11 text-[#FFCB45] mx-auto mb-3"
                  aria-hidden="true"
                />
                <p className="font-mono text-xs text-[#FFCB45] mb-1">
                  ORDER #{lastConfirmedOrder.orderNumber}
                </p>
                <h3 className="font-display text-2xl font-bold text-[#FFF4E8] mb-2">
                  Firing Up Your Order!
                </h3>
                <p className="text-sm text-[#D9CBBF]">
                  Estimated hot dispatch in <span className="text-[#FFF4E8] font-semibold">25–30 mins</span>.
                </p>
              </div>

              {/* Demo Mode Disclosure */}
              <div className="p-3.5 rounded-lg bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 text-xs text-[#FFF4E8] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" />
                <span>
                  Demo Checkout Confirmation: No real payment was charged. This receipt
                  demonstrates full end-to-end order flow.
                </span>
              </div>

              <div className="space-y-3 text-sm border border-white/10 rounded-xl p-4 bg-[#181818]">
                <h4 className="font-display font-bold text-[#FFF4E8]">Delivery Details</h4>
                <div className="space-y-1 text-[#D9CBBF] text-xs leading-relaxed">
                  <p>
                    <strong className="text-[#FFF4E8]">Name:</strong>{' '}
                    {lastConfirmedOrder.customerName}
                  </p>
                  <p>
                    <strong className="text-[#FFF4E8]">Phone:</strong>{' '}
                    <span className="font-mono">{lastConfirmedOrder.phone}</span>
                  </p>
                  <p>
                    <strong className="text-[#FFF4E8]">Address:</strong>{' '}
                    {lastConfirmedOrder.address}
                  </p>
                  {lastConfirmedOrder.notes && (
                    <p>
                      <strong className="text-[#FFF4E8]">Notes:</strong>{' '}
                      {lastConfirmedOrder.notes}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2.5 border border-white/10 rounded-xl p-4 bg-[#181818]">
                <h4 className="font-display font-bold text-[#FFF4E8] text-sm">
                  Receipt Summary
                </h4>
                <ul className="space-y-2 text-xs text-[#D9CBBF]">
                  {lastConfirmedOrder.items.map((item) => (
                    <li key={item.id} className="flex justify-between gap-2">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-mono tabular-nums text-[#FFF4E8]">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#D9CBBF]">
                    <span>Delivery Fee</span>
                    <span className="font-mono tabular-nums">
                      {lastConfirmedOrder.deliveryFee === 0
                        ? 'FREE'
                        : `Rs. ${lastConfirmedOrder.deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#FFF4E8]">
                    <span>Final Total</span>
                    <span className="font-mono tabular-nums text-[#FFCB45]">
                      Rs. {lastConfirmedOrder.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1C1C1C] border border-white/10 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-[#D9CBBF]">
                  <Award className="w-4 h-4 text-[#FFCB45]" />
                  Crave Loyalty Points Credited
                </span>
                <span className="font-mono font-bold text-[#FFCB45]">
                  +{lastConfirmedOrder.pointsEarned} pts
                </span>
              </div>

              <button
                type="button"
                onClick={handleBrowseMenu}
                className="w-full py-3 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-bold text-sm transition-colors cursor-pointer"
              >
                Explore More Menu Items
              </button>
            </div>
          ) : items.length === 0 ? (
            /* Empty Cart Design */
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-2xl bg-[#1D1D1D] border border-white/10 flex items-center justify-center mb-5">
                <ShoppingBag className="w-7 h-7 text-[#FF5A1F]" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#FFF4E8] mb-2">
                Your bag is waiting for flavor
              </h3>
              <p className="text-sm text-[#D9CBBF]/80 max-w-xs mb-6 leading-relaxed">
                Add flame-seared smash burgers, wood-fired pizzas, or crispy wings to start
                your order.
              </p>
              <button
                type="button"
                onClick={handleBrowseMenu}
                className="px-6 py-3 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-bold text-sm transition-colors cursor-pointer"
              >
                Browse Our Menu
              </button>
            </div>
          ) : activeStep === 'cart' ? (
            <div className="space-y-5">
              {/* Free delivery threshold progress */}
              <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/10">
                <div className="flex items-center gap-2 text-xs font-medium text-[#FFF4E8] mb-2">
                  <Truck className="w-4 h-4 text-[#FFCB45]" aria-hidden="true" />
                  {freeDeliveryRemaining === 0 ? (
                    <span className="text-[#FFCB45]">
                      Unlocked FREE express delivery on this order
                    </span>
                  ) : (
                    <span>
                      Add{' '}
                      <strong className="font-mono text-[#FFCB45]">
                        Rs. {freeDeliveryRemaining.toLocaleString()}
                      </strong>{' '}
                      more for FREE delivery
                    </span>
                  )}
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF5A1F] transition-all duration-300"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>

              {/* Cart Items */}
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-3.5 p-3 rounded-xl bg-[#1A1A1A] border border-white/10"
                  >
                    <FoodImage
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[11px] text-[#D9CBBF]/70 truncate">
                            {item.category}
                          </p>
                          <h3 className="font-display text-sm font-bold text-[#FFF4E8] truncate">
                            {item.name}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-[#D9CBBF]/60 hover:text-[#FF5A1F] transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-2">
                        <span className="font-mono tabular-nums text-sm font-bold text-[#FFCB45]">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>

                        <div className="inline-flex items-center gap-1 bg-[#101010] border border-white/10 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label={`Decrease ${item.name} quantity`}
                            className="w-7 h-7 rounded flex items-center justify-center text-[#FFF4E8] hover:bg-white/10 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono tabular-nums text-xs font-bold min-w-[1.5rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label={`Increase ${item.name} quantity`}
                            className="w-7 h-7 rounded flex items-center justify-center text-[#FFF4E8] hover:bg-white/10 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-[#D9CBBF]/70 hover:text-[#FF5A1F] transition-colors cursor-pointer"
                >
                  Clear all items
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="p-3.5 rounded-lg bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 text-xs text-[#FFF4E8] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" />
                <span>
                  <strong>Demo Checkout Mode:</strong> Enter sample details to preview order
                  validation and confirmation. No real payment is processed.
                </span>
              </div>

              <div>
                <label
                  htmlFor="checkout-name"
                  className="block text-xs font-semibold text-[#D9CBBF] mb-1.5"
                >
                  Full Name *
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Ayesha Khan"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#1C1C1C] border border-white/15 text-sm text-[#FFF4E8] placeholder:text-[#D9CBBF]/40 focus:outline-none focus:border-[#FF5A1F]"
                />
                {errors.customerName && (
                  <p className="mt-1 text-xs text-[#FF5A1F]">{errors.customerName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="checkout-phone"
                  className="block text-xs font-semibold text-[#D9CBBF] mb-1.5"
                >
                  Phone Number *
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0300 1234567"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#1C1C1C] border border-white/15 text-sm font-mono text-[#FFF4E8] placeholder:text-[#D9CBBF]/40 focus:outline-none focus:border-[#FF5A1F]"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-[#FF5A1F]">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="checkout-email"
                  className="block text-xs font-semibold text-[#D9CBBF] mb-1.5"
                >
                  Email (Optional)
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#1C1C1C] border border-white/15 text-sm text-[#FFF4E8] placeholder:text-[#D9CBBF]/40 focus:outline-none focus:border-[#FF5A1F]"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-[#FF5A1F]">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="checkout-address"
                  className="block text-xs font-semibold text-[#D9CBBF] mb-1.5"
                >
                  Delivery Address *
                </label>
                <textarea
                  id="checkout-address"
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House / Flat #, Street, Block, City"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#1C1C1C] border border-white/15 text-sm text-[#FFF4E8] placeholder:text-[#D9CBBF]/40 focus:outline-none focus:border-[#FF5A1F]"
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-[#FF5A1F]">{errors.address}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="checkout-notes"
                  className="block text-xs font-semibold text-[#D9CBBF] mb-1.5"
                >
                  Order Notes
                </label>
                <input
                  id="checkout-notes"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Extra chipotle dip, ring bell once, etc."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#1C1C1C] border border-white/15 text-sm text-[#FFF4E8] placeholder:text-[#D9CBBF]/40 focus:outline-none focus:border-[#FF5A1F]"
                />
              </div>

              {/* Compact Order Summary inside Checkout */}
              <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/10 space-y-2 text-xs">
                <p className="font-display font-bold text-sm text-[#FFF4E8] mb-2">
                  Selected Products ({items.reduce((s, i) => s + i.quantity, 0)})
                </p>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-[#D9CBBF]">
                    <span className="truncate pr-2">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-mono tabular-nums text-[#FFF4E8] shrink-0">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </form>
          )}
        </div>

        {/* Sticky Footer Calculations */}
        {items.length > 0 && activeStep !== 'confirmed' && (
          <div className="px-6 py-5 border-t border-white/10 bg-[#101010] space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#D9CBBF]">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-[#FFF4E8]">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[#D9CBBF]">
                <span>Delivery Charges</span>
                <span className="font-mono tabular-nums text-[#FFF4E8]">
                  {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-xs text-[#FFCB45]">
                <span>Crave Loyalty Points</span>
                <span className="font-mono tabular-nums">+{loyaltyPointsEarned} pts</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                <span className="font-display text-base font-bold text-[#FFF4E8]">
                  Final Total
                </span>
                <span className="font-mono tabular-nums text-xl font-bold text-[#FFCB45]">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
            </div>

            {activeStep === 'cart' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-bold text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCB45]"
              >
                Proceed to Checkout
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A10] text-[#101010] font-bold text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCB45]"
              >
                Place Order (Demo) · Rs. {total.toLocaleString()}
              </button>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
