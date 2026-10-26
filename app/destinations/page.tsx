import { Mountain } from "lucide-react";
import { userGetDestinations } from "@/app/data/user/user-get-destinations";
import { PublicDestinationCard } from "@/components/public/PublicDestinationCard";

export default async function DestinationsPage() {
  const destinations = await userGetDestinations();

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 sm:py-16 lg:px-12">
      <div className="mb-10">
        <p className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          <Mountain size={14} className="text-brand-accent" />
          Made for the curious
        </p>
        <h1 className="max-w-xl text-3xl font-medium leading-tight tracking-[-0.05em] sm:text-5xl">
          Explore all destinations.
        </h1>
      </div>

      {destinations.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No destinations are published yet. Check back soon.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <PublicDestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>
      )}
    </div>
  );
}
