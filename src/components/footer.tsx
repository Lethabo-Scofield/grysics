import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 py-10 sm:py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex items-center gap-2.5">
            <Image src="/images/grysics-logo.png" alt="Grysics" width={24} height={24} className="rounded-md" style={{ width: 24, height: 24 }} />
            <p className="font-serif text-lg text-neutral-900">Grysics</p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3">
            <a href="#features" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              How it works
            </a>
            <a href="#performance" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Performance
            </a>
            <a href="#early-access" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Early Access
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-100">
          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} Grysics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
