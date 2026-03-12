"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🌸</span>
            <span className="font-bold text-xl text-gray-900 tracking-tight">
              Petal <span className="text-rose-500">&amp; Co</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-rose-500 transition-colors">
              All Flowers
            </Link>
            <Link href="/products?category=bouquets" className="text-sm font-medium text-gray-600 hover:text-rose-500 transition-colors">
              Bouquets
            </Link>
            <Link href="/products?category=plants" className="text-sm font-medium text-gray-600 hover:text-rose-500 transition-colors">
              Plants
            </Link>
            <Link href="/products?category=gift-sets" className="text-sm font-medium text-gray-600 hover:text-rose-500 transition-colors">
              Gift Sets
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/products"
              className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-rose-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-rose-100 py-4 space-y-3">
            <Link href="/products" className="block text-sm font-medium text-gray-700 hover:text-rose-500 py-1" onClick={() => setMenuOpen(false)}>All Flowers</Link>
            <Link href="/products?category=bouquets" className="block text-sm font-medium text-gray-700 hover:text-rose-500 py-1" onClick={() => setMenuOpen(false)}>Bouquets</Link>
            <Link href="/products?category=plants" className="block text-sm font-medium text-gray-700 hover:text-rose-500 py-1" onClick={() => setMenuOpen(false)}>Plants</Link>
            <Link href="/products?category=gift-sets" className="block text-sm font-medium text-gray-700 hover:text-rose-500 py-1" onClick={() => setMenuOpen(false)}>Gift Sets</Link>
            <Link href="/products" className="block bg-rose-500 text-white text-sm font-semibold px-4 py-2 rounded-full text-center mt-2" onClick={() => setMenuOpen(false)}>Order Now</Link>
          </div>
        )}
      </div>
    </header>
  );
}
