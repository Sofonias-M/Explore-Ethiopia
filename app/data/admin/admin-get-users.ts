import "server-only";
import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";

export async function adminGetUsers() {
  await requireAdmin();

  const data = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      emailVerified: true,
      createdAt: true,
      _count: {
        select: {
          trips: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return data;
}

export type AdminUsersData = Awaited<ReturnType<typeof adminGetUsers>>;
