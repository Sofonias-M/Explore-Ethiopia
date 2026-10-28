"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useContructUrl } from "@/hooks/use-construct-url";
import { Skeleton } from "@/components/ui/skeleton";

type Destination = {
  id: string;
  slug: string;
  title: string;
  place: string;
  category: string;
  imageUrls: string[];
  price: number;
  currency: string;
  durationDays: number;
};

export function PublicDestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  const url = useContructUrl(destination.imageUrls[0]);

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative block min-h-[390px] overflow-hidden rounded-3xl border border-border/40 bg-muted shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-[420px]"
    >
      <img
        src={url}
        alt={destination.title}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Same two-sided gradient as the admin card, so the badge stays readable
          over light or dark photos. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#211C14]/55 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#211C14]/90 via-[#211C14]/15 to-transparent" />

      <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-[#211C14]/45 px-4 py-2 text-[10px] font-semibold tracking-wider text-white backdrop-blur-md">
        {destination.category}
      </span>

      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-white sm:inset-x-6 sm:bottom-6">
        <div>
          <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-white/80">{destination.place}</p>
          <h3 className="text-2xl font-semibold leading-tight tracking-tight drop-shadow-sm sm:text-3xl">
            {destination.title}
          </h3>
          <p className="mt-1 text-xs text-white/70">
            {destination.durationDays} day
            {destination.durationDays === 1 ? "" : "s"} · {destination.currency}{" "}
            {destination.price.toLocaleString()}
          </p>
        </div>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#FAF7F0] text-[#244B3C] shadow-md transition-all duration-300 group-hover:bg-[#C69A45] group-hover:text-[#211C14] group-hover:shadow-lg">
          <ArrowUpRight size={19} />
        </span>
      </div>
    </Link>
  );
}

export function PublicDestinationCardSkeleton() {
  return (
    <div className="relative flex min-h-[390px] flex-col justify-between overflow-hidden rounded-3xl border border-border/50 bg-muted/60 p-5 sm:min-h-[420px]">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <div className="flex items-end justify-between gap-3">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-4 w-36" />
        </div>
        <Skeleton className="size-10 rounded-full shrink-0" />
      </div>
    </div>
  );
}

