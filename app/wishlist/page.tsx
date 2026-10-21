"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Sparkles,
  Star,
  Check,
} from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import QuickViewModal from "../components/products/QuickViewModal";
import { Product } from "../types";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleMoveAllToCart = () => {
    wishlist.forEach((p) => {
      addToCart(p, 1);
    });
    showToast(`Moved ${wishlist.length} items to your cart!`, "success");
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="w-24 h-24 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mb-6">
          <Heart className="w-12 h-12 stroke-[1.5]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Your Wishlist is Empty
        </h1>
        <p className="text-sm text-gray-500 max-w-md mb-8">
          Save your favorite products by tapping the heart icon on any product card or details page.
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
    <div className="min-h-screen bg-slate-50/60 pb-20 space-y-8">
      {/* Header */}
      <section className="border-b border-gray-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5">
              <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
              My Saved Wishlist ({wishlist.length})
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Manage your saved favorite products and move them to cart with one click.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearWishlist}
              className="px-4 py-2.5 bg-gray-100 hover:bg-rose-50 hover:text-rose-600 text-gray-700 text-xs font-semibold rounded-xl transition cursor-pointer"
            >
              Clear Wishlist
            </button>
            <button
              onClick={handleMoveAllToCart}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" /> Move All to Cart
            </button>
          </div>
        </div>
      </section>

      {/* Wishlist Items Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col rounded-3xl bg-white border border-gray-200/90 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                <Link href={`/products/${product.id}`} className="block w-full h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-rose-500 hover:bg-rose-50 shadow-sm transition"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {product.category}
                  </span>
                  <Link
                    href={`/products/${product.id}`}
                    className="block mt-1 font-bold text-sm text-gray-900 hover:text-indigo-600 transition line-clamp-2"
                  >
                    {product.name}
                  </Link>

                  <div className="flex items-center gap-1 text-amber-500 font-semibold text-xs mt-2">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-gray-400">({product.reviewCount})</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-base font-extrabold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>

                  <button
                    onClick={() => {
                      addToCart(product, 1);
                    }}
                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
