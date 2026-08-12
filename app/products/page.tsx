"use client";

import { useState } from "react";

import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";

import { products as allProducts} from "../../data/products";
import { Product } from "../../data/products";

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(allProducts);

  const handleFilterChange = (
    categories: string[],
    minPrice: number,
    maxPrice: number,
    rating: number
  ) => {
    const result = allProducts.filter((product) => {
      // Category condition
      const categoryMatch =
        categories.length === 0 ||
        categories.includes(product.category);

      // Price condition
      const priceMatch =
        product.price >= minPrice &&
        product.price <= maxPrice;

      // Rating condition
      const ratingMatch =
        product.rating >= rating;

      // ALL conditions must pass
      return (
        categoryMatch &&
        priceMatch &&
        ratingMatch
      );
    });

    setFilteredProducts(result);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">
            All Products
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Find products that match your preferences.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6">
        {/* Sidebar */}
        <div className="hidden w-64 shrink-0 md:block">
          <ProductFilters
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Products */}
        <div className="min-w-0 flex-1">
          {/* Result count */}
          <div className="mb-5">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">
                {filteredProducts.length}
              </span>{" "}
              products found
            </p>
          </div>

          <ProductGrid
            products={filteredProducts}
          />
        </div>
      </section>
    </main>
  );
}