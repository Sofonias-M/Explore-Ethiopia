import { Suspense } from "react";
import { adminGetBookings } from "@/app/data/admin/admin-get-bookings";
import { requireAdmin } from "@/app/data/admin/require-admin";
import { BookingsTable, BookingsTableSkeleton } from "./_components/BookingsTable";

async function BookingsContent() {
  await requireAdmin();
  const data = await adminGetBookings();

  return <BookingsTable data={data} />;
}

export default function AdminBookingsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="mb-8 text-2xl font-bold">Bookings</h1>
      <Suspense fallback={<BookingsTableSkeleton />}>
        <BookingsContent />
      </Suspense>
    </div>
  );
}

