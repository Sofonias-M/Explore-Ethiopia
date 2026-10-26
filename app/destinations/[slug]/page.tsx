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

type Params = Promise<{ slug: string }>;

export default async function DestinationDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const destination = await userGetDestination(slug);

  const formattedDate = new Date(destination.startDate).toLocaleDateString(
    undefined,
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 sm:py-16 lg:px-12">
      <Link
        href="/destinations"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft size={14} />
        Back to destinations
      </Link>

      <DestinationGallery
        title={destination.title}
        imageUrls={destination.imageUrls}
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <span className="inline-flex rounded-full bg-muted px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {destination.category}
          </span>

          <h1 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            {destination.title}
          </h1>

          <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={14} />
            {destination.place}
          </p>

          <p className="mt-6 whitespace-pre-line text-sm leading-7 text-muted-foreground">
            {destination.description}
          </p>

          {destination.tourGuide && (
            <div className="mt-8 flex items-center gap-3 rounded-2xl border p-4">
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

        <aside className="h-fit rounded-2xl border bg-card p-6 lg:sticky lg:top-24">
          <p className="text-3xl font-semibold tracking-tight">
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
          <button
            type="button"
            className="mt-6 w-full rounded-full bg-brand py-3 text-sm font-semibold text-brand-foreground transition hover:opacity-90"
          >
            Book this trip
          </button>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Booking isn&apos;t connected yet — this button is a placeholder.
          </p>
        </aside>
      </div>
    </div>
  );
}
