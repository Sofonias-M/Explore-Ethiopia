import { Suspense } from "react";
import { adminGetBookings } from "@/app/data/admin/admin-get-bookings";
import { requireAdmin } from "@/app/data/admin/require-admin";
import { BookingsTable } from "./_components/BookingsTable";

async function BookingsContent() {
  await requireAdmin();
  const data = await adminGetBookings();

  return <BookingsTable data={data} />;
}

export default function AdminBookingsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="mb-8 text-2xl font-bold">Bookings</h1>
      <Suspense
        fallback={
          <div className="flex h-48 items-center justify-center rounded-xl border bg-card text-sm text-muted-foreground">
            Loading bookings...
          </div>
        }
      >
        <BookingsContent />
      </Suspense>
    </div>
  );
}
