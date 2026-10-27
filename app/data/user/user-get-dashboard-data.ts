import "server-only";

import { prisma } from "@/lib/db";
export type BookingStatus = "Pending" | "Active" | "Cancelled";
export type DestinationCategory =
  | "Historical"
  | "Natural"
  | "Cultural"
  | "Adventure"
  | string;

export interface UserBookingItem {
  id: string;
  status: BookingStatus;
  isVerified: boolean;
  amount: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  location: {
    id: string;
    title: string;
    slug: string;
    description: string;
    place: string;
    category: DestinationCategory;
    imageUrls: string[];
    startDate: Date;
    durationDays: number;
    price: number;
    currency: string;
    isPublished: boolean;
  };
}

export interface UnbookedDestinationItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  place: string;
  category: DestinationCategory;
  imageUrls: string[];
  startDate: Date;
  durationDays: number;
  price: number;
  currency: string;
}

export interface UserDashboardData {
  bookings: UserBookingItem[];
  unbookedDestinations: UnbookedDestinationItem[];
  onlyBookedDestinations: UserBookingItem[];
  stats: {
    totalBookings: number;
    verifiedBookings: number;
    pendingBookings: number;
    unbookedCount: number;
    totalSpent: number;
  };
}

export async function userGetDashboardData(
  userId: string,
): Promise<UserDashboardData> {
  const [userBookings, allLocations] = await Promise.all([
    prisma.booking.findMany({
      where: { userId },
      include: {
        location: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.location.findMany({
      where: { isPublished: true },
      orderBy: { startDate: "asc" },
    }),
  ]);

  const bookedLocationIds = new Set(
    userBookings
      .filter((b) => b.status === "Active" || b.status === "Pending")
      .map((b) => b.locationId),
  );

  const bookings: UserBookingItem[] = userBookings.map((b) => ({
    id: b.id,
    status: b.status,
    isVerified: b.status === "Active",
    amount: Number(b.amount),
    currency: b.currency,
    createdAt: b.createdAt,
    updatedAt: b.updatedAt,
    location: {
      id: b.location.id,
      title: b.location.title,
      slug: b.location.slug,
      description: b.location.description,
      place: b.location.place,
      category: b.location.category,
      imageUrls: b.location.imageUrls,
      startDate: b.location.startDate,
      durationDays: b.location.durationDays,
      price: Number(b.location.price),
      currency: b.location.currency,
      isPublished: b.location.isPublished,
    },
  }));

  const onlyBookedDestinations: UserBookingItem[] = userBookings
    .filter((loc) => loc.status == "Active")
    .map((b) => ({
      id: b.id,
      status: b.status,
      isVerified: b.status === "Active",
      amount: Number(b.amount),
      currency: b.currency,
      createdAt: b.createdAt,
      updatedAt: b.updatedAt,
      location: {
        id: b.location.id,
        title: b.location.title,
        slug: b.location.slug,
        description: b.location.description,
        place: b.location.place,
        category: b.location.category,
        imageUrls: b.location.imageUrls,
        startDate: b.location.startDate,
        durationDays: b.location.durationDays,
        price: Number(b.location.price),
        currency: b.location.currency,
        isPublished: b.location.isPublished,
      },
    }));

  const unbookedDestinations: UnbookedDestinationItem[] = allLocations
    .filter((loc) => !bookedLocationIds.has(loc.id))
    .map((loc) => ({
      id: loc.id,
      title: loc.title,
      slug: loc.slug,
      description: loc.description,
      place: loc.place,
      category: loc.category,
      imageUrls: loc.imageUrls,
      startDate: loc.startDate,
      durationDays: loc.durationDays,
      price: Number(loc.price),
      currency: loc.currency,
    }));

  const verifiedBookings = bookings.filter((b) => b.status === "Active").length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const totalSpent = bookings
    .filter((b) => b.status === "Active")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return {
    bookings,
    unbookedDestinations,
    onlyBookedDestinations,
    stats: {
      totalBookings: bookings.length,
      verifiedBookings,
      pendingBookings,
      unbookedCount: unbookedDestinations.length,
      totalSpent,
    },
  };
}
