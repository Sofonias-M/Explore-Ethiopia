import "server-only";

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetDashboardStats() {
  await requireAdmin();

  const [totalSignups, totalCustomers, totalDestinations, revenueResult] =
    await Promise.all([
      // total signups
      prisma.user.count({
        where: {
          role: "user",
        },
      }),

      // total customers (users with at least one enrollment)
      prisma.user.count({
        where: {
          bookings: {
            some: {},
          },
        },
      }),

      // total destinations
      prisma.location.count(),

      // total revenue from ACTIVE bookings
      prisma.booking.aggregate({
        where: {
          status: "Active",
        },
        _sum: {
          amount: true,
        },
      }),
    ]);

  const totalRevenue = revenueResult._sum.amount ?? 0;

  return {
    totalSignups,
    totalCustomers,
    totalDestinations,
    totalRevenue,
  };
}
