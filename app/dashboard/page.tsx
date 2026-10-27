import { requireUser } from "@/app/data/user/require-user";
import { userGetDashboardData } from "@/app/data/user/user-get-dashboard-data";
import { BookingsDataTable } from "@/components/dashboard/bookings-data-table";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { UnbookedDestinationsList } from "@/components/dashboard/unbooked-destinations-list";

export default async function UserDashboardPage() {
  const user = await requireUser();
  const { bookings, unbookedDestinations, stats } = await userGetDashboardData(
    user.id,
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Top Header Section with Greeting and Action buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-1">
            Welcome back, {user.name ? user.name.split(" ")[0] : "Traveler"}!
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Track your verified tour reservations, departure schedules, and
            unexplored destinations.
          </p>
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
