import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  Sparkles,
  ArrowRight,
  Heart,
  Globe,
  Truck,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 space-y-16">
      {/* Hero Banner */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-3.5 py-1.5 rounded-full">
            Our Story & Craft
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto">
            Redefining Modern Shopping Through Quality & Simplicity
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Marketly was founded with a singular conviction: premium products should speak for themselves through meticulous craftsmanship, timeless utility, and zero friction.
          </p>
        </div>
      </section>

      {/* Pillars of Quality */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-3xl border border-gray-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Uncompromising Standards</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Every single product in our catalog undergoes rigorous multi-point verification for durability, material grade, and ergonomic excellence before being listed.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-gray-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Responsible Sourcing</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We partner directly with certified ethical artisans and manufacturers who prioritize sustainable raw materials, fair wages, and minimal packaging waste.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-gray-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Customer Obsession</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              From our 30-day risk-free returns to 24/7 dedicated support, our priority is creating an effortless shopping journey that makes you smile every time.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-indigo-900 text-white p-10 sm:p-14 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white">50,000+</p>
              <p className="text-xs text-indigo-200 mt-1">Delighted Customers</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white">99.4%</p>
              <p className="text-xs text-indigo-200 mt-1">On-Time Dispatch</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white">4.9 / 5</p>
              <p className="text-xs text-indigo-200 mt-1">Average Review Score</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white">100%</p>
              <p className="text-xs text-indigo-200 mt-1">Authentic Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Experience the Difference?</h2>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition"
        >
          Explore Catalog <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
