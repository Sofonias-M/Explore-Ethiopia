import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
];

export default function SiteNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#faf9f6]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-900 text-lg font-bold text-white">
            E
          </span>

          <span>
            <span className="block text-lg font-bold tracking-tight text-stone-900">
              Explore Ethiopia
            </span>
            <span className="block text-xs tracking-wide text-stone-500">
              Discover the extraordinary
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-600 transition hover:text-emerald-800"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 sm:inline-flex"
          >
            Log in
          </Link>

          <Link
            href="/login"
            className="rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Plan your trip
          </Link>
        </div>
      </nav>
    </header>
  );
}