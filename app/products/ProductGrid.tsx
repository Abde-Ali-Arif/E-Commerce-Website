"use client";

import React, { useState } from "react";
import { SearchX, RotateCcw } from "lucide-react";
import { Product } from "../types";
import ProductCard from "./ProductCard";
import QuickViewModal from "../components/products/QuickViewModal";

interface ProductGridProps {
  products: Product[];
  viewMode?: "grid" | "list";
  onResetFilters?: () => void;
}

export default function ProductGrid({
  products,
  viewMode = "grid",
  onResetFilters,
}: ProductGridProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  if (products.length === 0) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">No matching products found</h3>
        <p className="text-xs text-gray-500 max-w-sm mt-1 mb-6">
          We couldn't find any products matching your current search or filter combination. Try adjusting or clearing your filters.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Reset All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode={viewMode}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ))}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
}