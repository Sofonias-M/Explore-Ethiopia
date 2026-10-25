import "server-only";
import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function adminGetDestination(id: string) {
  await requireAdmin();

  const data = await prisma.location.findUnique({
    where: { id: id },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      place: true,
      coordinates: true,
      imageUrls: true,
      startDate: true,
      durationDays: true,
      price: true,
      category: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export type AdminDestinationSingularData = Awaited<
  ReturnType<typeof adminGetDestination>
>;
