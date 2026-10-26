import "server-only";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function checkIfLocationBooked(
  locationId: string,
): Promise<boolean> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return false;

  const booking = await prisma.booking.findUnique({
    where: {
      userId_locationId: {
        locationId: locationId,
        userId: session.user.id,
      },
    },
    select: {
      status: true,
    },
  });

  return booking?.status === "Active" ? true : false;
}
