import Link from 'next/link';
import Image from 'next/image';

const footerLinks = [
  { label: 'Request a Demo', href: '/demo' },
  { label: 'Contact', href: 'mailto:scofield@olyxee.com?subject=Grysics%20Inquiry', external: true },
  { label: 'Olyxee', href: 'https://olyxee.com', external: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 py-10 sm:py-12 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/grysics-logo.png" alt="Grysics" width={24} height={24} className="rounded-md" style={{ width: 24, height: 24 }} />
            <p className="font-serif text-lg text-neutral-900">Grysics</p>
          </Link>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3">
            {footerLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors py-1"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors py-1"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} Grysics by Olyxee. All rights reserved.
          </p>
          <a href="mailto:scofield@olyxee.com" className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
            scofield@olyxee.com
          </a>
        </div>
      </div>
    </footer>
  );
}
