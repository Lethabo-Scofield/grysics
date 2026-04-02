export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <p className="font-serif text-lg text-neutral-900">Grysics</p>
            <p className="text-xs text-neutral-400 mt-1">AI verification engine.</p>
          </div>

          <div className="flex flex-wrap gap-6">
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
          </div>
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
