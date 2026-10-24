import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import DestinationGrid from "@/components/destinations/DestinationGrid";

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900 flex flex-col justify-between">
      <SiteNavbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-12">
          {/* Page Header matching mockup */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              All Destinations
            </h1>
            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Explore the most beautiful and culturally rich places in Ethiopia.
            </p>
          </div>

          {/* Search, Category Filters, and 3-column Grid */}
          <DestinationGrid columns={3} showFilters={true} />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
