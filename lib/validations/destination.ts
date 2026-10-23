import { z } from "zod";

export const destinationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Destination name must be at least 2 characters.")
    .max(100, "Destination name must be 100 characters or fewer."),

  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters.")
    .max(120, "Slug must be 120 characters or fewer.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers, and single hyphens only.",
    ),

  region: z
    .string()
    .trim()
    .min(2, "Region must be at least 2 characters.")
    .max(100, "Region must be 100 characters or fewer."),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters.")
    .max(10000, "Description must be 10,000 characters or fewer."),

  imageUrl: z
    .union([z.literal(""), z.url("Enter a valid image URL.")])
    .optional(),

  estimatedCost: z
    .union([
      z.literal(""),
      z.coerce.number().finite().min(0).max(99999999.99),
    ])
    .optional(),

  bestTimeToVisit: z
    .string()
    .trim()
    .max(200, "Best time to visit must be 200 characters or fewer.")
    .optional(),

  isPublished: z.boolean(),
});

export type DestinationFormValues = z.infer<typeof destinationSchema>;