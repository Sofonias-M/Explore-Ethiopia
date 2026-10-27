"use server";

import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";
import { APIResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function deleteBooking(bookingId: string): Promise<APIResponse> {
  await requireAdmin();

  try {
    await prisma.booking.delete({
      where: { id: bookingId },
    });
  } catch {
    return { status: "error", message: "Failed to delete booking" };
  }

  revalidatePath("/admin/bookings");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/calendar");
  return { status: "success", message: "Booking removed successfully" };
}
