"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  Clock,
  Sparkles,
  Tag,
  Copy,
  Check,
  ArrowRight,
  TrendingDown,
} from "lucide-react";
import { products, coupons } from "../data/products";
import ProductCard from "../products/ProductCard";
import QuickViewModal from "../components/products/QuickViewModal";
import { Product } from "../types";
import { useToast } from "../context/ToastContext";

export default function DealsPage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { showToast } = useToast();

  const dealProducts = products.filter((p) => p.isDeal || (p.discountPercentage && p.discountPercentage >= 20));

  // Countdown timer
  const [time, setTime] = useState({ hours: 11, minutes: 42, seconds: 18 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    showToast(`Copied code "${code}" to clipboard!`, "success");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 space-y-12">
      {/* Deals Header Banner */}
      <section className="bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                <Flame className="w-4 h-4 fill-rose-400 text-rose-400" />
                <span>Super Savings Hub • Up to 50% Off</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Daily Flash Deals & Exclusive Coupons
              </h1>
              <p className="text-sm text-slate-300">
                Score limited-time discounts on premium electronics, headphones, apparel, and footwear before stock depletes.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="bg-slate-900/90 border border-rose-500/40 rounded-3xl p-6 shadow-2xl text-center space-y-3 shrink-0">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-400 flex items-center justify-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Sale Ends In
              </span>
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center justify-center w-16 h-16 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-2xl font-black text-rose-400 font-mono">
                    {String(time.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Hours</span>
                </div>
                <span className="text-2xl font-bold text-rose-500">:</span>
                <div className="flex flex-col items-center justify-center w-16 h-16 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-2xl font-black text-rose-400 font-mono">
                    {String(time.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Mins</span>
                </div>
                <span className="text-2xl font-bold text-rose-500">:</span>
                <div className="flex flex-col items-center justify-center w-16 h-16 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-2xl font-black text-rose-400 font-mono">
                    {String(time.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Codes Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <Tag className="w-5 h-5 text-indigo-600" /> Active Promo Coupons
            </h2>
            <p className="text-xs text-gray-500">
              Click any voucher below to automatically copy code to your clipboard.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coupons.map((coupon) => (
            <div
              key={coupon.code}
              onClick={() => handleCopyCode(coupon.code)}
              className="p-5 rounded-2xl bg-white border border-gray-200/90 hover:border-indigo-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm font-extrabold text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-lg tracking-wider">
                    {coupon.code}
                  </span>
                  <button
                    className="text-gray-400 group-hover:text-indigo-600 transition"
                    title="Copy code"
                  >
                    {copiedCode === coupon.code ? (
                      <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <h3 className="text-sm font-bold text-gray-900">{coupon.description}</h3>
                {coupon.minOrderValue && (
                  <p className="text-xs text-gray-400 mt-1">
                    Min order: ₹{coupon.minOrderValue.toLocaleString()}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                <span>{copiedCode === coupon.code ? "Copied!" : "Click to Copy"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Discounted Product Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-rose-600" /> Featured Discounted Items ({dealProducts.length})
            </h2>
            <p className="text-xs text-gray-500">
              Handpicked deals with the biggest price drops.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
