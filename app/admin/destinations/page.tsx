import { Suspense } from "react";
import { adminGetDestinations } from "@/app/data/admin/admin-get-destinations";
import { DestinationCard, DestinationCardSkeleton } from "./_components/DestinationCard";

async function DestinationsContent() {
  const data = await adminGetDestinations();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((destination) => (
        <DestinationCard key={destination.id} destination={destination} />
      ))}
    </div>
  );
}

function DestinationsGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <DestinationCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function DestinationsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="mb-8 text-2xl font-bold">Destinations</h1>
      <Suspense fallback={<DestinationsGridSkeleton />}>
        <DestinationsContent />
      </Suspense>
    </div>
  );
}

