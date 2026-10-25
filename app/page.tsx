import Link from "next/link";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import DestinationGrid from "@/components/destinations/DestinationGrid";
import HeroSearch from "@/components/hero-search";
import { Compass, Landmark, Mountain, Sparkles } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900 flex flex-col justify-between">
      <SiteNavbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative flex min-h-[520px] items-center overflow-hidden bg-stone-900 sm:min-h-[580px] lg:min-h-[640px]">
          <Image
            src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2200&q=90"
            alt="Majestic Ethiopian landscape with dramatic green mountain peaks"
            fill
            unoptimized
            priority
            className="object-cover object-center"
          />

          {/* Dark gradient overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">
                DISCOVER THE EXTRAORDINARY
              </span>

              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Explore Ethiopia
              </h1>

              <p className="mt-4 text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
                From ancient churches to breathtaking landscapes, experience the
                rich culture, history and natural beauty of Ethiopia.
              </p>

              <HeroSearch />
            </div>
          </div>
        </section>

        {/* POPULAR DESTINATIONS */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Popular Destinations
              </h2>
            </div>

            <Link
              href="/destinations"
              className="group flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition"
            >
              <span>View all</span>
              <span className="transition group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          <DestinationGrid limit={4} showFilters={false} columns={4} />
        </section>

        {/* CULTURAL & TRAVEL HIGHLIGHTS */}
        <section id="about" className="border-t border-gray-200 bg-white py-16 px-6 sm:px-10 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
                A Land of Origins
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Why Travel to Ethiopia?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                Home to nine UNESCO World Heritage Sites, dramatic highlands,
                living ancient traditions, and warm hospitality.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-gray-100 bg-[#faf9f6] p-6 text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 mb-4">
                  <Landmark className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900">Ancient Heritage</h3>
                <p className="mt-2 text-xs leading-5 text-gray-600">
                  Marvel at 800-year-old rock-hewn churches in Lalibela and 2,000-year-old obelisks in Axum.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-[#faf9f6] p-6 text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 mb-4">
                  <Mountain className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900">Spectacular Nature</h3>
                <p className="mt-2 text-xs leading-5 text-gray-600">
                  Trek across Simien peaks over 4,000 meters and explore the colorful geothermal Dallol springs.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-[#faf9f6] p-6 text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 mb-4">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900">Living Cultures</h3>
                <p className="mt-2 text-xs leading-5 text-gray-600">
                  Experience traditional coffee ceremonies, vibrant festivals like Timkat, and warm local traditions.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-[#faf9f6] p-6 text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 mb-4">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900">Authentic Journeys</h3>
                <p className="mt-2 text-xs leading-5 text-gray-600">
                  Plan personalized travel itineraries that connect you directly with local guides and communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section id="contact" className="bg-emerald-950 py-16 px-6 text-white sm:px-10 lg:px-12">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                Start Planning
              </span>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl text-white">
                Ready for your Ethiopian journey?
              </h2>
              <p className="mt-3 text-sm text-emerald-100/80 leading-relaxed">
                Discover all destinations, save your favorites to your wishlist,
                and build your customized travel itinerary.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/destinations"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50 shadow-md"
              >
                Browse All Destinations
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
