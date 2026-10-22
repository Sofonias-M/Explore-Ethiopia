
"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/lib/get-session";
import {
  createTripSchema,
  type CreateTripInput,
} from "@/lib/validations/trip";

type CreateTripResult =
  | { success: true; tripId: string }
  | { success: false; error: string };

export async function createTrip(
  input: CreateTripInput,
): Promise<CreateTripResult> {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return { success: false, error: "You must be signed in." };
    }

    const parsed = createTripSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message ?? "Invalid trip details.",
      };
    }

    const data = parsed.data;

    const trip = await prisma.trip.create({
      data: {
        title: data.title,
        description: data.description || null,
        startDate: data.startDate ?? null,
        endDate: data.endDate ?? null,
        estimatedBudget: data.estimatedBudget ?? null,
        currency: data.currency,
        notes: data.notes || null,
        userId: session.user.id,
      },
      select: { id: true },
    });

    return { success: true, tripId: trip.id };
  } catch (error) {
    console.error("Create trip failed:", error);
    return { success: false, error: "Failed to create trip." };
  }
}

export async function getMyTrips() {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return { success: false as const, error: "You must be signed in." };
    }

    const trips = await prisma.trip.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        tripDestinations: {
          orderBy: { order: "asc" },
          include: {
            destination: {
              select: {
                id: true,
                name: true,
                slug: true,
                region: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    return { success: true as const, trips };
  } catch (error) {
    console.error("Get my trips failed:", error);
    return { success: false as const, error: "Failed to retrieve your trips." };
  }
}

