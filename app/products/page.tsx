"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  LayoutGrid,
  List,
  SlidersHorizontal,
  Search,
  X,
  RotateCcw,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { products as allProducts } from "../data/products";
import ProductFilters, { FilterState } from "./ProductFilters";
import ProductGrid from "./ProductGrid";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const isDealParam = searchParams.get("deal") === "true";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating" | "reviews">("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    categories: initialCategory ? [initialCategory] : [],
    minPrice: 0,
    maxPrice: 250000,
    rating: 0,
    dealsOnly: isDealParam,
    inStockOnly: false,
  });

  // Sync when search params change
  useEffect(() => {
    const q = searchParams.get("search") || "";
    const cat = searchParams.get("category") || "";
    const deal = searchParams.get("deal") === "true";

    setSearchQuery(q);
    setFilters((prev) => ({
      ...prev,
      categories: cat ? [cat] : [],
      dealsOnly: deal,
    }));
  }, [searchParams]);

  const handleResetFilters = () => {
    setFilters({
      categories: [],
      minPrice: 0,
      maxPrice: 250000,
      rating: 0,
      dealsOnly: false,
      inStockOnly: false,
    });
    setSearchQuery("");
    router.push("/products");
  };

  const removeCategoryFilter = (cat: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== cat),
    }));
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(q);
          const matchesCategory = product.category.toLowerCase().includes(q);
          const matchesDesc = product.description.toLowerCase().includes(q);
          if (!matchesName && !matchesCategory && !matchesDesc) return false;
        }

        // Categories
        if (
          filters.categories.length > 0 &&
          !filters.categories.includes(product.category)
        ) {
          return false;
        }

        // Price
        if (
          product.price < filters.minPrice ||
          product.price > filters.maxPrice
        ) {
          return false;
        }

        // Rating
        if (filters.rating > 0 && product.rating < filters.rating) {
          return false;
        }

        // Deals only
        if (filters.dealsOnly && !product.isDeal && !product.discountPercentage) {
          return false;
        }

        // In Stock only
        if (filters.inStockOnly && !product.inStock) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [allProducts, searchQuery, filters, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Header Banner */}
      <section className="border-b border-gray-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {filters.categories.length === 1
                  ? filters.categories[0]
                  : filters.dealsOnly
                  ? "Exclusive Flash Deals"
                  : "All Products"}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                Explore premium products with fast express delivery and 30-day returns.
              </p>
            </div>

            {/* In-page Search Bar */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Filter by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-9 bg-gray-100/80 focus:bg-white text-xs text-gray-900 rounded-xl border border-transparent focus:border-indigo-500 outline-none transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28">
              <ProductFilters
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetFilters}
              />
            </div>
          </div>

          {/* Product Grid & Controls Area */}
          <div className="flex-1 min-w-0">
            {/* Control Bar: Active filters, Result Count, Sort, View Mode */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200/80 mb-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Mobile Filter Sheet Trigger */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-semibold text-gray-800 transition cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                </button>

                <p className="text-xs text-gray-500">
                  Showing <strong className="text-gray-900 font-bold">{filteredProducts.length}</strong> of {allProducts.length} items
                </p>
              </div>

              {/* Controls: Sort Dropdown + Grid/List Toggle */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-500 hidden sm:inline">
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="featured">Featured Picks</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviewed</option>
                  </select>
                </div>

                {/* View Mode Buttons */}
                <div className="flex items-center bg-gray-100 p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg transition ${
                      viewMode === "grid"
                        ? "bg-white text-indigo-600 shadow-xs"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg transition ${
                      viewMode === "list"
                        ? "bg-white text-indigo-600 shadow-xs"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Pill Badges */}
            {(filters.categories.length > 0 ||
              filters.dealsOnly ||
              filters.inStockOnly ||
              filters.rating > 0 ||
              searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-gray-400 font-medium">Active:</span>

                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs px-2.5 py-1 rounded-lg">
                    Keyword: "{searchQuery}"
                    <button onClick={() => setSearchQuery("")} className="hover:text-rose-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.categories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs px-2.5 py-1 rounded-lg"
                  >
                    {cat}
                    <button onClick={() => removeCategoryFilter(cat)} className="hover:text-rose-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {filters.dealsOnly && (
                  <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-2.5 py-1 rounded-lg">
                    Flash Deals Only
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, dealsOnly: false }))}
                      className="hover:text-rose-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.inStockOnly && (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-2.5 py-1 rounded-lg">
                    In Stock
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, inStockOnly: false }))}
                      className="hover:text-rose-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.rating > 0 && (
                  <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-2.5 py-1 rounded-lg">
                    ★ {filters.rating}+
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, rating: 0 }))}
                      className="hover:text-rose-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={handleResetFilters}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold underline cursor-pointer ml-1"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid */}
            <ProductGrid
              products={filteredProducts}
              viewMode={viewMode}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col p-6 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <h3 className="text-base font-bold text-gray-900">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ProductFilters
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetFilters}
              />

              <div className="pt-6 mt-auto">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full py-3 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  View {filteredProducts.length} Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm font-semibold text-gray-500">Loading catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}