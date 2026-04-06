export default function Footer() {
  return (
    <footer className="py-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="text-[13px] text-neutral-300">
          &copy; {new Date().getFullYear()} Grysics
        </span>

        <nav className="flex items-center gap-8">
          {["Docs", "Contact", "Olyxee"].map((label) => (
            <a
              key={label}
              href="#"
              className="text-[13px] text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
