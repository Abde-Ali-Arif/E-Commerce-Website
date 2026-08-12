import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            All Products
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Discover products that match your preferences.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6">
        {/* Filters */}
        <aside className="hidden w-60 shrink-0 md:block">
          <ProductFilters />
        </aside>

        {/* Products */}
        <div className="min-w-0 flex-1">
          {/* Results Header */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">24</span>{" "}
              products
            </p>

            <select
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              defaultValue="relevance"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          {/* Product Grid */}
          <ProductGrid />
        </div>
      </section>
    </main>
  );
}