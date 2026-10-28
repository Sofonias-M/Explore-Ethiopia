import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
} from "lucide-react";

import { userGetDestination } from "@/app/data/user/user-get-destination";
import { DestinationGallery } from "./DestinationGallery";
import { checkIfLocationBooked } from "@/app/data/user/user-is-booked";
import { Button } from "@/components/ui/button";
import { BookingButton } from "./_components/BookingButton";
import { Skeleton } from "@/components/ui/skeleton";


type Params = Promise<{ slug: string }>;

async function DestinationDetailContent({ params }: { params: Params }) {
  const { slug } = await params;
  const destination = await userGetDestination(slug);

  const formattedDate = new Date(destination.startDate).toLocaleDateString(
    undefined,
    { year: "numeric", month: "long", day: "numeric" },
  );

  const isBooked = await checkIfLocationBooked(destination.id);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 sm:py-16 lg:px-12">
      <Link
        href="/destinations"
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2.5 text-sm text-muted-foreground transition-all duration-200 hover:border-[#C69A45]/50 hover:text-[#244B3C]"
      >
        <ArrowLeft size={14} />
        Back to destinations
      </Link>

      <DestinationGallery
        title={destination.title}
        imageUrls={destination.imageUrls}
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
        <div>
          <span className="inline-flex rounded-full border border-[#C69A45]/30 bg-[#F0EBE1] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#244B3C]">
            {destination.category}
          </span>

          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {destination.title}
          </h1>

          <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={14} />
            {destination.place}
          </p>

          <p className="mt-7 whitespace-pre-line text-base leading-8 text-muted-foreground">
            {destination.description}
          </p>

          {destination.tourGuide && (
            <div className="mt-9 flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
              {destination.tourGuide.image ? (
                <img
                  src={destination.tourGuide.image}
                  alt={destination.tourGuide.name}
                  className="size-10 rounded-full object-cover"
                />
              ) : (
                <span className="flex size-10 items-center justify-center rounded-full bg-muted">
                  <UserRound size={18} />
                </span>
              )}
              <div>
                <p className="text-xs text-muted-foreground">Guided by</p>
                <p className="text-sm font-medium">
                  {destination.tourGuide.name}
                </p>
              </div>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-3xl border border-border/70 bg-card p-7 shadow-lg shadow-black/5 lg:sticky lg:top-24">
          <p className="text-3xl font-bold tracking-tight text-[#244B3C]">
            {destination.currency} {destination.price.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">per person</p>

          <div className="mt-6 space-y-3 border-t pt-6 text-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays size={14} />
                Start date
              </span>
              <span className="font-medium">{formattedDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Clock3 size={14} />
                Duration
              </span>
              <span className="font-medium">
                {destination.durationDays} day
                {destination.durationDays === 1 ? "" : "s"}
              </span>
            </div>
          </div>

          {/* TODO: wire this up once booking is built */}
          {/* <button
            type="button"
            className="mt-6 w-full rounded-full bg-brand py-3 text-sm font-semibold text-brand-foreground transition hover:opacity-90"
          >
            Book this trip
          </button> */}
          {isBooked ? (
            <Button
              // className={buttonVariants({ className: "w-full" })}
              className="mt-6 w-full cursor-not-allowed rounded-full bg-[#244B3C]/40 py-5 text-sm font-semibold text-white/80"
              disabled
              // href={`/dashboard/${c.slug}`}
            >
              Booked!
            </Button>
          ) : (
            <BookingButton locationId={destination.id} />
          )}
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Booking isn&apos;t connected yet — this button is a placeholder.
          </p>
        </aside>
      </div>
    </div>
  );
}

function DestinationDetailSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 sm:py-16 lg:px-12 space-y-6">
      {/* Back button skeleton */}
      <Skeleton className="h-5 w-36" />

      {/* Gallery Skeleton */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Skeleton className="h-[340px] sm:h-[420px] sm:col-span-2 rounded-2xl" />
        <div className="hidden sm:grid grid-rows-2 gap-3">
          <Skeleton className="h-full rounded-2xl" />
          <Skeleton className="h-full rounded-2xl" />
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Left Column */}
        <div className="space-y-6">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-40" />
          <div className="space-y-3 pt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          <div className="flex items-center gap-3 rounded-2xl border p-4">
            <Skeleton className="size-10 rounded-full" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>

        {/* Right Aside Card */}
        <div className="h-fit rounded-2xl border bg-card p-6 space-y-6">
          <div className="space-y-1.5">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="space-y-3 border-t pt-6">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <Skeleton className="h-11 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function DestinationDetailPage({
  params,
}: {
  params: Params;
}) {
  return (
    <Suspense fallback={<DestinationDetailSkeleton />}>
      <DestinationDetailContent params={params} />
    </Suspense>
  );
}

