import { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Details */}
      <div className="p-4">
        <p className="text-xs font-medium text-gray-400">
          {product.category}
        </p>

        <h3 className="mt-1 truncate font-semibold text-gray-900">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>

          <span className="text-sm font-medium text-yellow-500">
            ★ {product.rating}
          </span>
        </div>
      </div>
    </div>
  );
}