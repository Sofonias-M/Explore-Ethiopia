import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations } from "@/lib/destinations";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";

type DestinationDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DestinationDetailsPage({
  params,
}: DestinationDetailsPageProps) {
  const { id } = await params;

  const destination = destinations.find(
    (item) => item.slug === id || item.id === id
  );

  if (!destination) {
    notFound();
  }

  return (
    <>
    <SiteNavbar />
    <main className="min-h-screen bg-[#faf9f6] text-gray-900">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-10">
        <Link
          href="/destinations"
          className="text-sm font-semibold text-emerald-800 hover:underline"
        >
          ← All destinations
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="relative h-72 bg-gray-200 sm:h-96 lg:h-[480px]">
            <img
              src={destination.imageUrl}
              alt={destination.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white sm:p-10">
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur">
                {destination.category}
              </span>
              <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
                {destination.name}
              </h1>
              <p className="mt-2 text-white/90">
                {destination.region}, Ethiopia
              </p>
            </div>
          </div>

          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_300px]">
            <section>
              <h2 className="text-2xl font-bold">About this destination</h2>
              <p className="mt-4 leading-8 text-gray-600">
                {destination.description}
              </p>

              <h2 className="mt-8 text-2xl font-bold">Why visit?</h2>
              <p className="mt-3 leading-8 text-gray-600">
                Discover the history, landscapes, and local culture that make{" "}
                {destination.name} a memorable part of Ethiopia.
              </p>
            </section>

            <aside className="h-fit rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold">Travel information</h2>

              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-sm text-gray-500">Region</p>
                  <p className="mt-1 font-semibold">{destination.region}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Best time to visit</p>
                  <p className="mt-1 font-semibold">
                    {destination.bestTimeToVisit}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Estimated cost</p>
                  <p className="mt-1 font-semibold">
                    ${destination.estimatedCost} per person
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Illustrative estimate; confirm actual prices before travel.
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Visitor rating</p>
                  <p className="mt-1 font-semibold text-amber-600">
                    ★ {destination.rating} ({destination.reviews} reviews)
                  </p>
                </div>
              </div>

              <Link
                href="/login"
                className="mt-7 block rounded-xl bg-emerald-800 px-5 py-3 text-center font-semibold text-white transition hover:bg-emerald-900"
              >
                Plan your trip
              </Link>
            </aside>
          </div>
        </div>
      </div> 
    </main>
<SiteFooter />
  </>
  );
}