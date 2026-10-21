"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { coupons } from "../data/products";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    shippingFee,
    tax,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    freeShippingProgress,
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError("");
      setCouponCodeInput("");
    }
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="w-24 h-24 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-sm text-gray-500 max-w-md mb-8">
          You haven't added any items to your bag yet. Explore our curated collections to find premium products tailored for you.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-600/30 transition"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Header */}
      <section className="border-b border-gray-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)} items)
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Review your selected items and apply available discount coupons before checkout.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List & Promo Cards */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free Shipping Progress Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/90 shadow-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-800 mb-2">
                {amountNeededForFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-indigo-600 font-bold">₹{amountNeededForFreeShipping.toLocaleString()}</strong> more to qualify for <span className="text-emerald-600 font-bold">FREE Express Delivery</span>
                  </span>
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                    Congratulations! You unlocked FREE Express Delivery.
                  </span>
                )}
                <span className="text-gray-500 font-bold">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm divide-y divide-gray-100 overflow-hidden">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                >
                  {/* Thumbnail & Product Details */}
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {item.product.category}
                      </span>
                      <Link
                        href={`/products/${item.product.id}`}
                        className="block mt-1 font-bold text-sm text-gray-900 hover:text-indigo-600 transition line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                        {item.selectedColor && (
                          <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                            Color: {item.selectedColor}
                          </span>
                        )}
                        {item.selectedSize && (
                          <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                            Size: {item.selectedSize}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-gray-900 mt-1 sm:hidden">
                        ₹{item.product.price.toLocaleString()} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    {/* Stepper */}
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 h-9">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="px-2.5 hover:bg-gray-200 text-gray-600 font-bold transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-gray-900 min-w-[28px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="px-2.5 hover:bg-gray-200 text-gray-600 font-bold transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <p className="text-sm font-extrabold text-gray-900">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(
                          item.product.id,
                          item.selectedColor,
                          item.selectedSize
                        )
                      }
                      className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions: Clear Cart & Available Coupon Badges */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <button
                onClick={clearCart}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All Items
              </button>

              <Link
                href="/products"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                Continue Shopping <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Recommended Available Coupons */}
            <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> Available Coupons You Can Apply
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {coupons.map((c) => (
                  <div
                    key={c.code}
                    onClick={() => applyCoupon(c.code)}
                    className="p-3 bg-white rounded-xl border border-indigo-100 hover:border-indigo-300 hover:shadow-xs transition cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {c.code}
                      </span>
                      <p className="text-[11px] text-gray-600 mt-1">{c.description}</p>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 hover:underline shrink-0 ml-2">
                      Apply
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Box */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-7 shadow-sm space-y-6 sticky top-28">
            <h2 className="text-lg font-bold text-gray-900 pb-4 border-b border-gray-100">
              Order Summary
            </h2>

            {/* Promo Code Input */}
            {appliedCoupon ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-800">
                <div>
                  <p className="font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Coupon "{appliedCoupon.code}" Applied
                  </p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">{appliedCoupon.description}</p>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 underline cursor-pointer ml-2"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (e.g. SAVE20)"
                    value={couponCodeInput}
                    onChange={(e) => {
                      setCouponCodeInput(e.target.value);
                      setCouponError("");
                    }}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs uppercase font-medium focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[11px] text-rose-500 font-semibold">{couponError}</p>
                )}
              </form>
            )}

            {/* Price Calculations */}
            <div className="space-y-3 text-xs text-gray-600 pt-2 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-gray-900">₹{subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Savings</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Express Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    <span className="font-bold text-gray-900">₹{shippingFee.toLocaleString()}</span>
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated GST / Tax (5%)</span>
                <span className="font-bold text-gray-900">₹{tax.toLocaleString()}</span>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-200 text-base font-extrabold text-gray-900">
                <span>Total Amount</span>
                <span className="text-indigo-600 text-xl font-extrabold">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-col gap-2 text-[11px] text-gray-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>256-Bit SSL Encrypted & Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>30-Day Hassle-Free Returns Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
