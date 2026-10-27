export const BOOKING_STATUSES = ["Pending", "Active", "Cancelled"] as const;
export type BookingStatusType = (typeof BOOKING_STATUSES)[number];
