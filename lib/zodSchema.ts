import { z } from "zod";

export const courseCategories = [
  "Historical",
  "Natural",
  "Cultural",
  "Adventure",
] as const;

export const coordinateSchema = z.object({
  lat: z.number().min(-90, "Latitude must be between -90 and 90").max(90),
  lng: z.number().min(-180, "Longitude must be between -180 and 180").max(180),
});

export const locationSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),

  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug can only contain lowercase letters, numbers and hyphens",
    }),

  category: z.enum(courseCategories, {
    message: "Category is required",
  }),

  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" })
    .max(2500, { message: "Description must not exceed 2500 characters" }),

  // Human-readable place, e.g. "Lalibela, Ethiopia"
  place: z
    .string()
    .min(2, { message: "Place is required" })
    .max(120, { message: "Place must not exceed 120 characters" }),

  // Pins shown on the map, e.g. [{ lat: 12.03, lng: 39.04 }]
  coordinates: z
    .array(coordinateSchema)
    .min(1, { message: "Add at least one map pin" })
    .max(20, { message: "You can add at most 20 map pins" }),

  // Mirrors the "max 4 pictures" rule; the DB column is String[]
  imageUrls: z
    .array(z.string().min(1))
    .min(1, { message: "Add at least one picture" })
    .max(4, { message: "You can upload at most 4 pictures" }),
  // z.coerce handles string -> Date/number from form inputs
  startDate: z.coerce.date({ message: "Start date is required" }),

  durationDays: z.coerce
    .number()
    .int({ message: "Duration must be a whole number of days" })
    .min(1, { message: "Duration must be at least 1 day" })
    .max(365, { message: "Duration cannot exceed 365 days" }),

  price: z.coerce.number().min(1, { message: "Price must be at least 1" }),

  //   currency: z
  //     .string()
  //     .length(3, { message: "Use a 3-letter currency code" })
  //     .transform((v) => v.toUpperCase())
  //     .default("ETB"),

  //   isPublished: z.boolean().default(true),

  // The tour guide is a User; optional until one is assigned
  tourGuideId: z.string().min(1).nullable().optional(),
});

// Values the form works with (before coercion/defaults)
export type LocationFormValues = z.input<typeof locationSchema>;
// Validated data you pass to Prisma (after coercion/defaults)
export type LocationSchemaType = z.infer<typeof locationSchema>;
