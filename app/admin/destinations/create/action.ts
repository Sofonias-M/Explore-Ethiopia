"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { APIResponse } from "@/lib/types";
import { locationSchema, LocationSchemaType } from "@/lib/zodSchema";

export async function CreateDestination(
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

    await prisma.location.create({
      data: {
        ...validation.data,
        // userId: session?.user.id as string, //TODO: get user from session
      },
    });

    return {
      status: "success",
      message: "Destionation created successfully",
    };
  } catch {
    // console.log(e);
    return {
      status: "error",
      message: "Failed to create destionation",
    };
  }
}
