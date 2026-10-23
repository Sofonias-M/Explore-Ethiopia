import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Plus,
  Pencil,
  Globe,
  GlobeLock,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { Suspense } from "react";
import DeleteDestinationButton from "@/components/admin/delete-destination-button";

export default async function AdminDestinationsPage() {
  return (
    <div>
      <Suspense
        fallback={
          <p className="text-sm text-gray-600" role="status">
            Loading destinations...
          </p>
        }
      >
        <DestinationList />
      </Suspense>
    </div>
  );
}
async function DestinationList() {
  let destinations;
  try {
    destinations = await prisma.destination.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
  } catch (error) {
    console.error("Failed to load admin destinations:", error);

    return (
      <section className="mx-auto max-w-6xl">
        <Link
          href="/admin"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h1 className="text-xl font-semibold text-red-900">
            Unable to load destinations
          </h1>

          <p className="mt-2 text-sm text-red-800">
            We could not retrieve destinations from the database. Please check
            your database connection and try again.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="mx-auto max-w-6xl">
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-gray-900"
      >
        <ArrowLeft size={16} />
        Back to dashboard
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-700">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Destination Management
          </h1>

          <p className="mt-2 text-gray-600">
            Manage the destinations available on Explore Ethiopia.
          </p>
        </div>

        <Link
          href="/admin/destinations/new"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-medium text-white transition hover:bg-emerald-800"
        >
          <Plus size={18} />
          Add destination
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
              <MapPin size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total destinations</p>
              <p className="text-2xl font-bold text-gray-900">
                {destinations.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
              <Globe size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Published destinations</p>
              <p className="text-2xl font-bold text-gray-900">
                {destinations.filter((destination) => destination.isPublished)
                  .length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            All destinations
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Destinations are ordered by their most recent update.
          </p>
        </div>

        {destinations.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <MapPin size={26} />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No destinations yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
              Start building the destination collection by adding your first
              Ethiopian travel destination.
            </p>

            <Link
              href="/admin/destinations/new"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-medium text-white transition hover:bg-emerald-800"
            >
              <Plus size={18} />
              Add your first destination
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {destinations.map((destination) => (
              <article
                key={destination.id}
                className="flex flex-col gap-4 px-6 py-5 transition hover:bg-gray-50 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-semibold text-gray-900">
                      {destination.name}
                    </h3>

                    {destination.isPublished ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">
                        <Globe size={13} />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                        <GlobeLock size={13} />
                        Unpublished
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    {destination.region}
                  </p>

                  <p className="mt-3 max-w-3xl whitespace-pre-line text-sm leading-6 text-gray-600">
                    {destination.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                    {destination.estimatedCost !== null && (
                      <span>
                        Estimated cost:{" "}
                        {Number(destination.estimatedCost).toLocaleString(
                          "en-US",
                          {
                            maximumFractionDigits: 2,
                          },
                        )}
                      </span>
                    )}

                    <span>
                      Updated{" "}
                      {destination.updatedAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <Link
                    href={`/admin/destinations/${destination.id}/edit`}
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    <Pencil size={15} />
                    Edit
                  </Link>
                  <DeleteDestinationButton
                    destinationId={destination.id}
                    destinationName={destination.name}
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}