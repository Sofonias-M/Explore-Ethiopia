"use server";

import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";
import { APIResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { USER_ROLES, type UserRole } from "./roles";

export async function updateUserRole(
  userId: string,
  role: UserRole,
): Promise<APIResponse> {
  const session = await requireAdmin();

  if (!USER_ROLES.includes(role)) {
    return { status: "error", message: "Invalid role" };
  }

  // Stop an admin from locking themselves out by demoting their own account
  if (session.user.id === userId && role !== "admin") {
    return {
      status: "error",
      message: "You can't change your own role away from admin",
    };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  } catch {
    return { status: "error", message: "Failed to update role" };
  }

  revalidatePath("/admin/users");
  return { status: "success", message: "Role updated" };
}
