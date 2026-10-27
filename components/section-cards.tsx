import { adminGetDashboardStats } from "@/app/data/admin/admin-get-dashboard-data";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Book,
  DollarSign,
  MapPin,
  ShoppingCart,
  Users,
  UserStarIcon,
} from "lucide-react";
// import { adminGetDashboardStats } from "@/app/data/admin/admin-get-dashboard-stats";

export async function SectionCards() {
  const { totalCustomers, totalDestinations, totalRevenue, totalSignups } =
    await adminGetDashboardStats();
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalSignups}
            </CardTitle>
          </div>
          {/* <IconUsers className="size-6 text-muted-foreground" /> */}
          <Users className="size-6 text-muted-foreground" />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">
            Registered users on the platform
          </p>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="">
            <CardDescription>Total Customers</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalCustomers}
            </CardTitle>
          </div>
          <UserStarIcon className="size-6 text-muted-foreground" />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground"> Users who have booked a tour</p>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="">
            <CardDescription>Total Destinations</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalDestinations}
            </CardTitle>
          </div>
          {/* <IconShoppingCart className="size-6 text-muted-foreground" /> */}
          <MapPin className="size-6 text-muted-foreground" />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">Places which are listed</p>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalRevenue.toString()} Br
            </CardTitle>
          </div>
          <DollarSign className="size-6 text-muted-foreground" />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">
            Total earnings from the bookings
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export function SectionCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="@container/card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
            <Skeleton className="size-6 rounded-md" />
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <Skeleton className="h-3 w-40" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

