"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Compass,
  ExternalLink,
  MapPin,
  Sparkles,
  Ticket,
  XCircle,
} from "lucide-react";
import { UserBookingItem } from "@/app/data/user/user-get-dashboard-data";
import { useContructUrl } from "@/hooks/use-construct-url";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function UserBookingsList({ bookings }: { bookings: UserBookingItem[] }) {
  const [filter, setFilter] = useState<"all" | "verified" | "pending">("all");

  const filteredBookings = bookings.filter((b) => {
    if (filter === "verified") return b.isVerified;
    if (filter === "pending") return b.status === "Pending";
    return true;
  });

  const verifiedCount = bookings.filter((b) => b.isVerified).length;
  const pendingCount = bookings.filter((b) => b.status === "Pending").length;

  return (
    <div className="flex flex-col gap-5">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Ticket className="size-5 text-primary" />
            My Booked Tours
          </h2>
          <p className="text-xs text-muted-foreground">
            Check your reservation status, departure dates, and payment verification.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1.5 rounded-xl bg-muted/70 p-1 border border-border/50 text-xs w-fit">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
              filter === "all"
                ? "bg-card text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({bookings.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("verified")}
            className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
              filter === "verified"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Verified ({verifiedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("pending")}
            className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
              filter === "pending"
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Pending ({pendingCount})
          </button>
        </div>
      </div>

      {/* Bookings List / Grid */}
      {filteredBookings.length === 0 ? (
        <Card className="border-dashed bg-card/50">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4">
              <Compass className="size-7" />
            </div>
            <h3 className="text-base font-semibold text-foreground">
              {filter === "all"
                ? "No tour bookings yet"
                : filter === "verified"
                ? "No verified bookings found"
                : "No pending bookings found"}
            </h3>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
              {filter === "all"
                ? "You haven't reserved any tours yet. Scroll down to discover unbooked destinations across Ethiopia!"
                : "You don't have any bookings matching this filter."}
            </p>
            {filter === "all" && (
              <a
                href="#unbooked-destinations"
                className={buttonVariants({
                  size: "sm",
                  className: "mt-4 gap-2",
                })}
              >
                <Sparkles className="size-4" />
                Explore Unbooked Destinations
              </a>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}

function BookingCard({ booking }: { booking: UserBookingItem }) {
  const imageUrl = useContructUrl(booking.location.imageUrls[0]);

  const startDate = new Date(booking.location.startDate);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + (booking.location.durationDays || 1));

  const bookedDate = new Date(booking.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedStartDate = startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedEndDate = endDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="overflow-hidden border border-border/80 transition-all hover:border-primary/40 hover:shadow-md bg-card">
      <div className="flex flex-col sm:flex-row">
        {/* Destination Image */}
        <div className="relative h-48 sm:h-auto sm:w-44 shrink-0 overflow-hidden bg-muted">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={booking.location.title}
              className="size-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-muted text-muted-foreground">
              <Compass className="size-8" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden" />
          <span className="absolute left-3 top-3 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
            {booking.location.category}
          </span>
        </div>

        {/* Details Content */}
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
          <div className="flex flex-col gap-2">
            {/* Top row: Status Badge & Booking ID */}
            <div className="flex items-center justify-between gap-2">
              {booking.isVerified ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  <CheckCircle2 className="size-3.5" />
                  Verified & Confirmed
                </span>
              ) : booking.status === "Pending" ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">
                  <Clock className="size-3.5" />
                  Pending Verification
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/15 px-2.5 py-1 text-xs font-semibold text-destructive ring-1 ring-inset ring-destructive/20">
                  <XCircle className="size-3.5" />
                  Cancelled
                </span>
              )}

              <span className="text-[11px] text-muted-foreground font-mono">
                #{booking.id.slice(-6).toUpperCase()}
              </span>
            </div>

            {/* Title & Place */}
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground line-clamp-1">
                {booking.location.title}
              </h3>
              <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <MapPin className="size-3.5 shrink-0 text-primary" />
                <span className="truncate">{booking.location.place}</span>
              </p>
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-muted/40 p-2.5 text-xs mt-1 border border-border/40">
              <div>
                <p className="text-[10px] text-muted-foreground">Travel Dates</p>
                <p className="font-medium text-foreground truncate">
                  {formattedStartDate}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Duration</p>
                <p className="font-medium text-foreground">
                  {booking.location.durationDays} Day
                  {booking.location.durationDays === 1 ? "" : "s"}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Amount</p>
                <p className="font-semibold text-foreground">
                  {booking.currency} {booking.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Booked On</p>
                <p className="font-medium text-muted-foreground">{bookedDate}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
            <Link
              href={`/destinations/${booking.location.slug}`}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "text-xs h-8 flex-1 sm:flex-initial",
              })}
            >
              View Tour
              <ExternalLink className="ml-1.5 size-3" />
            </Link>

            <Link
              href="/dashboard/calendar"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-xs h-8 text-muted-foreground hover:text-foreground",
              })}
            >
              <CalendarDays className="mr-1.5 size-3.5 text-primary" />
              Calendar
            </Link>

            {booking.status === "Pending" && (
              <Link
                href={`/destinations/${booking.location.slug}`}
                className={buttonVariants({
                  size: "sm",
                  className: "text-xs h-8 bg-amber-600 hover:bg-amber-700 text-white ml-auto",
                })}
              >
                Verify / Pay Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
