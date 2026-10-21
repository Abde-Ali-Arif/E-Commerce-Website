"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Sparkles,
  Flame,
  ChevronDown,
  Layers,
  Phone,
  Info,
  ArrowRight,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { products, productCategories } from "../../data/products";
import { Product } from "../../types";

export default function Navbar() {
  const router = useRouter();
  const { openCart, cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // Filter search live
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const matches = products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        )
        .slice(0, 5);
      setSearchResults(matches);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Click outside to close search suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchFocused(false);
    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
      {/* Top Notification Announcement Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        <span>
          Summer Flash Sale: Use code <strong className="text-white font-bold tracking-wider">SAVE20</strong> for 20% OFF!
        </span>
        <span className="hidden sm:inline text-slate-600">|</span>
        <span className="hidden sm:inline text-slate-400">Free Express Delivery on orders over ₹999</span>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4 sm:gap-8">
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition">
                <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-gray-900 leading-none">
                  Market<span className="text-indigo-600">ly</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-0.5">
                  Premium Store
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Live Search Bar */}
          <div ref={searchRef} className="relative hidden md:block flex-1 max-w-lg">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search headphones, shoes, laptops, apparel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full h-11 pl-10 pr-20 bg-gray-100/90 hover:bg-gray-100 focus:bg-white text-sm text-gray-900 rounded-full border border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-full shadow-sm transition"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in-50">
                <div className="p-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <span>Suggested Products ({searchResults.length})</span>
                  <Link
                    href={`/products?search=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setIsSearchFocused(false)}
                    className="text-indigo-600 hover:underline capitalize"
                  >
                    View all results
                  </Link>
                </div>
                <div className="divide-y divide-gray-100">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.id}`}
                      onClick={() => {
                        setIsSearchFocused(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-indigo-50/50 transition group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 group-hover:text-indigo-600 line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-gray-500">{item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-gray-900">
                          ₹{item.price.toLocaleString()}
                        </p>
                        {item.discountPercentage && (
                          <span className="text-[10px] text-rose-600 font-semibold">
                            {item.discountPercentage}% OFF
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-700">
            <Link
              href="/products"
              className="hover:text-indigo-600 transition flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4 text-indigo-500" />
              <span>Catalog</span>
            </Link>

            {/* Categories Menu */}
            <div
              className="relative"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <button className="hover:text-indigo-600 transition flex items-center gap-1 py-2">
                <span>Categories</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in-50">
                  {productCategories
                    .filter((c) => c.id !== "all")
                    .map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/products?category=${encodeURIComponent(cat.id)}`}
                        onClick={() => setCategoriesDropdownOpen(false)}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[11px] font-medium text-gray-400">
                          {cat.count} items
                        </span>
                      </Link>
                    ))}
                </div>
              )}
            </div>

            <Link
              href="/deals"
              className="text-rose-600 hover:text-rose-700 transition flex items-center gap-1"
            >
              <Flame className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Deals</span>
            </Link>

            <Link
              href="/about"
              className="hover:text-indigo-600 transition"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="hover:text-indigo-600 transition"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Icons: Wishlist & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-rose-600 transition"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gray-900 hover:bg-indigo-600 text-white text-xs font-bold transition shadow-md shadow-gray-900/10 cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="flex h-5 min-w-[20px] px-1 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-extrabold text-white">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (Visible only on mobile) */}
      <div className="md:hidden px-4 pb-3 border-t border-gray-100 pt-2 bg-gray-50/50">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 bg-white text-xs text-gray-900 rounded-lg border border-gray-200 outline-none focus:border-indigo-500"
          />
        </form>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-6 shadow-xl space-y-4 animate-in slide-in-from-top-2">
          <nav className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              All Products Catalog
            </Link>
            <Link
              href="/deals"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50 transition"
            >
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 fill-rose-500 text-rose-500" /> Flash Deals
              </span>
              <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Hot
              </span>
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              <span>My Wishlist</span>
              <span className="text-xs text-gray-500 font-medium">({wishlistCount})</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              About Marketly
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              Support & Contact
            </Link>
          </nav>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 px-3">
              Shop Categories
            </p>
            <div className="grid grid-cols-2 gap-1">
              {productCategories
                .filter((c) => c.id !== "all")
                .map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${encodeURIComponent(cat.id)}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-gray-50"
                  >
                    {cat.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}