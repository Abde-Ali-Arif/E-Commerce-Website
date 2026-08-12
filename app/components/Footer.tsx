import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-xl font-extrabold tracking-tight text-gray-900"
            >
              Market<span className="text-indigo-600">ly</span>
            </Link>

            <p className="mt-1 text-xs text-gray-500">
              Simple shopping. Better choices.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link
              href="/products"
              className="text-gray-500 transition hover:text-indigo-600"
            >
              Products
            </Link>

            <Link
              href="/deals"
              className="text-gray-500 transition hover:text-indigo-600"
            >
              Deals
            </Link>

            <Link
              href="/about"
              className="text-gray-500 transition hover:text-indigo-600"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-gray-500 transition hover:text-indigo-600"
            >
              Contact
            </Link>

            <Link
              href="/privacy"
              className="text-gray-500 transition hover:text-indigo-600"
            >
              Privacy
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 border-t border-gray-200 pt-5 text-center text-xs text-gray-400 sm:flex sm:justify-between">
          <span>© {new Date().getFullYear()} Marketly</span>
          <span className="mt-1 sm:mt-0">
            Built for a better shopping experience.
          </span>
        </div>

      </div>
    </footer>
  );
}