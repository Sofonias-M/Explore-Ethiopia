import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  Clock,
  Compass,
  Ticket,
} from "lucide-react";

interface DashboardStatsProps {
  stats: {
    totalBookings: number;
    verifiedBookings: number;
    pendingBookings: number;
    unbookedCount: number;
    totalSpent: number;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {/* Total Bookings */}
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardDescription>Total Bookings</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {stats.totalBookings}
            </CardTitle>
          </div>
          <Ticket className="size-6 text-muted-foreground" />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">
            {stats.totalBookings === 0
              ? "No reservations made yet"
              : `${stats.totalBookings} total tour reservations`}
          </p>
        </CardFooter>
      </Card>

      {/* Verified Bookings */}
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardDescription>Verified & Confirmed</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {stats.verifiedBookings}
            </CardTitle>
          </div>
          <CheckCircle2 className="size-6 text-muted-foreground" />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">
            {stats.verifiedBookings === 0
              ? "No verified bookings yet"
              : "Payment verified and spots locked in"}
          </p>
        </CardFooter>
      </Card>

      {/* Pending Verification */}
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardDescription>Pending Verification</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {stats.pendingBookings}
            </CardTitle>
          </div>
          <Clock className="size-6 text-muted-foreground" />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">
            {stats.pendingBookings === 0
              ? "All active bookings are verified"
              : "Awaiting confirmation or payment completion"}
          </p>
        </CardFooter>
      </Card>

      {/* Unbooked Destinations */}
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardDescription>Unexplored Tours</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {stats.unbookedCount}
            </CardTitle>
          </div>
          <Compass className="size-6 text-muted-foreground" />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">
            Places across Ethiopia waiting for you
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
