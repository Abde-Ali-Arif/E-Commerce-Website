"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, CartItem, Coupon } from "../types";
import { coupons } from "../data/products";
import { useToast } from "./ToastContext";

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (
    product: Product,
    quantity?: number,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  removeFromCart: (
    productId: number,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  updateQuantity: (
    productId: number,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("marketly_cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      const storedCoupon = localStorage.getItem("marketly_coupon");
      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("marketly_cart", JSON.stringify(cart));
      } catch (e) {
        console.error("Failed to save cart", e);
      }
    }
  }, [cart, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      try {
        if (appliedCoupon) {
          localStorage.setItem("marketly_coupon", JSON.stringify(appliedCoupon));
        } else {
          localStorage.removeItem("marketly_coupon");
        }
      } catch (e) {
        console.error("Failed to save coupon", e);
      }
    }
  }, [appliedCoupon, isInitialized]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        showToast(`Updated "${product.name.slice(0, 20)}..." quantity in cart (${newQty})`, "success");
        return updated;
      } else {
        showToast(`Added "${product.name.slice(0, 20)}..." to cart`, "success");
        return [
          ...prev,
          {
            product,
            quantity,
            selectedColor: selectedColor || product.colors?.[0]?.name,
            selectedSize: selectedSize || product.sizes?.[0],
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (
    productId: number,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          )
      )
    );
    showToast("Item removed from cart", "info");
  };

  const updateQuantity = (
    productId: number,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor, selectedSize);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode);

    if (!found) {
      showToast("Invalid promo code", "error");
      return { success: false, message: "Invalid promo code." };
    }

    const currentSubtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    if (found.minOrderValue && currentSubtotal < found.minOrderValue) {
      const msg = `Code requires a minimum order of ₹${found.minOrderValue.toLocaleString()}`;
      showToast(msg, "error");
      return { success: false, message: msg };
    }

    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied successfully!`, "success");
    return { success: true, message: "Coupon applied successfully!" };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Promo code removed", "info");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  let discount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.discountType === "percentage") {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.discountType === "fixed") {
      discount = Math.min(appliedCoupon.value, subtotal);
    }
  }

  let shippingFee = 0;
  if (subtotal > 0) {
    if (appliedCoupon?.discountType === "freeship" || subtotal >= FREE_SHIPPING_THRESHOLD) {
      shippingFee = 0;
    } else {
      shippingFee = STANDARD_SHIPPING_FEE;
    }
  }

  const tax = Math.round(subtotal * 0.05); // 5% GST / Tax
  const total = Math.max(0, subtotal - discount + shippingFee + tax);

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartCount,
        subtotal,
        discount,
        shippingFee,
        tax,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
