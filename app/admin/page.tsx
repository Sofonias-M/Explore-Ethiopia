import { Suspense } from "react";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { adminGetBookingStats } from "../data/admin/admin-get-booking-stats";

async function AdminDashboardContent() {
  const bookingData = await adminGetBookingStats();
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive data={bookingData} />
      </div>
    </>
  );
}

export default function AdminIndexPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center rounded-xl border bg-card text-sm text-muted-foreground">
          Loading dashboard...
        </div>
      }
    >
      <AdminDashboardContent />
    </Suspense>
  );
}
