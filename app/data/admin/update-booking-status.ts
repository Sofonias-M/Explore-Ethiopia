"use server";

import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";
import { APIResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { BOOKING_STATUSES, BookingStatusType } from "./status";

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatusType,
): Promise<APIResponse> {
  await requireAdmin();

  if (!BOOKING_STATUSES.includes(status)) {
    return { status: "error", message: "Invalid booking status" };
  }

  try {
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status,
        updatedAt: new Date(),
      },
    });
  } catch {
    return { status: "error", message: "Failed to update booking status" };
  }

  revalidatePath("/admin/bookings");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/calendar");
  return { status: "success", message: `Booking status updated to ${status}` };
}
