 import Link from "next/link";
import type { Destination } from "@/lib/destinations";

type DestinationCardProps = {
  destination: Destination;
};

export default function DestinationCard({
  destination,
}: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-emerald-800">
          {destination.category}
        </span>
      </div>

      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-gray-900">
            {destination.name}
          </h3>
          <span className="shrink-0 text-sm font-semibold text-amber-600">
            ★ {destination.rating}
          </span>
        </div>

        <p className="text-sm text-gray-500">⌖ {destination.region}, Ethiopia</p>

        <p className="line-clamp-2 text-sm leading-6 text-gray-600">
          {destination.description}
        </p>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-sm">
          <span className="text-gray-500">
            {destination.reviews} reviews
          </span>
          <span className="font-semibold text-emerald-800">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}