import "server-only";
import { prisma } from "@/lib/db";

export async function userGetDestinations() {
  const data = await prisma.location.findMany({
    where: { isPublished: true },
    select: {
      id: true,
      title: true,
      slug: true,
      place: true,
      category: true,
      imageUrls: true,
      price: true,
      currency: true,
      startDate: true,
      durationDays: true,
    },
    orderBy: { startDate: "asc" },
  });

  // Prisma's Decimal can't cross the server -> client boundary as a prop,
  // so convert it here, once, rather than in every component that uses it.
  return data.map((destination) => ({
    ...destination,
    price: Number(destination.price),
  }));
}

export type UserDestinationsData = Awaited<
  ReturnType<typeof userGetDestinations>
>;