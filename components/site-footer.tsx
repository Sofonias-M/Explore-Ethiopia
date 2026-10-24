import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-stone-950 text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
        <div>
          <Link href="/" className="text-xl font-bold text-white">
            Explore Ethiopia
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-7 text-stone-400">
            Discover Ethiopia's remarkable landscapes, ancient history,
            rich cultures, and unforgettable destinations.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-white">Explore</h2>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <Link
              href="/destinations"
              className="transition hover:text-white"
            >
              Destinations
            </Link>

            <Link href="/login" className="transition hover:text-white">
              Plan your trip
            </Link>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-white">Our purpose</h2>

          <p className="mt-4 text-sm leading-7 text-stone-400">
            Helping travelers discover the beauty and diversity of Ethiopia.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-stone-500 lg:px-10">
          © {new Date().getFullYear()} Explore Ethiopia. All rights reserved.
        </div>
      </div>
    </footer>
  );
}