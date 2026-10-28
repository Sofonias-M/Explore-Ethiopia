import { Suspense } from "react";
import { Mountain } from "lucide-react";
import { userGetDestinations } from "@/app/data/user/user-get-destinations";
import {
  PublicDestinationCard,
  PublicDestinationCardSkeleton,
} from "@/components/public/PublicDestinationCard";
import { Skeleton } from "@/components/ui/skeleton";

async function DestinationsContent() {
  const destinations = await userGetDestinations();

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 sm:py-16 lg:px-12">
      <div className="mb-12">
        <p className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          <Mountain size={15} className="text-[#C69A45]" />
          Made for the curious
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold leading-[1.1] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
          Explore all{" "}
          <span className="font-medium italic text-[#244B3C]">
            destinations.
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          From dramatic highlands to ancient wonders, discover the places that make
          Ethiopia unforgettable.
        </p>
        <div className="mt-7 h-1 w-16 rounded-full bg-[#C69A45]" />
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

function PublicDestinationsPageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 sm:py-16 lg:px-12">
      <div className="mb-10 space-y-4">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-12 w-96 max-w-full" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <PublicDestinationCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function DestinationsPage() {
  return (
    <Suspense fallback={<PublicDestinationsPageSkeleton />}>
      <DestinationsContent />
    </Suspense>
  );
}

