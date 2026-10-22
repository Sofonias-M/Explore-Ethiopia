
import { beforeEach, describe, expect, it, vi } from "vitest";

const { getSessionMock, tripCreateMock, tripFindManyMock, tripUpdateManyMock, tripDeleteManyMock } =
  vi.hoisted(() => ({
    getSessionMock: vi.fn(),
    tripCreateMock: vi.fn(),
    tripFindManyMock: vi.fn(),
    tripUpdateManyMock: vi.fn(),
    tripDeleteManyMock: vi.fn(),
  }));

vi.mock("@/lib/get-session", () => ({
  getSession: getSessionMock,
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    trip: {
      create: tripCreateMock,
      findMany: tripFindManyMock,
      updateMany: tripUpdateManyMock,
      deleteMany: tripDeleteManyMock,
    },
  },
}));

import {
  createTrip,
  getMyTrips,
  updateTrip,
  deleteTrip,
} from "./trip-actions";

describe("Trip server actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getSessionMock.mockResolvedValue(null);
  });

  it("rejects creating a trip when signed out", async () => {
    const result = await createTrip({ title: "Lalibela Trip" });

    expect(result).toEqual({
      success: false,
      error: "You must be signed in.",
    });
    expect(tripCreateMock).not.toHaveBeenCalled();
  });

  it("rejects retrieving trips when signed out", async () => {
    const result = await getMyTrips();

    expect(result).toEqual({
      success: false,
      error: "You must be signed in.",
    });
    expect(tripFindManyMock).not.toHaveBeenCalled();
  });

  it("rejects updating a trip when signed out", async () => {
    const result = await updateTrip("trip-1", {
      title: "Lalibela Trip",
    });

    expect(result).toEqual({
      success: false,
      error: "You must be signed in.",
    });
    expect(tripUpdateManyMock).not.toHaveBeenCalled();
  });

  it("rejects deleting a trip when signed out", async () => {
    const result = await deleteTrip("trip-1");

    expect(result).toEqual({
      success: false,
      error: "You must be signed in.",
    });
    expect(tripDeleteManyMock).not.toHaveBeenCalled();
  });

  
  it("prevents updating a trip that does not belong to the user", async () => {
    getSessionMock.mockResolvedValue({
      user: { id: "user-1" },
    });
    tripUpdateManyMock.mockResolvedValue({ count: 0 });

    const result = await updateTrip("another-users-trip", {
      title: "Updated Trip",
    });

    expect(tripUpdateManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: "another-users-trip",
          userId: "user-1",
        },
      }),
    );
    expect(result.success).toBe(false);
  });

  it("prevents deleting a trip that does not belong to the user", async () => {
    getSessionMock.mockResolvedValue({
      user: { id: "user-1" },
    });
    tripDeleteManyMock.mockResolvedValue({ count: 0 });

    const result = await deleteTrip("another-users-trip");

    expect(tripDeleteManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: "another-users-trip",
          userId: "user-1",
        },
      }),
    );
    expect(result.success).toBe(false);
  });

it("creates a trip for the signed-in user", async () => {
  getSessionMock.mockResolvedValue({
    user: { id: "user-1" },
  });

  tripCreateMock.mockResolvedValue({ id: "trip-1" });

  const result = await createTrip({
    title: "Lalibela Trip",
  });

  expect(tripCreateMock).toHaveBeenCalledWith(
    expect.objectContaining({
      data: expect.objectContaining({
        title: "Lalibela Trip",
        userId: "user-1",
      }),
      select: { id: true },
    }),
  );

  expect(result).toEqual({
    success: true,
    tripId: "trip-1",
  });
});


it("retrieves trips for the signed-in user", async () => {
  getSessionMock.mockResolvedValue({
    user: { id: "user-1" },
  });

  tripFindManyMock.mockResolvedValue([
    { id: "trip-1", title: "Lalibela Trip" },
  ]);

  const result = await getMyTrips();

  expect(tripFindManyMock).toHaveBeenCalledWith(
    expect.objectContaining({
      where: { userId: "user-1" },
      orderBy: { createdAt: "desc" },
    }),
  );

  expect(result).toEqual({
    success: true,
    trips: [{ id: "trip-1", title: "Lalibela Trip" }],
  });
});


it("updates a trip belonging to the signed-in user", async () => {
  getSessionMock.mockResolvedValue({
    user: { id: "user-1" },
  });

  tripUpdateManyMock.mockResolvedValue({ count: 1 });

  const result = await updateTrip("trip-1", {
    title: "Updated Lalibela Trip",
  });

  expect(tripUpdateManyMock).toHaveBeenCalledWith(
    expect.objectContaining({
      where: {
        id: "trip-1",
        userId: "user-1",
      },
      data: expect.objectContaining({
        title: "Updated Lalibela Trip",
      }),
    }),
  );

  expect(result).toEqual({ success: true });
});



});
