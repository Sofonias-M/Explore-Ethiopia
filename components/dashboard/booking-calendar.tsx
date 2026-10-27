"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleCheckIcon,
  Clock,
  Compass,
  ExternalLink,
  Info,
  LoaderIcon,
  MapPin,
  Sparkles,
  Ticket,
  X,
} from "lucide-react";
import { UserBookingItem } from "@/app/data/user/user-get-dashboard-data";
import { useContructUrl } from "@/hooks/use-construct-url";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BookingCalendarProps {
  bookings: UserBookingItem[];
}

export function BookingCalendar({ bookings }: BookingCalendarProps) {
  // Determine initial date: if user has bookings, pick the earliest or current month
  const initialDate = useMemo(() => {
    if (bookings.length > 0) {
      // Find the first upcoming booking, or the first booking
      const now = new Date();
      const upcoming = bookings
        .map((b) => new Date(b.location.startDate))
        .filter((d) => d >= now)
        .sort((a, b) => a.getTime() - b.getTime());

      if (upcoming.length > 0) {
        return new Date(upcoming[0].getFullYear(), upcoming[0].getMonth(), 1);
      }
      const first = new Date(bookings[0].location.startDate);
      return new Date(first.getFullYear(), first.getMonth(), 1);
    }
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }, [bookings]);

  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "verified" | "pending"
  >("all");
  const [selectedDayInfo, setSelectedDayInfo] = useState<{
    date: Date;
    dayBookings: {
      booking: UserBookingItem;
      dayIndex: number; // 1-based index within the tour duration
      isStartDay: boolean;
      isEndDay: boolean;
    }[];
  } | null>(null);

  // Month navigation
  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (statusFilter === "verified") return b.isVerified;
      if (statusFilter === "pending") return b.status === "Pending";
      return true;
    });
  }, [bookings, statusFilter]);

  // Calendar days grid computation
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const calendarGrid = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: {
      date: Date;
      dayNumber: number;
      isCurrentMonth: boolean;
      isToday: boolean;
      dayBookings: {
        booking: UserBookingItem;
        dayIndex: number;
        isStartDay: boolean;
        isEndDay: boolean;
      }[];
    }[] = [];

    const today = new Date();
    const isSameDay = (d1: Date, d2: Date) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    // Previous month filler days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, daysInPrevMonth - i);
      days.push({
        date: d,
        dayNumber: daysInPrevMonth - i,
        isCurrentMonth: false,
        isToday: isSameDay(d, today),
        dayBookings: [],
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);

      // Check which bookings cover this day
      const dayBookings: {
        booking: UserBookingItem;
        dayIndex: number;
        isStartDay: boolean;
        isEndDay: boolean;
      }[] = [];

      filteredBookings.forEach((b) => {
        const start = new Date(b.location.startDate);
        const duration = b.location.durationDays || 1;
        const end = new Date(start);
        end.setDate(start.getDate() + duration - 1);

        // Normalize timestamps to midnight
        const dMidnight = new Date(
          d.getFullYear(),
          d.getMonth(),
          d.getDate(),
        ).getTime();
        const startMidnight = new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
        ).getTime();
        const endMidnight = new Date(
          end.getFullYear(),
          end.getMonth(),
          end.getDate(),
        ).getTime();

        if (dMidnight >= startMidnight && dMidnight <= endMidnight) {
          const dayIndex =
            Math.round((dMidnight - startMidnight) / (1000 * 60 * 60 * 24)) + 1;
          dayBookings.push({
            booking: b,
            dayIndex,
            isStartDay: dMidnight === startMidnight,
            isEndDay: dMidnight === endMidnight,
          });
        }
      });

      days.push({
        date: d,
        dayNumber: i,
        isCurrentMonth: true,
        isToday: isSameDay(d, today),
        dayBookings,
      });
    }

    // Next month filler days to complete rows (7 * 5 or 7 * 6)
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      days.push({
        date: d,
        dayNumber: i,
        isCurrentMonth: false,
        isToday: isSameDay(d, today),
        dayBookings: [],
      });
    }

    return days;
  }, [year, month, filteredBookings]);

  // Trips in this month for bottom quick list
  const monthTrips = useMemo(() => {
    return filteredBookings.filter((b) => {
      const start = new Date(b.location.startDate);
      const duration = b.location.durationDays || 1;
      const end = new Date(start);
      end.setDate(start.getDate() + duration - 1);

      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0);

      return (
        (start >= monthStart && start <= monthEnd) ||
        (end >= monthStart && end <= monthEnd) ||
        (start <= monthStart && end >= monthEnd)
      );
    });
  }, [filteredBookings, year, month]);

  return (
    <div className="flex flex-col gap-6">
      {/* Top Controls Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Month selector & Today */}
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-xl border border-border bg-card p-1 shadow-xs">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevMonth}
              className="size-8 rounded-lg"
              aria-label="Previous month"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="min-w-40 px-2 text-center text-base font-bold text-foreground">
              {monthName}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextMonth}
              className="size-8 rounded-lg"
              aria-label="Next month"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="text-xs h-9 rounded-xl"
          >
            Today
          </Button>
        </div>

        {/* Right side controls: Filter & View links */}
        {/* Right side controls: Filter & View links */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter tabs */}
          <div className="flex items-center rounded-xl bg-muted/80 p-1 border border-border/60 text-xs">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                statusFilter === "all"
                  ? "bg-card text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Bookings
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("verified")}
              className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                statusFilter === "verified"
                  ? "bg-card text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Verified
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("pending")}
              className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                statusFilter === "pending"
                  ? "bg-card text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Pending
            </button>
          </div>

          {/* Quick link back to Bookings */}
        </div>
      </div>

      {/* Calendar Grid Container */}
      <Card className="overflow-hidden border border-border shadow-sm bg-card">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 border-b border-border bg-muted/60 text-center text-xs font-semibold text-muted-foreground">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-2.5">
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-border border-b border-border">
          {calendarGrid.map((day, idx) => {
            const hasBookings = day.dayBookings.length > 0;

            return (
              <div
                key={idx}
                onClick={() => {
                  if (hasBookings) {
                    setSelectedDayInfo({
                      date: day.date,
                      dayBookings: day.dayBookings,
                    });
                  }
                }}
                className={`group relative flex min-h-[105px] sm:min-h-[125px] flex-col p-1.5 sm:p-2 transition-colors ${
                  !day.isCurrentMonth
                    ? "bg-muted/15 text-muted-foreground/40"
                    : "bg-card text-foreground"
                } ${
                  hasBookings
                    ? "cursor-pointer hover:bg-accent/40"
                    : "hover:bg-muted/20"
                }`}
              >
                {/* Date Number */}
                <div className="flex items-center justify-between">
                  <span
                    className={`flex size-6 sm:size-7 items-center justify-center rounded-full text-xs font-semibold ${
                      day.isToday
                        ? "bg-primary text-primary-foreground shadow-xs font-bold"
                        : hasBookings && day.isCurrentMonth
                          ? "text-foreground font-bold"
                          : ""
                    }`}
                  >
                    {day.dayNumber}
                  </span>

                  {hasBookings && (
                    <span className="hidden sm:inline-flex size-1.5 rounded-full bg-foreground" />
                  )}
                </div>

                {/* Day's Bookings Chips */}
                <div className="mt-1 flex flex-1 flex-col gap-1 overflow-hidden">
                  {day.dayBookings.map(
                    ({ booking, dayIndex, isStartDay, isEndDay }) => {
                      const isVerified = booking.isVerified;

                      return (
                        <div
                          key={booking.id}
                          className="group/chip flex items-center gap-1 rounded-md px-1.5 py-1 text-[10px] sm:text-[11px] font-medium leading-tight transition-all shadow-xs bg-muted/80 text-foreground border border-border hover:bg-muted"
                          title={`${booking.location.title} (Day ${dayIndex} of ${booking.location.durationDays})`}
                        >
                          {isVerified ? (
                            <CircleCheckIcon className="size-3 shrink-0 text-muted-foreground" />
                          ) : (
                            <Clock className="size-3 shrink-0 text-muted-foreground" />
                          )}

                          <span className="truncate">
                            {isStartDay ? (
                              <strong className="font-semibold">
                                Departs:{" "}
                              </strong>
                            ) : null}
                            {booking.location.title}
                          </span>

                          <span className="hidden lg:inline text-[9px] opacity-75 shrink-0 ml-auto">
                            D{dayIndex}
                          </span>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Trips occurring in the selected month */}

      {/* Day Details Modal */}
      <Dialog
        open={!!selectedDayInfo}
        onOpenChange={(open) => !open && setSelectedDayInfo(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <CalendarDays className="size-5 text-primary" />
              {selectedDayInfo?.date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Tours and itineraries scheduled on this date.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            {selectedDayInfo?.dayBookings.map(
              ({ booking, dayIndex, isStartDay, isEndDay }) => (
                <DayDetailCard
                  key={booking.id}
                  booking={booking}
                  dayIndex={dayIndex}
                  isStartDay={isStartDay}
                  isEndDay={isEndDay}
                />
              ),
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DayDetailCard({
  booking,
  dayIndex,
  isStartDay,
  isEndDay,
}: {
  booking: UserBookingItem;
  dayIndex: number;
  isStartDay: boolean;
  isEndDay: boolean;
}) {
  const imageUrl = useContructUrl(booking.location.imageUrls[0]);

  return (
    <div className="rounded-xl border border-border p-3.5 bg-card/80 flex flex-col gap-3">
      <div className="flex gap-3">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={booking.location.title}
            className="size-16 rounded-lg object-cover shrink-0"
          />
        ) : (
          <div className="flex size-16 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Compass className="size-6" />
          </div>
        )}
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <Badge
              variant="outline"
              className="px-1.5 text-[10px] text-muted-foreground"
            >
              {booking.isVerified ? (
                <CircleCheckIcon className="size-2.5 fill-green-500 dark:fill-green-400 mr-1" />
              ) : (
                <LoaderIcon className="size-2.5 animate-spin mr-1 text-muted-foreground" />
              )}
              {booking.isVerified ? "Verified" : "Pending"}
            </Badge>

            <span className="text-[11px] font-medium text-muted-foreground">
              Day {dayIndex} of {booking.location.durationDays}
            </span>
          </div>

          <h4 className="font-semibold text-sm text-foreground truncate mt-1">
            {booking.location.title}
          </h4>
          <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
            <MapPin className="size-3" />
            {booking.location.place}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs border-t border-border/60 pt-2 text-muted-foreground">
        <span>
          Total: {booking.currency} {booking.amount.toLocaleString()}
        </span>
        <Link
          href={`/destinations/${booking.location.slug}`}
          className={buttonVariants({
            size: "sm",
            variant: "outline",
            className: "text-xs h-7 gap-1",
          })}
        >
          View Tour <ExternalLink className="size-3" />
        </Link>
      </div>
    </div>
  );
}

function MonthTripCard({ booking }: { booking: UserBookingItem }) {
  const imageUrl = useContructUrl(booking.location.imageUrls[0]);
  const start = new Date(booking.location.startDate).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    },
  );

  return (
    <Card className="overflow-hidden border border-border bg-card hover:border-primary/50 transition-all">
      <div className="flex items-center gap-3 p-3">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={booking.location.title}
            className="size-14 rounded-lg object-cover shrink-0"
          />
        ) : (
          <div className="flex size-14 items-center justify-center rounded-lg bg-muted text-muted-foreground shrink-0">
            <Compass className="size-6" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <Badge
              variant="outline"
              className="px-1.5 text-[10px] text-muted-foreground"
            >
              {booking.isVerified ? (
                <CircleCheckIcon className="size-2.5 fill-green-500 dark:fill-green-400 mr-1" />
              ) : (
                <LoaderIcon className="size-2.5 animate-spin mr-1 text-muted-foreground" />
              )}
              {booking.isVerified ? "Verified" : "Pending"}
            </Badge>
            <span className="text-[10px] text-muted-foreground">
              {booking.location.durationDays} Days
            </span>
          </div>

          <h4 className="font-semibold text-sm truncate text-foreground">
            {booking.location.title}
          </h4>
          <p className="text-xs text-muted-foreground">Departs {start}</p>
        </div>
      </div>
    </Card>
  );
}
