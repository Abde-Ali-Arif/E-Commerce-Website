"use client";

import React, { useState } from "react";
import { Star, RotateCcw, Flame, CheckCircle, SlidersHorizontal } from "lucide-react";
import { productCategories } from "../data/products";

export interface FilterState {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  rating: number;
  dealsOnly: boolean;
  inStockOnly: boolean;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
}

export default function ProductFilters({
  filters,
  onFilterChange,
  onReset,
}: ProductFiltersProps) {
  const toggleCategory = (catId: string) => {
    let updatedCategories: string[];
    if (catId === "all") {
      updatedCategories = [];
    } else {
      updatedCategories = filters.categories.includes(catId)
        ? filters.categories.filter((c) => c !== catId)
        : [...filters.categories, catId];
    }
    onFilterChange({ ...filters, categories: updatedCategories });
  };

  const handlePriceChange = (min: number, max: number) => {
    onFilterChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const handleRatingChange = (ratingVal: number) => {
    onFilterChange({ ...filters, rating: filters.rating === ratingVal ? 0 : ratingVal });
  };

  const toggleDealsOnly = () => {
    onFilterChange({ ...filters, dealsOnly: !filters.dealsOnly });
  };

  const toggleInStockOnly = () => {
    onFilterChange({ ...filters, inStockOnly: !filters.inStockOnly });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.minPrice > 0 ||
    filters.maxPrice < 250000 ||
    filters.rating > 0 ||
    filters.dealsOnly ||
    filters.inStockOnly;

  return (
    <aside className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
          <span>Filter Products</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear All
          </button>
        )}
      </div>

      {/* Quick Toggles */}
      <div className="space-y-2.5 pb-4 border-b border-gray-100">
        <label className="flex items-center justify-between cursor-pointer p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
            <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>On Sale & Flash Deals</span>
          </div>
          <input
            type="checkbox"
            checked={filters.dealsOnly}
            onChange={toggleDealsOnly}
            className="w-4 h-4 text-indigo-600 rounded accent-indigo-600 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>In Stock Only</span>
          </div>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={toggleInStockOnly}
            className="w-4 h-4 text-indigo-600 rounded accent-indigo-600 cursor-pointer"
          />
        </label>
      </div>

      {/* Categories */}
      <div className="space-y-3 pb-5 border-b border-gray-100">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
          Categories
        </h3>
        <div className="space-y-2">
          {productCategories
            .filter((c) => c.id !== "all")
            .map((cat) => {
              const isChecked = filters.categories.includes(cat.id);
              return (
                <label
                  key={cat.id}
                  className="flex items-center justify-between text-xs font-medium text-gray-700 hover:text-indigo-600 cursor-pointer py-1"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCategory(cat.id)}
                      className="w-4 h-4 rounded text-indigo-600 accent-indigo-600 cursor-pointer"
                    />
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-semibold">
                    {cat.count}
                  </span>
                </label>
              );
            })}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3 pb-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
            Price Range
          </h3>
          <span className="text-xs font-semibold text-indigo-600">
            Up to ₹{filters.maxPrice.toLocaleString()}
          </span>
        </div>

        <input
          type="range"
          min="1000"
          max="250000"
          step="2000"
          value={filters.maxPrice}
          onChange={(e) => handlePriceChange(filters.minPrice, Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />

        <div className="flex items-center justify-between text-[11px] text-gray-400 font-semibold">
          <span>₹1,000</span>
          <span>₹1,00,000</span>
          <span>₹2,50,000+</span>
        </div>
      </div>

      {/* Customer Rating */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
          Customer Rating
        </h3>
        <div className="space-y-1.5">
          {[4.5, 4.0, 3.5, 3.0].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingChange(star)}
              className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                filters.rating === star
                  ? "bg-amber-50 text-amber-900 border border-amber-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-1.5 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-gray-900">{star} stars & above</span>
              </div>
              {filters.rating === star && (
                <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                  Active
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}