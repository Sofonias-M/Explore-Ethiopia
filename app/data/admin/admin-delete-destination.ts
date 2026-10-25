"use server";

import { auth } from "@/lib/auth"; // adjust to wherever your Better Auth instance lives
import { prisma } from "@/lib/db"; // adjust to your Prisma client export
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "./require-admin";

export async function deleteDestination(id: string) {
  //   const session = await auth.api.getSession({ headers: await headers() });

  //   if (!session || session.user.role !== "admin") {
  //     return { status: "error" as const, message: "Not authorized" };
  //   }
  await requireAdmin();

  try {
    await prisma.location.delete({ where: { id } });
  } catch {
    // Most likely a foreign-key restrict (e.g. tripDestinations/bookings referencing it)
    return {
      status: "error" as const,
      message: "Couldn't delete — this destination is used elsewhere.",
    };
  }

  revalidatePath("/admin/destinations");
  return { status: "success" as const, message: "Destination deleted" };
}
