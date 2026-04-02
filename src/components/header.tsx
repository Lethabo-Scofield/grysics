'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-neutral-200/60 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/images/grysics-logo.png"
            alt="Grysics"
            width={32}
            height={32}
            className="rounded-lg transition-transform duration-200 group-hover:scale-105"
          />
          <span className={`font-serif text-xl tracking-tight transition-colors duration-300 ${
            scrolled ? 'text-neutral-900' : 'text-white'
          }`}>
            Grysics
          </span>
        </Link>

        <nav className="hidden md:flex items-center">
          <div className={`flex items-center gap-1 px-2 py-1.5 rounded-full transition-colors duration-300 ${
            scrolled ? 'bg-neutral-100/80' : 'bg-white/10 backdrop-blur-sm'
          }`}>
            {[
              { label: 'Features', href: '#features' },
              { label: 'How it works', href: '#how-it-works' },
              { label: 'Performance', href: '#performance' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  scrolled
                    ? 'text-neutral-500 hover:text-neutral-900 hover:bg-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="hidden md:flex items-center">
          <a
            href="#early-access"
            className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
              scrolled
                ? 'bg-neutral-900 text-white hover:bg-black shadow-sm'
                : 'bg-white text-neutral-900 hover:bg-white/90 shadow-lg shadow-black/10'
            }`}
          >
            Get Early Access
          </a>
        </div>

        <button
          className={`md:hidden p-2.5 rounded-xl transition-colors duration-200 ${
            scrolled ? 'text-neutral-600 hover:bg-neutral-100' : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen ? (
              <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M3 7h16M3 11h16M3 15h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-neutral-100"
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {[
                { label: 'Features', href: '#features' },
                { label: 'How it works', href: '#how-it-works' },
                { label: 'Performance', href: '#performance' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-neutral-100">
                <a
                  href="#early-access"
                  className="flex items-center justify-center px-5 py-3 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-black transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Early Access
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
