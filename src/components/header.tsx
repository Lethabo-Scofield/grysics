'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-[15px] font-medium tracking-tight text-neutral-900">
          Grysics
        </Link>

        <a
          href="#"
          className="text-[13px] text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
        >
          Sign in
        </a>
      </div>
    </header>
  );
}
