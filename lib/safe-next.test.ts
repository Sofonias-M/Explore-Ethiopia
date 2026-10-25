import { describe, expect, it } from "vitest";
import { safeNextPath } from "./safe-next";

describe("safeNextPath", () => {
  it("allows an internal path with query and hash", () => {
    expect(safeNextPath("/dashboard/trips?view=upcoming#list")).toBe(
      "/dashboard/trips?view=upcoming#list",
    );
  });

  it("uses the home page when the value is absent", () => {
    expect(safeNextPath(null)).toBe("/");
    expect(safeNextPath(undefined)).toBe("/");
  });

  it.each([
    "https://evil.example",
    "//evil.example",
    "///evil.example",
    "/\\evil.example",
    "javascript:alert(1)",
    " dashboard",
    "/dashboard\\evil",
  ])("rejects unsafe redirect %s", (value) => {
    expect(safeNextPath(value)).toBe("/");
  });
});
