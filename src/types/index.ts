export type RoutePath = '/' | '/menu' | '/offers' | '/about' | '/contact';

export type MenuCategory =
  | 'Burgers'
  | 'Pizzas'
  | 'Fried Chicken'
  | 'Fries & Sides'
  | 'Sandwiches'
  | 'Drinks'
  | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: 'Bestseller' | 'New' | 'Chef Pick';
  prepTime: string;
  calories: string;
}

export interface SpecialOffer {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  itemsIncluded: string[];
  originalPrice: number;
  offerPrice: number;
  savingsPercent: number;
  image: string;
  validityLabel: string;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  city: string;
  rating: number;
  comment: string;
  orderedItem: string;
}

export interface ConfirmedOrder {
  orderNumber: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  pointsEarned: number;
  placedAt: string;
}
