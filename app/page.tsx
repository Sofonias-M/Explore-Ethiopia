import { Suspense } from "react";
import { getSession } from "@/lib/get-session";
import HomeClient from "@/components/home-client";
import { userGetDestinations } from "./data/user/user-get-destinations";
import { Skeleton } from "@/components/ui/skeleton";
import { PublicDestinationCardSkeleton } from "@/components/public/PublicDestinationCard";

async function HomeContent() {
  const session = await getSession();
  const destinations = await userGetDestinations();

  return (
    <HomeClient
      user={
        session
          ? {
              name: session.user.name,
              image: session.user.image,
              email: session.user.email,
            }
          : null
      }
      destinations={destinations}
    />
  );
}

function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar Skeleton */}
      <div className="sticky top-0 z-50 flex h-16 items-center justify-between border-b px-6 lg:px-12 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-9 w-24 rounded-full" />
      </div>

      {/* Hero Section Skeleton */}
      <div className="mx-auto max-w-5xl px-6 py-20 text-center space-y-6">
        <div className="mx-auto flex justify-center">
          <Skeleton className="h-7 w-48 rounded-full" />
        </div>
        <div className="space-y-3">
          <Skeleton className="mx-auto h-12 w-3/4 max-w-2xl" />
          <Skeleton className="mx-auto h-6 w-2/3 max-w-xl" />
        </div>
        <div className="mx-auto max-w-md pt-4">
          <Skeleton className="h-12 w-full rounded-2xl" />
        </div>
      </div>

      {/* Featured Destinations Grid Skeleton */}
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12 space-y-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <PublicDestinationCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}

