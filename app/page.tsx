"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Flame,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Star,
  ShoppingBag,
  TrendingUp,
  Tag,
  CheckCircle2,
  Clock,
  Layers,
} from "lucide-react";
import { products, productCategories } from "./data/products";
import ProductCard from "./products/ProductCard";
import QuickViewModal from "./components/products/QuickViewModal";
import { Product } from "./types";
import { useToast } from "./context/ToastContext";

export default function HomePage() {
  const [selectedCategoryTab, setSelectedCategoryTab] = useState("all");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  // Flash Sale Countdown Timer (Simulated)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);
  const flashDeals = products.filter((p) => p.isDeal).slice(0, 4);

  const filteredTabProducts =
    selectedCategoryTab === "all"
      ? products.slice(0, 8)
      : products.filter((p) => p.category === selectedCategoryTab).slice(0, 8);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;
    setIsSubscribed(true);
    showToast("Subscribed! Use code WELCOME10 for 10% off your first order.", "success");
    setNewsletterEmail("");
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 sm:pt-20 sm:pb-32">
        {/* Subtle background glow effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Curated Premium Collection • New 2026 Releases</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                Engineered for Comfort. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300">
                  Crafted for Excellence.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover exceptional electronics, audiophile-grade headphones, designer footwear, and minimalist apparel curated for discerning tastes.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/products"
                  className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 group"
                >
                  <span>Explore All Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>

                <Link
                  href="/deals"
                  className="w-full sm:w-auto px-7 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm rounded-xl border border-slate-700 backdrop-blur-sm transition flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4 text-rose-400 fill-rose-400" />
                  <span>Flash Deals (Up to 50% Off)</span>
                </Link>
              </div>

              {/* Social Proof Stats */}
              <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white">50k+</p>
                  <p className="text-xs text-slate-400 mt-0.5">Verified Orders</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white">4.9 ★</p>
                  <p className="text-xs text-slate-400 mt-0.5">Customer Rating</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white">100%</p>
                  <p className="text-xs text-slate-400 mt-0.5">Authentic Guarantee</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Showcase Spotlight */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-3xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/80 p-5 shadow-2xl backdrop-blur-xl">
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> Best Seller
                </div>

                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 mb-4 border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
                    alt="Sony WH-1000XM5 Headphones"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-indigo-400 font-semibold uppercase tracking-wider">Audio & Sound</span>
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.8 (342)
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white line-clamp-1">
                    Sony WH-1000XM5 Wireless Headphones
                  </h3>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-lg font-extrabold text-white">₹26,990</span>
                      <span className="text-xs text-slate-500 line-through ml-2">₹34,990</span>
                    </div>
                    <Link
                      href="/products/1"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY EXPLORER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <Layers className="w-4 h-4" /> Browse Collections
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 mt-2 sm:mt-0"
          >
            View All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {productCategories
            .filter((c) => c.id !== "all")
            .map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${encodeURIComponent(category.id)}`}
                className="group relative flex flex-col items-center p-4 rounded-2xl bg-white border border-gray-200/80 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 text-center"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 bg-gray-100 border border-gray-200 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition line-clamp-1">
                  {category.name}
                </h3>
                <span className="text-[11px] font-medium text-gray-400 mt-0.5">
                  {category.count} items
                </span>
              </Link>
            ))}
        </div>
      </section>

      {/* 3. FLASH DEALS WITH LIVE COUNTDOWN */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-rose-950 via-slate-950 to-slate-900 border border-rose-900/30 p-6 sm:p-10 text-white">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-rose-900/30">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30 mb-2">
                <Flame className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                <span>Limited Time Event</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Flash Deals & Special Offers
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Grab limited-stock items with massive discounts before time runs out.
              </p>
            </div>

            {/* Countdown Clock */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center w-14 h-14 bg-slate-900/90 border border-rose-500/30 rounded-2xl">
                <span className="text-lg font-extrabold text-rose-400 font-mono">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-400">Hours</span>
              </div>
              <span className="text-xl font-bold text-rose-500">:</span>
              <div className="flex flex-col items-center justify-center w-14 h-14 bg-slate-900/90 border border-rose-500/30 rounded-2xl">
                <span className="text-lg font-extrabold text-rose-400 font-mono">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-400">Mins</span>
              </div>
              <span className="text-xl font-bold text-rose-500">:</span>
              <div className="flex flex-col items-center justify-center w-14 h-14 bg-slate-900/90 border border-rose-500/30 rounded-2xl">
                <span className="text-lg font-extrabold text-rose-400 font-mono">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-400">Secs</span>
              </div>
            </div>
          </div>

          {/* Flash Deal Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            {flashDeals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS & CATEGORY TABS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <TrendingUp className="w-4 h-4" /> Top Trending Now
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Featured Products
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {["all", "Electronics", "Audio", "Apparel", "Footwear"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryTab(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                  selectedCategoryTab === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat === "all" ? "All Featured" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTabProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-md transition"
          >
            <span>View All {products.length} Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. VALUE PROPOSITIONS BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex flex-col items-start">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Complimentary Express</h4>
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
              Fast, insured nationwide shipping on all orders over ₹999.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex flex-col items-start">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">30-Day Risk-Free Trial</h4>
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
              Love it or return it with our effortless 30-day money-back guarantee.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex flex-col items-start">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Encrypted Transactions</h4>
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
              Bank-grade 256-bit encryption for credit cards, UPI, and net banking.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex flex-col items-start">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Headphones className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Dedicated Support</h4>
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
              Live customer support available 24 hours a day, 7 days a week.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED CUSTOMER REVIEWS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Real Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-3">
            Trusted by Thousands of Happy Shoppers
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Read authentic reviews from customers who experienced our quality and service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed italic">
                "The Sony headphones arrived within 24 hours in flawless packaging. The noise cancellation is extraordinary. Best online shopping experience!"
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-gray-100">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                AS
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Aarav Sharma</p>
                <p className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed italic">
                "The leather backpack exceeded all my expectations. The grain and stitching are reminiscent of luxury Italian brands that cost 5x as much."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-gray-100">
              <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                MS
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Meera Sen</p>
                <p className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed italic">
                "Customer support helped me exchange a shoe size within 2 minutes. The replacement arrived the next day with zero fuss. Marketly has won me over for good."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-gray-100">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                KR
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Kavita Reddy</p>
                <p className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER REWARD SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
              Exclusive Member Perk
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Get 10% Off Your First Purchase
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200">
              Subscribe to our newsletter for secret sales, member coupons, and early access to limited edition drops.
            </p>

            {isSubscribed ? (
              <div className="p-4 bg-emerald-900/60 border border-emerald-500/50 rounded-2xl text-emerald-200 text-xs font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Coupon unlocked! Use code <strong className="text-white">WELCOME10</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-indigo-200/70 focus:outline-none focus:bg-white/20 focus:border-white transition"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs rounded-xl shadow-lg transition cursor-pointer"
                >
                  Claim 10% Off
                </button>
              </form>
            )}
          </div>
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
