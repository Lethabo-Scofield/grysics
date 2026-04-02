import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-serif text-neutral-900 mb-4">Olyxee</h1>
      <p className="text-neutral-500 mb-8">AI infrastructure for the real world.</p>
      <Link href="/products/grysics" className="px-6 py-3 bg-neutral-900 text-white rounded-full text-sm font-medium hover:bg-black transition-colors">
        View Grysics →
      </Link>
    </div>
  );
}
