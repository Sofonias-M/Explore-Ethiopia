
import { z } from "zod";

export const createTripSchema = z
  .object({
    title: z.string().trim().min(1, "Trip title is required").max(100),

    description: z.string().trim().max(2000).optional(),

    startDate: z.coerce.date().optional(),

    endDate: z.coerce.date().optional(),

    estimatedBudget: z
      .number()
      .finite("Budget must be a valid number")
      .nonnegative("Budget cannot be negative")
      .optional(),

    currency: z
      .string()
      .trim()
      .transform((value) => value.toUpperCase())
      .pipe(z.string().regex(/^[A-Z]{3}$/, "Currency must be a 3-letter code"))
      .default("ETB"),

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

export type CreateTripInput = z.input<typeof createTripSchema>;
