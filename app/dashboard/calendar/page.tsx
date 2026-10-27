import { Suspense } from "react";
import Link from "next/link";
import { CalendarCheck2, Compass } from "lucide-react";
import { requireUser } from "@/app/data/user/require-user";
import { userGetDashboardData } from "@/app/data/user/user-get-dashboard-data";
import { BookingCalendar } from "@/components/dashboard/booking-calendar";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

async function CalendarContent() {
  const user = await requireUser();
  const { onlyBookedDestinations } = await userGetDashboardData(user.id);

  return <BookingCalendar bookings={onlyBookedDestinations} />;
}

function CalendarSkeleton() {
  return (
    <Card className="overflow-hidden border border-border/80 shadow-xs">
      {/* Calendar Header Toolbar Skeleton */}
      <CardHeader className="flex flex-col gap-4 border-b border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-44 rounded-xl" />
          <Skeleton className="h-8 w-16 rounded-lg" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </CardHeader>

      <CardContent className="p-2 sm:p-4">
        {/* Day of Week Headers */}
        <div className="grid grid-cols-7 gap-1 border-b border-border/60 pb-2 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="flex justify-center py-1">
              <Skeleton className="h-4 w-8" />
            </div>
          ))}
        </div>

        {/* 5-Week Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 pt-2">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="min-h-[75px] sm:min-h-[95px] rounded-xl border border-border/40 p-2 flex flex-col justify-between bg-muted/20"
            >
              <Skeleton className="size-5 rounded-full" />
              {i % 4 === 1 && <Skeleton className="h-4 w-full rounded" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
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
            Browse all your booked dates, tour departure days, and duration
            across Ethiopia.
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
              className:
                "rounded-xl h-9 text-xs gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90",
            })}
          >
            <Compass className="size-4" />
            <span>Explore More Tours</span>
          </Link>
        </div>
      </div>

      {/* Full Page Interactive Calendar wrapped in Suspense with Skeleton */}
      <Suspense fallback={<CalendarSkeleton />}>
        <CalendarContent />
      </Suspense>
    </div>
  );
}
