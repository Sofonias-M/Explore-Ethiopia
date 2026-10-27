"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Loader2,
  MapPin,
  Search,
  Trash2,
  UserRound,
  XCircle,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import type { AdminBookingsData } from "@/app/data/admin/admin-get-bookings";
import { updateBookingStatus } from "@/app/data/admin/update-booking-status";
import { deleteBooking } from "@/app/data/admin/admin-delete-booking";
import { BOOKING_STATUSES, BookingStatusType } from "@/app/data/admin/status";

const STATUS_STYLES: Record<BookingStatusType, string> = {
  Active:
    "bg-emerald-500/10 text-emerald-600 ring-1 ring-inset ring-emerald-500/20 dark:text-emerald-400",
  Pending:
    "bg-amber-500/10 text-amber-600 ring-1 ring-inset ring-amber-500/20 dark:text-amber-400",
  Cancelled:
    "bg-destructive/10 text-destructive ring-1 ring-inset ring-destructive/20",
};

function StatusBadge({ status }: { status: string }) {
  const normalized = (BOOKING_STATUSES as readonly string[]).includes(status)
    ? (status as BookingStatusType)
    : "Pending";

  return (
    <Badge
      variant="outline"
      className={`rounded-full border-0 px-2.5 py-1 text-xs font-medium capitalize ${STATUS_STYLES[normalized]}`}
    >
      {normalized === "Active" && <CheckCircle2 size={12} className="mr-1" />}
      {normalized === "Pending" && <Clock size={12} className="mr-1" />}
      {normalized === "Cancelled" && <XCircle size={12} className="mr-1" />}
      {normalized === "Active" ? "Verified" : normalized}
    </Badge>
  );
}

function BookingRow({ booking }: { booking: AdminBookingsData[number] }) {
  const [isPending, startTransition] = useTransition();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleStatusChange = (status: BookingStatusType) => {
    if (status === booking.status) return;

    startTransition(async () => {
      const result = await updateBookingStatus(booking.id, status);
      if (result.status === "success") {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBooking(booking.id);
      if (result.status === "success") {
        toast.success(result.message);
        setDeleteOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  const userInitials = booking.user.name
    ? booking.user.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  const departureDate = new Date(booking.location.startDate).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  const bookedOn = new Date(booking.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <TableRow>
      {/* Traveler column */}
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage
              src={booking.user.image ?? undefined}
              alt={booking.user.name}
            />
            <AvatarFallback>
              {userInitials || <UserRound size={14} />}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {booking.user.name || "Unnamed"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {booking.user.email}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Destination */}
      <TableCell>
        <div className="min-w-0 max-w-[200px]">
          <Link
            href={`/destinations/${booking.location.slug}`}
            className="truncate block text-sm font-medium text-foreground hover:underline"
          >
            {booking.location.title}
          </Link>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin size={11} className="shrink-0 text-muted-foreground" />
            <span className="truncate">{booking.location.place}</span>
          </p>
        </div>
      </TableCell>

      {/* Travel Dates & Duration */}
      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
        <div>{departureDate}</div>
        <div className="text-xs text-muted-foreground/75">
          {booking.location.durationDays} day
          {booking.location.durationDays === 1 ? "" : "s"}
        </div>
      </TableCell>

      {/* Amount */}
      <TableCell className="text-sm font-medium text-foreground whitespace-nowrap">
        {booking.currency} {booking.amount.toLocaleString()}
      </TableCell>

      {/* Status Badge */}
      <TableCell>
        <StatusBadge status={booking.status} />
      </TableCell>

      {/* Booked Date */}
      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
        {bookedOn}
      </TableCell>

      {/* Actions: Change Status Dropdown & Delete */}
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Select
            value={booking.status}
            onValueChange={(value) =>
              handleStatusChange(value as BookingStatusType)
            }
            disabled={isPending}
          >
            <SelectTrigger size="sm" className="w-28 capitalize">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {BOOKING_STATUSES.map((status) => (
                <SelectItem key={status} value={status} className="capitalize">
                  {status === "Active" ? "Verified" : status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogTrigger render={<button type="button" />}>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:text-destructive"
                disabled={isPending}
                aria-label="Delete booking"
              >
                {isPending ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Trash2 size={14} />
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this booking?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently removes the booking record for{" "}
                  <strong>{booking.user.name}</strong> ({booking.location.title}
                  ). This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isPending}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                  disabled={isPending}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isPending ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function BookingsTable({ data }: { data: AdminBookingsData }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (b) =>
        b.user.name?.toLowerCase().includes(q) ||
        b.user.email?.toLowerCase().includes(q) ||
        b.location.title?.toLowerCase().includes(q) ||
        b.location.place?.toLowerCase().includes(q) ||
        b.status?.toLowerCase().includes(q),
    );
  }, [data, query]);

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            All bookings
          </h2>
          <p className="text-xs text-muted-foreground">
            {filtered.length} of {data.length} booking
            {data.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search traveler, tour, or status..."
            className="pl-8"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Traveler</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Departure</TableHead>
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
                colSpan={7}
                className="h-24 text-center text-sm text-muted-foreground"
              >
                No bookings match “{query}”.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((booking) => (
              <BookingRow key={booking.id} booking={booking} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export function BookingsTableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Controls Skeleton */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-9 w-full sm:max-w-xs rounded-md" />
        <Skeleton className="h-9 w-40 rounded-md" />
      </div>

      {/* Table Skeleton */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Skeleton className="h-4 w-28" /></TableHead>
              <TableHead><Skeleton className="h-4 w-32" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24" /></TableHead>
              <TableHead><Skeleton className="h-4 w-20" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24" /></TableHead>
              <TableHead className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-9 rounded-full shrink-0" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-36" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-8 w-28 rounded-md" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell className="text-right">
                  <Skeleton className="size-8 rounded-md ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

