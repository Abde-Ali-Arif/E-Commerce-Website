import { Product } from "../data/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({
  products,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-gray-200 bg-white text-center">
        <div className="text-4xl">🔍</div>

        <h2 className="mt-4 text-lg font-semibold text-gray-900">
          No items match your criteria
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Try changing or resetting your filters.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Reset filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}