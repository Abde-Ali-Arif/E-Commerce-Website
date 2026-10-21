export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  inStock: boolean;
  stockCount: number;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  isFeatured?: boolean;
  isDeal?: boolean;
  isNewArrival?: boolean;
  dealEndsInHours?: number;
  reviews?: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Coupon {
  code: string;
  discountType: "percentage" | "fixed" | "freeship";
  value: number; // percentage (e.g. 20 for 20%) or fixed amount
  description: string;
  minOrderValue?: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderDetails {
  orderId: string;
  orderDate: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: "standard" | "express" | "priority";
  shippingFee: number;
  paymentMethod: "card" | "upi" | "netbanking" | "cod";
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
  couponCode?: string;
  status: "Confirmed" | "Processing" | "Shipped" | "Delivered";
  estimatedDelivery: string;
}
