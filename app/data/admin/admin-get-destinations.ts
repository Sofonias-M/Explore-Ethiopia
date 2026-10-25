import "server-only";

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetDestinations() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  //   await requireAdmin();

  const data = await prisma.location.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      place: true,
      slug: true,
      category: true,
      imageUrls: true,
      //   smallDescription: true,
      //   level: true,
      //   status: true,
      //   price: true,
      //   fileKey: true,
    },
  });

  return data;
}

export type AdminDestinationType = Awaited<
  ReturnType<typeof adminGetDestinations>
>[0];
