"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Eye, Star, Check } from "lucide-react";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  viewMode?: "grid" | "list";
}

export default function ProductCard({
  product,
  onQuickView,
  viewMode = "grid",
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  if (viewMode === "list") {
    return (
      <div className="group flex flex-col sm:flex-row gap-5 p-4 rounded-2xl bg-white border border-gray-200/90 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-56 aspect-square rounded-xl overflow-hidden bg-gray-100 shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {product.discountPercentage && (
              <span className="bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                -{product.discountPercentage}%
              </span>
            )}
            {product.isDeal && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm uppercase">
                Flash Deal
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition shadow-sm ${
              inWishlist
                ? "bg-rose-50 text-rose-500"
                : "bg-white/80 text-gray-600 hover:bg-white hover:text-rose-500"
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? "fill-rose-500" : ""}`} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {product.category}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-gray-400 font-normal">({product.reviewCount})</span>
              </div>
            </div>

            <Link href={`/products/${product.id}`} className="group-hover:text-indigo-600 transition">
              <h3 className="text-base font-bold text-gray-900 line-clamp-1 mb-2">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
              {product.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-gray-100">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleQuickViewClick}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" /> Quick View
              </button>
              <button
                onClick={handleQuickAdd}
                className={`px-4 py-2 text-xs font-semibold rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer ${
                  isAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white border border-gray-200/80 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden">
      {/* Product Image Showcase */}
      <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.discountPercentage && (
            <span className="bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
              -{product.discountPercentage}%
            </span>
          )}
          {product.isDeal && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm uppercase tracking-wide">
              Flash Deal
            </span>
          )}
        </div>

        {/* Top-right Actions (Wishlist) */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
            inWishlist
              ? "bg-rose-50 text-rose-600 ring-2 ring-rose-300"
              : "bg-white/90 text-gray-600 hover:bg-white hover:text-rose-600 opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
          }`}
          title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>

        {/* Quick View Hover Button */}
        {onQuickView && (
          <div className="absolute inset-x-3 bottom-3 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleQuickViewClick}
              className="w-full py-2 px-3 bg-white/95 backdrop-blur-md text-gray-900 text-xs font-bold rounded-xl shadow-lg hover:bg-white hover:text-indigo-600 transition flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" /> Quick Preview
            </button>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
            <span className="font-medium text-indigo-600 uppercase tracking-wider text-[10px] bg-indigo-50 px-2 py-0.5 rounded">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/products/${product.id}`} className="group-hover:text-indigo-600 transition">
            <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug mb-2">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-base font-extrabold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className={`p-2.5 rounded-xl transition shadow-sm flex items-center justify-center cursor-pointer ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-gray-900 hover:bg-indigo-600 text-white"
            }`}
            title="Add to cart"
          >
            {isAdded ? (
              <Check className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}