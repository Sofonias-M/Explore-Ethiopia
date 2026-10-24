import Link from "next/link";
import DestinationGrid from "@/components/destinations/DestinationGrid";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";

export default function DestinationsPage() {
  return (
    <>
    <SiteNavbar />
    <main className="min-h-screen bg-[#faf9f6]">
      <section className="bg-emerald-950 px-6 py-16 text-white sm:px-12">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="text-sm text-emerald-200 hover:underline">
            ← Back to home
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
            Discover Ethiopia
          </p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Explore Destinations
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/80">
            Find your next adventure, from ancient historical sites to
            breathtaking landscapes and unforgettable cultural experiences.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-12">
        <DestinationGrid />
        <SiteFooter />
      </section>
    </main>
    </>
  );
}