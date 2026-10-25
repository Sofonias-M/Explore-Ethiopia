import { adminGetDestinations } from "@/app/data/admin/admin-get-destinations";
import { DestinationCard } from "./_components/DestinationCard";
// import { DestinationCard } from "@/components/admin/DestinationCard";

export default async function DestinationsPage() {
  const data = await adminGetDestinations();

  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="mb-8 text-2xl font-bold">Destinations</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  );
}
