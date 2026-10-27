"use client";

import * as React from "react";
import Link from "next/link";
import {
  CircleCheckIcon,
  LoaderIcon,
  Search,
  ExternalLink,
  CalendarDays,
  CreditCard,
  Compass,
} from "lucide-react";
import { UserBookingItem } from "@/app/data/user/user-get-dashboard-data";
import { useContructUrl } from "@/hooks/use-construct-url";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BookingsDataTableProps {
  bookings: UserBookingItem[];
}

export function BookingsDataTable({ bookings }: BookingsDataTableProps) {
  const [activeTab, setActiveTab] = React.useState<"all" | "verified" | "pending">("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  const verifiedCount = bookings.filter((b) => b.isVerified).length;
  const pendingCount = bookings.filter((b) => b.status === "Pending").length;

  const filtered = React.useMemo(() => {
    return bookings.filter((b) => {
      // Tab filter
      if (activeTab === "verified" && !b.isVerified) return false;
      if (activeTab === "pending" && b.status !== "Pending") return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = b.location.title.toLowerCase().includes(q);
        const matchesPlace = b.location.place.toLowerCase().includes(q);
        const matchesCategory = b.location.category.toLowerCase().includes(q);
        return matchesTitle || matchesPlace || matchesCategory;
      }

      return true;
    });
  }, [bookings, activeTab, searchQuery]);

  return (
    <div className="flex flex-col gap-4">
      {/* Table Card Wrapper */}
      <div className="overflow-hidden rounded-xl border bg-card shadow-xs">
        {/* Table Header Controls */}
        <div className="flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">My Booked Tours</h2>
            <p className="text-xs text-muted-foreground">
              {filtered.length} of {bookings.length} tour
              {bookings.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            {/* Filter Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={(val) => setActiveTab(val as "all" | "verified" | "pending")}
              className="w-fit"
            >
              <TabsList className="h-8">
                <TabsTrigger value="all" className="text-xs px-2.5">
                  All ({bookings.length})
                </TabsTrigger>
                <TabsTrigger value="verified" className="text-xs px-2.5">
                  Verified ({verifiedCount})
                </TabsTrigger>
                <TabsTrigger value="pending" className="text-xs px-2.5">
                  Pending ({pendingCount})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Search Input */}
            <div className="relative w-full sm:w-60">
              <Search
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tour or place..."
                className="pl-8 h-8 text-xs rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Table Content */}
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Destination</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Travel Dates</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Booked On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <Compass className="size-6 text-muted-foreground/60" />
                    <span>No bookings found.</span>
                    {bookings.length === 0 && (
                      <span className="text-xs">
                        Check out the unbooked destinations below to make your first reservation.
                      </span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((booking) => (
                <BookingTableRow key={booking.id} booking={booking} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function BookingTableRow({ booking }: { booking: UserBookingItem }) {
  const imageUrl = useContructUrl(booking.location.imageUrls[0]);

  const startDate = new Date(booking.location.startDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const bookedOn = new Date(booking.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <TableRow className="hover:bg-muted/40">
      {/* Destination Thumbnail + Title & Place */}
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="relative size-11 overflow-hidden rounded-lg bg-muted shrink-0 border border-border/60">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={booking.location.title}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-muted-foreground">
                <Compass className="size-5" />
              </div>
            )}
          </div>
          <div className="min-w-0 max-w-[200px]">
            <Link
              href={`/destinations/${booking.location.slug}`}
              className="truncate block font-medium text-foreground hover:underline text-sm"
            >
              {booking.location.title}
            </Link>
            <p className="truncate text-xs text-muted-foreground">
              {booking.location.place}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Category */}
      <TableCell>
        <Badge variant="outline" className="px-1.5 text-xs text-muted-foreground">
          {booking.location.category}
        </Badge>
      </TableCell>

      {/* Travel Dates */}
      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
        {startDate}
      </TableCell>

      {/* Duration */}
      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
        {booking.location.durationDays} day
        {booking.location.durationDays === 1 ? "" : "s"}
      </TableCell>

      {/* Amount */}
      <TableCell className="text-xs font-medium text-foreground whitespace-nowrap">
        {booking.currency} {booking.amount.toLocaleString()}
      </TableCell>

      {/* Status matching data-table.tsx line 196-209 */}
      <TableCell>
        <Badge variant="outline" className="px-1.5 text-xs text-muted-foreground">
          {booking.isVerified ? (
            <CircleCheckIcon className="size-3.5 fill-green-500 dark:fill-green-400 mr-1" />
          ) : (
            <LoaderIcon className="size-3.5 animate-spin mr-1 text-muted-foreground" />
          )}
          {booking.isVerified ? "Verified" : "Pending"}
        </Badge>
      </TableCell>

      {/* Booked Date */}
      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
        {bookedOn}
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-1.5">
          <Link
            href={`/destinations/${booking.location.slug}`}
            className={buttonVariants({
              variant: "ghost",
              size: "xs",
              className: "text-xs h-7 text-muted-foreground hover:text-foreground",
            })}
          >
            View
            <ExternalLink className="ml-1 size-3" />
          </Link>

          {booking.status === "Pending" && (
            <Link
              href={`/destinations/${booking.location.slug}`}
              className={buttonVariants({
                size: "xs",
                className: "text-xs h-7",
              })}
            >
              Verify / Pay
            </Link>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
