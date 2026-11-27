import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CartItem, ConfirmedOrder, MenuCategory } from '../types';

const CART_STORAGE_KEY = 'craveverse_cart_v1';
const LOYALTY_STORAGE_KEY = 'craveverse_loyalty_v1';
export const FREE_DELIVERY_THRESHOLD = 2000;
export const STANDARD_DELIVERY_FEE = 150;

interface AddableItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartContextValue {
  items: CartItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (item: AddableItem, openAfter?: boolean) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  freeDeliveryRemaining: number;
  loyaltyPointsEarned: number;
  totalLoyaltyBalance: number;
  toastMessage: string | null;
  dismissToast: () => void;
  selectedMenuCategory: MenuCategory | 'All';
  setSelectedMenuCategory: (cat: MenuCategory | 'All') => void;
  lastConfirmedOrder: ConfirmedOrder | null;
  recordConfirmedOrder: (order: ConfirmedOrder) => void;
  clearConfirmedOrder: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch {
      // Ignore storage read errors in restricted environments
    }
    return [];
  });

  const [totalLoyaltyBalance, setTotalLoyaltyBalance] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(LOYALTY_STORAGE_KEY);
      const parsed = saved ? Number(saved) : 340;
      return Number.isFinite(parsed) ? parsed : 340;
    } catch {
      return 340;
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<MenuCategory | 'All'>('All');
  const [lastConfirmedOrder, setLastConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage write errors
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(LOYALTY_STORAGE_KEY, String(totalLoyaltyBalance));
    } catch {
      // Ignore storage write errors
    }
  }, [totalLoyaltyBalance]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => {
      setToastMessage(null);
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const addToCart = (item: AddableItem, openAfter = false) => {
    setLastConfirmedOrder(null);
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setToastMessage(`Added ${item.name} to your bag`);
    if (openAfter) {
      setIsDrawerOpen(true);
    }
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const recordConfirmedOrder = (order: ConfirmedOrder) => {
    setLastConfirmedOrder(order);
    setTotalLoyaltyBalance((prev) => prev + order.pointsEarned);
    setItems([]);
  };

  const clearConfirmedOrder = () => {
    setLastConfirmedOrder(null);
  };

  const totals = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee =
      subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
    const total = subtotal + deliveryFee;
    const freeDeliveryRemaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
    const loyaltyPointsEarned = Math.floor(subtotal / 100) * 10;
    return {
      itemCount,
      subtotal,
      deliveryFee,
      total,
      freeDeliveryRemaining,
      loyaltyPointsEarned,
    };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        ...totals,
        totalLoyaltyBalance,
        toastMessage,
        dismissToast: () => setToastMessage(null),
        selectedMenuCategory,
        setSelectedMenuCategory,
        lastConfirmedOrder,
        recordConfirmedOrder,
        clearConfirmedOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
