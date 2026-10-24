"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import type { Destination } from "@/lib/destinations";

type DestinationCardProps = {
  destination: Destination;
};

export default function DestinationCard({
  destination,
}: DestinationCardProps) {
  const [imgSrc, setImgSrc] = useState(destination.imageUrl);

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group block transition duration-200 hover:-translate-y-1"
    >
      <div className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition group-hover:shadow-md">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
          <img
            src={imgSrc}
            alt={`${destination.name} in ${destination.region}, Ethiopia`}
            onError={() => {
              // Graceful fallback to Unsplash landscape if remote URL has network issue
              setImgSrc(
                "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80"
              );
            }}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="p-3.5 sm:p-4">
          <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-800 transition">
            {destination.name}
          </h3>

          <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <span>{destination.region}</span>
          </div>

          <div className="mt-2.5 flex items-center gap-1.5 text-xs">
            <span className="flex items-center gap-1 font-semibold text-amber-500">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>{destination.rating.toFixed(1)}</span>
            </span>
            <span className="text-gray-400">({destination.reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
