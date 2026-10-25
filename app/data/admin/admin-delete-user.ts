"use server";

import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";
import { APIResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function deleteUser(userId: string): Promise<APIResponse> {
  const session = await requireAdmin();

  if (session.user.id === userId) {
    return { status: "error", message: "You can't delete your own account" };
  }

  try {
    await prisma.user.delete({ where: { id: userId } });
  } catch {
    return { status: "error", message: "Failed to delete user" };
  }

  revalidatePath("/admin/users");
  return { status: "success", message: "User deleted" };
}
