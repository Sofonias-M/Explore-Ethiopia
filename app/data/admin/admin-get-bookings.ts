import "server-only";

import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";

export async function adminGetBookings() {
  await requireAdmin();

  const data = await prisma.booking.findMany({
    select: {
      id: true,
      status: true,
      amount: true,
      currency: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      location: {
        select: {
          id: true,
          title: true,
          slug: true,
          place: true,
          startDate: true,
          durationDays: true,
          price: true,
          currency: true,
          imageUrls: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return data.map((b) => ({
    ...b,
    amount: Number(b.amount),
    location: {
      ...b.location,
      price: Number(b.location.price),
    },
  }));
}

export type AdminBookingsData = Awaited<ReturnType<typeof adminGetBookings>>;
