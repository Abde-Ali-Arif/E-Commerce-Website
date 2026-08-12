"use client";

import { useState } from "react";

interface ProductFiltersProps {
  onFilterChange: (
    categories: string[],
    minPrice: number,
    maxPrice: number,
    rating: number
  ) => void;
}

const categories = [
  "Electronics",
  "Apparel",
  "Footwear",
  "Accessories",
];

export default function ProductFilters({
  onFilterChange,
}: ProductFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [rating, setRating] = useState(0);

  const updateFilters = (
    categories: string[],
    min: number,
    max: number,
    selectedRating: number
  ) => {
    onFilterChange(categories, min, max, selectedRating);
  };

  const toggleCategory = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);

    updateFilters(
      updatedCategories,
      minPrice,
      maxPrice,
      rating
    );
  };

  const changeMinPrice = (value: number) => {
    const newMin = Math.min(value, maxPrice - 1000);

    setMinPrice(newMin);

    updateFilters(
      selectedCategories,
      newMin,
      maxPrice,
      rating
    );
  };

  const changeMaxPrice = (value: number) => {
    const newMax = Math.max(value, minPrice + 1000);

    setMaxPrice(newMax);

    updateFilters(
      selectedCategories,
      minPrice,
      newMax,
      rating
    );
  };

  const changeRating = (value: number) => {
    setRating(value);

    updateFilters(
      selectedCategories,
      minPrice,
      maxPrice,
      value
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMinPrice(0);
    setMaxPrice(100000);
    setRating(0);

    updateFilters([], 0, 100000, 0);
  };

  return (
    <aside className="sticky top-24 rounded-xl border border-gray-200 bg-white p-5">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">
          Filters
        </h2>

        <button
          onClick={clearFilters}
          className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
        >
          Clear all
        </button>
      </div>

      {/* Category */}
      <div className="border-b border-gray-100 pb-5">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">
          Category
        </h3>

        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="h-4 w-4 rounded accent-indigo-600"
              />

              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="border-b border-gray-100 py-5">
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Price Range
        </h3>

        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="rounded-md bg-gray-100 px-2 py-1 text-gray-600">
            ₹{minPrice.toLocaleString()}
          </span>

          <span className="text-gray-400">—</span>

          <span className="rounded-md bg-gray-100 px-2 py-1 text-gray-600">
            ₹{maxPrice.toLocaleString()}
          </span>
        </div>

        {/* Minimum */}
        <input
          type="range"
          min="0"
          max="100000"
          step="1000"
          value={minPrice}
          onChange={(e) =>
            changeMinPrice(Number(e.target.value))
          }
          className="w-full accent-indigo-600"
        />

        {/* Maximum */}
        <input
          type="range"
          min="0"
          max="100000"
          step="1000"
          value={maxPrice}
          onChange={(e) =>
            changeMaxPrice(Number(e.target.value))
          }
          className="mt-2 w-full accent-indigo-600"
        />
      </div>

      {/* Rating */}
      <div className="pt-5">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">
          Minimum Rating
        </h3>

        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((value) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <input
                type="radio"
                name="rating"
                checked={rating === value}
                onChange={() => changeRating(value)}
                className="h-4 w-4 accent-indigo-600"
              />

              <span className="text-yellow-500">
                {"★".repeat(value)}
              </span>

              <span className="text-gray-500">
                & above
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}