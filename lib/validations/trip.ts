import { z } from "zod";

export const createTripSchema = z
  .object({
    title: z.string().trim().min(1, "Trip title is required").max(100),
    description: z.string().trim().max(2000).optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    estimatedBudget: z.number().nonnegative().optional(),
    currency: z.string().trim().length(3).default("ETB"),
    notes: z.string().trim().max(2000).optional(),
  })
  .refine(
    (data) =>
      !data.startDate ||
      !data.endDate ||
      data.endDate >= data.startDate,
    {
      message: "End date must be on or after the start date",
      path: ["endDate"],
    },
  );

export type CreateTripInput = z.infer<typeof createTripSchema>;