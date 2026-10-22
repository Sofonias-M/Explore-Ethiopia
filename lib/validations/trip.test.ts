
import { describe, expect, it } from "vitest";
import { createTripSchema } from "./trip";

describe("createTripSchema", () => {
  it("accepts valid trip data", () => {
    const result = createTripSchema.safeParse({
      title: "Lalibela Trip",
      estimatedBudget: 5000,
      currency: "ETB",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an empty title", () => {
    const result = createTripSchema.safeParse({
      title: "   ",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a negative budget", () => {
    const result = createTripSchema.safeParse({
      title: "Lalibela Trip",
      estimatedBudget: -100,
    });

    expect(result.success).toBe(false);
  });

  it("normalizes currency to uppercase", () => {
    const result = createTripSchema.safeParse({
      title: "Lalibela Trip",
      currency: "etb",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.currency).toBe("ETB");
    }
  });

  it("rejects an end date before the start date", () => {
    const result = createTripSchema.safeParse({
      title: "Lalibela Trip",
      startDate: "2026-12-10",
      endDate: "2026-12-05",
    });

    expect(result.success).toBe(false);
  });
});
