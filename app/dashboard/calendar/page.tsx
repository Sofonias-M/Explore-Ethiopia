import { Suspense } from "react";
import Link from "next/link";
import { CalendarCheck2, Compass } from "lucide-react";
import { requireUser } from "@/app/data/user/require-user";
import { userGetDashboardData } from "@/app/data/user/user-get-dashboard-data";
import { BookingCalendar } from "@/components/dashboard/booking-calendar";
import { buttonVariants } from "@/components/ui/button";

async function CalendarContent() {
  const user = await requireUser();
  const { bookings } = await userGetDashboardData(user.id);

  return <BookingCalendar bookings={bookings} />;
}

export default function UserCalendarPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header section with right action links */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Schedule & Itineraries
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-1">
            Tour Booking Calendar
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Browse all your booked dates, tour departure days, and duration across Ethiopia.
          </p>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard"
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "rounded-xl h-9 text-xs gap-1.5",
            })}
          >
            <CalendarCheck2 className="size-4 text-primary" />
            <span>Bookings List</span>
          </Link>

          <Link
            href="/destinations"
            className={buttonVariants({
              size: "sm",
              className: "rounded-xl h-9 text-xs gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90",
            })}
          >
            <Compass className="size-4" />
            <span>Explore More Tours</span>
          </Link>
        </div>
      </div>

      {/* Full Page Interactive Calendar wrapped in Suspense */}
      <Suspense
        fallback={
          <div className="flex h-96 items-center justify-center rounded-xl border bg-card text-sm text-muted-foreground">
            Loading calendar...
          </div>
        }
      >
        <CalendarContent />
      </Suspense>
    </div>
  );
}
