"use client";

import { ArrowUpRight } from "lucide-react";
import { useContructUrl } from "@/hooks/use-construct-url";

type Destination = {
  id: string;
  slug: string;
  title: string;
  place: string;
  category: string;
  imageUrls: string[];
};

export function DestinationCard({ destination }: { destination: Destination }) {
  const url = useContructUrl(destination.imageUrls[0]);

  return (
    <article className="group relative min-h-[360px] overflow-hidden rounded-2xl bg-muted">
      <img
        src={url}
        alt={destination.title}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
      />

      {/* Two-sided gradient: darkens both the top-left badge area and the bottom text area,
          independent of how light or dark the photo itself is. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-medium tracking-wide text-white ring-1 ring-inset ring-white/15 backdrop-blur-md">
        {destination.category}
      </span>

      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-white">
        <div>
          <p className="mb-2 text-[10px] text-white/75">{destination.place}</p>
          <h3 className="text-2xl font-medium tracking-tight">
            {destination.title}
          </h3>
        </div>
        <a
          href={`/admin/destinations/${destination.slug}`}
          aria-label={`Explore ${destination.slug}`}
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition group-hover:bg-brand"
        >
          <ArrowUpRight size={19} />
        </a>
      </div>
    </article>
  );
}
