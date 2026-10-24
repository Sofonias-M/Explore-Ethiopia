
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/app/componets/lib/redux/hooks";
import TripForm from "@/app/componets/trips/TripForm";

export default function EditTripPage() {
  const params = useParams<{ id: string }>();
  const tripId = Number(params.id);

  const trip = useAppSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId)
  );

  if (!Number.isInteger(tripId) || tripId <= 0) {
    return <p className="p-6">Invalid trip ID.</p>;
  }

  if (!trip) {
    return (
      <main className="min-h-screen bg-stone-50 p-6 text-stone-900">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold">Trip not found</h1>
          <p className="mt-2 text-stone-600">
            This trip may have been deleted or the ID may be incorrect.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block font-semibold text-green-800 hover:underline"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 p-6 text-stone-900">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-stone-600 hover:underline"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="mb-2 text-3xl font-bold">Edit Trip</h1>
        <p className="mb-8 text-stone-600">
          Update the details for {trip.title}.
        </p>

        <TripForm key={trip.id} trip={trip} />
      </div>
    </main>
  );
}
