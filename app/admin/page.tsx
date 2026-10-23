import Link from "next/link";
import {
  MapPin,
  Plus,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Page heading */}
      <header>
        <p className="text-sm font-medium text-emerald-700">
          Administration
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
          Admin Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-gray-600">
          Manage destinations and maintain the travel discovery
          experience for Explore Ethiopia.
        </p>
      </header>

      {/* Overview cards */}
      <section
        aria-label="Administration overview"
        className="grid gap-5 sm:grid-cols-2"
      >
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50">
            <MapPin
              className="h-6 w-6 text-emerald-700"
              aria-hidden="true"
            />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-gray-950">
            Destination Management
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            View destinations and manage the information presented
            to travelers.
          </p>

          <Link
            href="/admin/destinations"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Manage destinations

            <ArrowRight
              className="h-4 w-4"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
            <ShieldCheck
              className="h-6 w-6 text-blue-700"
              aria-hidden="true"
            />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-gray-950">
            Access Control
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Administrative pages require server-side authentication
            and administrator access verification.
          </p>
        </div>
      </section>

      {/* Quick actions */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-950">
          Quick Actions
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Start managing the destinations available on the platform.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/admin/destinations"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            <MapPin
              className="h-4 w-4"
              aria-hidden="true"
            />

            View destinations
          </Link>

          <Link
            href="/admin/destinations/new"
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Plus
              className="h-4 w-4"
              aria-hidden="true"
            />

            Add destination
          </Link>
        </div>
      </section>
    </div>
  );
}