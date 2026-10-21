"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Share2,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
  MessageSquarePlus,
  X,
  Check,
} from "lucide-react";
import { products } from "../../data/products";
import { Product, Review } from "../../types";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useToast } from "../../context/ToastContext";
import ProductCard from "../ProductCard";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const productId = parseInt(resolvedParams.id, 10);

  const product = products.find((p) => p.id === productId);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const [activeImage, setActiveImage] = useState<string>(
    product?.images?.[0] || product?.image || ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors?.[0]?.name || ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes?.[0] || ""
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"features" | "specs" | "shipping" | "reviews">("features");

  // Review submission modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [localReviews, setLocalReviews] = useState<Review[]>(product?.reviews || []);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-sm text-gray-500 mb-6">
          The item you are looking for may have been removed or is temporarily unavailable.
        </p>
        <Link
          href="/products"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      showToast("Product link copied to clipboard!", "success");
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    const newRev: Review = {
      id: `r-user-${Date.now()}`,
      author: reviewAuthor.trim(),
      rating: reviewRating,
      date: "Just now",
      comment: reviewComment.trim(),
      verified: true,
    };

    setLocalReviews([newRev, ...localReviews]);
    setReviewAuthor("");
    setReviewComment("");
    setReviewModalOpen(false);
    showToast("Thank you! Your verified review has been published.", "success");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-gray-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <Link href="/" className="hover:text-indigo-600 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link href="/products" className="hover:text-indigo-600 transition">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="hover:text-indigo-600 transition"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-900 truncate font-semibold max-w-[200px] sm:max-w-xs">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-3xl border border-gray-200/90 shadow-sm">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 group">
              <img
                src={activeImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />

              {/* Discount Badge */}
              {product.discountPercentage && (
                <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-md">
                  {product.discountPercentage}% OFF
                </div>
              )}

              {/* Share & Wishlist overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl bg-white/90 backdrop-blur-md text-gray-700 hover:bg-white hover:text-indigo-600 transition shadow-sm"
                  title="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-xl backdrop-blur-md transition shadow-sm ${
                    inWishlist
                      ? "bg-rose-50 text-rose-600 ring-2 ring-rose-400"
                      : "bg-white/90 text-gray-700 hover:bg-white hover:text-rose-600"
                  }`}
                  title="Toggle Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? "fill-rose-500 text-rose-500" : ""}`} />
                </button>
              </div>
            </div>

            {/* Thumbnail Ribbon */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                      (activeImage || product.image) === img
                        ? "border-indigo-600 ring-2 ring-indigo-200"
                        : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Purchase Form */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2">
                <Link
                  href={`/products?category=${encodeURIComponent(product.category)}`}
                  className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md hover:bg-indigo-100 transition"
                >
                  {product.category}
                </Link>

                <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-800 font-bold">{product.rating}</span>
                  <span className="text-gray-400">({localReviews.length} reviews)</span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug mt-3">
                {product.name}
              </h1>

              {/* Price & Savings */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-extrabold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                    Save ₹{((product.originalPrice || 0) - product.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Stock Status Indicator */}
              <div className="mt-3 flex items-center gap-2 text-xs">
                {product.inStock ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> In Stock • Ready to Dispatch (Only {product.stockCount} units left)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-rose-600 font-semibold bg-rose-50 px-2.5 py-1 rounded-full">
                    Currently Out of Stock
                  </span>
                )}
              </div>

              <p className="mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-800">
                      Color Selection
                    </label>
                    <span className="text-xs font-medium text-indigo-600">
                      {selectedColor || product.colors[0].name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`group flex items-center gap-2 p-1.5 pr-3 rounded-full border transition cursor-pointer ${
                          (selectedColor || product.colors?.[0]?.name) === c.name
                            ? "border-indigo-600 bg-indigo-50/50 shadow-xs"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-black/10 shadow-inner"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-xs font-semibold text-gray-800">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selectors */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-800">
                      Size Option
                    </label>
                    <span className="text-xs text-gray-500 font-medium">Standard Fit</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                          (selectedSize || product.sizes?.[0]) === sz
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="mt-6">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-800 block mb-2">
                  Quantity
                </label>
                <div className="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 h-11">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 hover:bg-gray-200 text-gray-600 font-bold transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-bold text-sm text-gray-900 min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 hover:bg-gray-200 text-gray-600 font-bold transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Purchase CTA Buttons */}
            <div className="space-y-3 pt-6 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-sm rounded-2xl shadow-lg transition cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-600/30 transition cursor-pointer"
                >
                  Buy Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Reassurance Value Props */}
              <div className="grid grid-cols-3 gap-2 pt-4 text-center">
                <div className="p-2.5 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-[11px] text-gray-600 font-medium">
                  <Truck className="w-4 h-4 text-indigo-600 mb-1" />
                  <span>Free Express Delivery</span>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-[11px] text-gray-600 font-medium">
                  <RotateCcw className="w-4 h-4 text-indigo-600 mb-1" />
                  <span>30-Day Returns</span>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-[11px] text-gray-600 font-medium">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 mb-1" />
                  <span>1-Yr Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Product Details */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-10">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 overflow-x-auto gap-4 sm:gap-8 pb-4">
            <button
              onClick={() => setActiveTab("features")}
              className={`text-sm font-bold pb-2 transition cursor-pointer shrink-0 ${
                activeTab === "features"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Key Features & Benefits
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`text-sm font-bold pb-2 transition cursor-pointer shrink-0 ${
                activeTab === "specs"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`text-sm font-bold pb-2 transition cursor-pointer shrink-0 ${
                activeTab === "shipping"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Shipping & Returns
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`text-sm font-bold pb-2 transition cursor-pointer shrink-0 ${
                activeTab === "reviews"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Verified Reviews ({localReviews.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="pt-6">
            {activeTab === "features" && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-lg font-bold text-gray-900">Why You'll Love It</h3>
                <ul className="space-y-3">
                  {product.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="max-w-2xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Detailed Specifications</h3>
                <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
                  {Object.entries(product.specs || {}).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between p-3.5 text-xs sm:text-sm bg-white even:bg-gray-50">
                      <span className="font-semibold text-gray-600">{key}</span>
                      <span className="font-medium text-gray-900">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="max-w-2xl space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
                <h3 className="text-lg font-bold text-gray-900">Shipping & Delivery Information</h3>
                <p>
                  All orders are dispatched within 24 business hours from our temperature-controlled fulfilment hubs. You will receive real-time SMS and email tracking updates.
                </p>
                <div className="space-y-2 pt-2">
                  <p className="font-semibold text-gray-900">• Standard Delivery: 3-5 business days (Free over ₹999)</p>
                  <p className="font-semibold text-gray-900">• Express Air Dispatch: 1-2 business days (+₹199)</p>
                  <p className="font-semibold text-gray-900">• 30-Day Hassle-Free Returns & Replacements</p>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Customer Ratings & Reviews</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-sm font-extrabold text-gray-900">{product.rating} out of 5</span>
                      <span className="text-xs text-gray-500">({localReviews.length} global ratings)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setReviewModalOpen(true)}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
                  >
                    <MessageSquarePlus className="w-4 h-4" /> Write a Review
                  </button>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {localReviews.map((rev) => (
                    <div key={rev.id} className="p-5 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                            {rev.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-900">{rev.author}</p>
                            <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] text-gray-400">{rev.date}</span>
                      </div>

                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-xs text-gray-700 leading-relaxed pt-1">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Recommendation */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Frequently Bought Together
              </h2>
              <Link
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                View Category <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Review Submission Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setReviewModalOpen(false)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100">
              <button
                onClick={() => setReviewModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-gray-900 mb-1">Write a Review</h3>
              <p className="text-xs text-gray-500 mb-4">
                Share your authentic thoughts on {product.name}
              </p>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Your Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setReviewRating(s)}
                        className="p-1 text-amber-400 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            s <= reviewRating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Siddharth Rao"
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Your Review
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="What did you like or dislike about this product?"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
