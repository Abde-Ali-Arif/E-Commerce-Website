"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Mail,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Heart,
} from "lucide-react";
import { useToast } from "../../context/ToastContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    showToast("Subscribed! Use code WELCOME10 for 10% off your next purchase.", "success");
    setEmail("");
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900">
      {/* Value Proposition Highlights */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-800/40">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free Express Shipping</h4>
              <p className="text-xs text-slate-400 mt-1">
                Complimentary delivery on all orders exceeding ₹999 with real-time tracking.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-800/40">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">30-Day Easy Returns</h4>
              <p className="text-xs text-slate-400 mt-1">
                Hassle-free return & replacement policy with instant refund turnaround.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-800/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Secure Checkout</h4>
              <p className="text-xs text-slate-400 mt-1">
                256-bit encrypted transactions via UPI, Credit/Debit cards, and Net Banking.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-800/40">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24/7 Concierge Support</h4>
              <p className="text-xs text-slate-400 mt-1">
                Dedicated customer happiness specialists ready to assist you day and night.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Market<span className="text-indigo-400">ly</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Discover premium curated lifestyle, tech, apparel, and audio gear engineered for modern living. Designed for those who appreciate quality and craftsmanship.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-white mb-2">
                Join our VIP Club for 10% off your first order:
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 p-3 bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Use code <strong>WELCOME10</strong> at checkout for 10% off!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1 cursor-pointer"
                  >
                    Join <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Shop</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/products" className="hover:text-white transition">All Products</Link>
              </li>
              <li>
                <Link href="/products?category=Electronics" className="hover:text-white transition">Electronics & Gadgets</Link>
              </li>
              <li>
                <Link href="/products?category=Audio" className="hover:text-white transition">Audio & Sound</Link>
              </li>
              <li>
                <Link href="/products?category=Apparel" className="hover:text-white transition">Apparel & Fashion</Link>
              </li>
              <li>
                <Link href="/products?category=Footwear" className="hover:text-white transition">Footwear & Sneakers</Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-rose-400 transition font-medium">Flash Deals 🔥</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Customer Support</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/contact" className="hover:text-white transition">Help Center & FAQ</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">Track Your Order</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">Returns & Exchanges</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">Shipping Policy</Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition">My Wishlist</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">Sustainability & Ethics</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">Press & Media</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Marketly Commerce Inc. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span className="hover:text-slate-400 transition cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-slate-400 transition cursor-pointer">Terms of Service</span>
          <span>•</span>
          <span className="hover:text-slate-400 transition cursor-pointer">Security</span>
        </div>
      </div>
    </footer>
  );
}