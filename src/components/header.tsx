'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-lg text-neutral-900 tracking-tight">
          Olyxee
        </Link>

        <nav className="hidden sm:flex items-center gap-8">
          <Link href="/products/grysics" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
            Grysics
          </Link>
          <Link href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
            Docs
          </Link>
          <Link href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
            Blog
          </Link>
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <Link href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
            Sign in
          </Link>
          <Link
            href="/products/grysics"
            className="px-4 py-2 bg-neutral-900 text-white text-sm rounded-full hover:bg-black transition-colors"
          >
            Get started
          </Link>
        </div>

        <button
          className="sm:hidden p-2 text-neutral-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {menuOpen ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-neutral-100 bg-white px-4 py-4 flex flex-col gap-4">
          <Link href="/products/grysics" className="text-sm text-neutral-600">Grysics</Link>
          <Link href="#" className="text-sm text-neutral-600">Docs</Link>
          <Link href="#" className="text-sm text-neutral-600">Blog</Link>
          <Link href="#" className="text-sm text-neutral-600">Sign in</Link>
        </div>
      )}
    </header>
  );
}
