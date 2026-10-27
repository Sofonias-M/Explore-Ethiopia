import { Suspense } from "react";
import { adminGetDestinations } from "@/app/data/admin/admin-get-destinations";
import { DestinationCard } from "./_components/DestinationCard";

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

export default function DestinationsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="mb-8 text-2xl font-bold">Destinations</h1>
      <Suspense
        fallback={
          <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
            Loading destinations...
          </div>
        }
      >
        <DestinationsContent />
      </Suspense>
    </div>
  );
}
