import "server-only";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function userGetDestination(slug: string) {
  const data = await prisma.location.findUnique({
    where: { slug, isPublished: true },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      place: true,
      category: true,
      imageUrls: true,
      price: true,
      currency: true,
      startDate: true,
      durationDays: true,
      tourGuide: {
        select: { id: true, name: true, image: true },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return { ...data, price: Number(data.price) };
}

export type UserDestinationData = Awaited<
  ReturnType<typeof userGetDestination>
>;
