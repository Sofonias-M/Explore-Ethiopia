"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { APIResponse } from "@/lib/types";
import { locationSchema, LocationSchemaType } from "@/lib/zodSchema";

export async function UpdateDestination(
  id: string,
  values: LocationSchemaType,
): Promise<APIResponse> {
  await requireAdmin();

  try {
    const validation = locationSchema.safeParse(values);
    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid Form Data",
      };
    }

    await prisma.location.update({
      where: { id },
      data: validation.data,
    });

    return {
      status: "success",
      message: "Destination updated successfully",
    };
  } catch (e) {
    return {
      status: "error",
      message: "Failed to update destination",
    };
  }
}
