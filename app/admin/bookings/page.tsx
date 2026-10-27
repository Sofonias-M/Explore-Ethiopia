import { adminGetBookings } from "@/app/data/admin/admin-get-bookings";
import { requireAdmin } from "@/app/data/admin/require-admin";
import { BookingsTable } from "./_components/BookingsTable";

export default async function AdminBookingsPage() {
  await requireAdmin();
  const data = await adminGetBookings();

  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="mb-8 text-2xl font-bold">Bookings</h1>
      <BookingsTable data={data} />
    </div>
  );
}
