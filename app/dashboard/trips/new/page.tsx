
"use client";

import Link from "next/link";
import TripForm from "@/app/componets/trips/TripForm";

export default function NewTripPage() {
  return (
    <main className="min-h-screen bg-stone-50 p-6 text-stone-900">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-stone-600 hover:text-stone-900"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="mb-2 text-3xl font-bold">Create a New Trip</h1>
        <p className="mb-8 text-stone-600">
          Add your destination and budget to start planning your trip.
        </p>

        <TripForm />
      </div>
    </main>
  );
}
