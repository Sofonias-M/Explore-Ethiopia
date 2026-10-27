import { Suspense } from "react";
import Link from "next/link";
import { CalendarDays, Compass } from "lucide-react";
import { requireUser } from "@/app/data/user/require-user";
import { userGetDashboardData } from "@/app/data/user/user-get-dashboard-data";
import {
  DashboardStats,
  DashboardStatsSkeleton,
} from "@/components/dashboard/dashboard-stats";
import {
  BookingsDataTable,
  BookingsDataTableSkeleton,
} from "@/components/dashboard/bookings-data-table";
import {
  UnbookedDestinationsList,
  UnbookedDestinationsListSkeleton,
} from "@/components/dashboard/unbooked-destinations-list";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

async function DashboardContent() {
  const user = await requireUser();
  const { bookings, unbookedDestinations, stats } =
    await userGetDashboardData(user.id);

  return (
    <div className="flex flex-col gap-8">
      {/* Top Header Section with Greeting and Action buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Traveler Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-1">
            Welcome back, {user.name ? user.name.split(" ")[0] : "Traveler"}!
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Track your verified tour reservations, departure schedules, and unexplored destinations.
          </p>
        </div>

        {/* Right side navigation actions replicating admin header controls */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/calendar"
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "rounded-xl h-9 text-xs gap-1.5",
            })}
          >
            <CalendarDays className="size-4 text-primary" />
            <span>Full Calendar</span>
          </Link>

          <Link
            href="/destinations"
            className={buttonVariants({
              size: "sm",
              className: "rounded-xl h-9 text-xs gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90",
            })}
          >
            <Compass className="size-4" />
            <span>Explore All Tours</span>
          </Link>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <DashboardStats stats={stats} />

      {/* Requirement 1 & 2: User's Bookings Data Table */}
      <section className="flex flex-col gap-4">
        <BookingsDataTable bookings={bookings} />
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-border/60 my-2" />

      {/* Requirement 3: Unbooked Destinations with PublicDestinationCard */}
      <section className="flex flex-col gap-4">
        <UnbookedDestinationsList destinations={unbookedDestinations} />
      </section>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {/* Top Header Section Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="size-2 rounded-full" />
            <Skeleton className="h-3.5 w-24" />
          </div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-9 w-28 rounded-xl" />
          <Skeleton className="h-9 w-36 rounded-xl" />
        </div>
      </div>

      {/* Summary Stat Cards Skeleton */}
      <DashboardStatsSkeleton />

      {/* Bookings Data Table Skeleton */}
      <BookingsDataTableSkeleton />

      <div className="h-px w-full bg-border/60 my-2" />

      {/* Unbooked Destinations Skeleton */}
      <UnbookedDestinationsListSkeleton />
    </div>
  );
}

export default function UserDashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}

