import "server-only";

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetBookingStats() {
  await requireAdmin();

  const thirtyDaysAgo = new Date();

  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const bookings = await prisma.booking.findMany({
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const last30Days: { date: string; bookings: number }[] = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date();

    date.setDate(date.getDate() - i);

    last30Days.push({
      date: date.toISOString().split("T")[0], //yyyy-mm-dd
      bookings: 0,
    });
  }

  bookings.forEach((booking) => {
    const bookingDate = booking.createdAt.toISOString().split("T")[0];
    const dayIndex = last30Days.findIndex((day) => day.date === bookingDate);

    if (dayIndex !== -1) {
      last30Days[dayIndex].bookings++;
    }
  });

  return last30Days;
}
