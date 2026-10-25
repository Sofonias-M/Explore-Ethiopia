"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { APIResponse } from "@/lib/types";
import { locationSchema, LocationSchemaType } from "@/lib/zodSchema";

export async function CreateDestination(
  values: LocationSchemaType,
): Promise<APIResponse> {
  const session = await requireAdmin();
  try {
    // const req = await request();
    // const decision = await aj.protect(req, {
    //   fingerprint: session.user.id,
    // });

    // if (decision.isDenied()) {
    //   return {
    //     status: "error",
    //     message: "Too many requests. Please try again later.",
    //   };
    // }

    const validation = locationSchema.safeParse(values);
    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid Form Data",
      };
    }

    const data = await prisma.location.create({
      data: {
        ...validation.data,
        // userId: session?.user.id as string, //TODO: get user from session
      },
    });

    return {
      status: "success",
      message: "Destionation created successfully",
    };
  } catch (e) {
    // console.log(e);
    return {
      status: "error",
      message: "Failed to create destionation",
    };
  }
}
