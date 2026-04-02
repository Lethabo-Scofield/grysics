import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <p className="font-serif text-lg text-neutral-900">Olyxee</p>
            <p className="text-xs text-neutral-400 mt-1">AI infrastructure for the real world.</p>
          </div>

          <div className="flex flex-wrap gap-6">
            <Link href="/products/grysics" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Grysics
            </Link>
            <Link href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-100">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} Olyxee, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
