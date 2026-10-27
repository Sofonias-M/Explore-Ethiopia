import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";

import { adminGetBookingStats } from "../data/admin/admin-get-booking-stats";

export default async function AdminIndexPage() {
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
