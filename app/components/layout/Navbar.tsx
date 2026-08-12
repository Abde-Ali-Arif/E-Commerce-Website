import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-gray-900"
        >
          Market<span className="text-indigo-600">ly</span>
        </Link>

        {/* Search */}
        <div className="relative hidden max-w-xl flex-1 md:block">
          <input
            type="text"
            placeholder="Search products..."
            className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            🔍
          </span>
        </div>

        {/* Links */}
        <nav className="hidden items-center gap-5 sm:flex">
          <Link
            href="/products"
            className="text-sm font-medium text-gray-600 transition hover:text-indigo-600"
          >
            Products
          </Link>

          <Link
            href="/deals"
            className="text-sm font-medium text-gray-600 transition hover:text-indigo-600"
          >
            Deals
          </Link>
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1">
          <button className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-indigo-600">
            ♡
          </button>

          <button className="relative rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-indigo-600">
            🛒
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[9px] font-bold text-white">
              0
            </span>
          </button>

          <button className="hidden rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 sm:block">
            Account
          </button>
        </div>
      </div>
    </header>
  );
}