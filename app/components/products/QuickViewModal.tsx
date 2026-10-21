"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck, ArrowRight } from "lucide-react";
import { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState<string>(
    product?.images?.[0] || product?.image || ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors?.[0]?.name || ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes?.[0] || ""
  );
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-4xl border border-gray-100">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="p-6 bg-gray-50/70 flex flex-col justify-between">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white border border-gray-200">
                <img
                  src={selectedImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {product.discountPercentage && (
                  <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition shrink-0 ${
                        (selectedImage || product.image) === img
                          ? "border-indigo-600 ring-2 ring-indigo-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="inline-block text-xs font-semibold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-md mb-2">
                  {product.category}
                </span>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                  {product.name}
                </h2>

                {/* Ratings */}
                <div className="flex items-center gap-2 mt-2.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-gray-700">
                    {product.rating}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({product.reviewCount} reviews)
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="text-xs font-medium text-emerald-600">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-2xl font-extrabold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.discountPercentage && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      Save ₹{((product.originalPrice || 0) - product.price).toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                  {product.description}
                </p>

                {/* Color Variants */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                      Color: <span className="font-normal text-gray-900">{selectedColor || product.colors[0].name}</span>
                    </label>
                    <div className="flex items-center gap-2.5">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-7 h-7 rounded-full border-2 transition p-0.5 flex items-center justify-center ${
                            (selectedColor || product.colors?.[0]?.name) === c.name
                              ? "border-indigo-600 scale-110"
                              : "border-transparent hover:scale-105"
                          }`}
                          title={c.name}
                        >
                          <span
                            className="w-full h-full rounded-full border border-black/10"
                            style={{ backgroundColor: c.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Variants */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-4">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                      Size: <span className="font-normal text-gray-900">{selectedSize || product.sizes[0]}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                            (selectedSize || product.sizes?.[0]) === sz
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 h-11">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 hover:bg-gray-200 text-gray-600 font-bold transition"
                    >
                      -
                    </button>
                    <span className="px-3 font-semibold text-sm text-gray-900 min-w-[32px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 hover:bg-gray-200 text-gray-600 font-bold transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 h-11 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-xl border transition ${
                      inWishlist
                        ? "bg-rose-50 border-rose-200 text-rose-600"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:text-rose-600 hover:bg-rose-50"
                    }`}
                    title="Toggle Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? "fill-rose-500 text-rose-500" : ""}`} />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-gray-400" /> Free delivery above ₹999
                  </div>
                  <Link
                    href={`/products/${product.id}`}
                    onClick={onClose}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
                  >
                    Full details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
