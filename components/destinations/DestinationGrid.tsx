"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { destinations } from "@/lib/destinations";
import DestinationCard from "./destinationCard";
import DestinationFilters from "./DestinationFilters";

type DestinationGridProps = {
  limit?: number;
  showFilters?: boolean;
  columns?: 3 | 4;
};

function DestinationGridInner({
  limit,
  showFilters = true,
  columns = 3,
}: DestinationGridProps) {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "All";

  return (
    <DestinationGridContent
      key={`${searchParam}:${categoryParam}`}
      limit={limit}
      showFilters={showFilters}
      columns={columns}
      initialSearch={searchParam}
      initialCategory={categoryParam}
    />
  );
}

type DestinationGridContentProps = DestinationGridProps & {
  initialSearch: string;
  initialCategory: string;
};

function DestinationGridContent({
  limit,
  showFilters = true,
  columns = 3,
  initialSearch,
  initialCategory,
}: DestinationGridContentProps) {
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);

  const filteredDestinations = useMemo(() => {
    const query = search.toLowerCase().trim();

    const filtered = destinations.filter((destination) => {
      const matchesSearch =
        !query ||
        destination.name.toLowerCase().includes(query) ||
        destination.region.toLowerCase().includes(query) ||
        destination.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || destination.category === category;

      return matchesSearch && matchesCategory;
    });

    return limit ? filtered.slice(0, limit) : filtered;
  }, [search, category, limit]);

  const gridClass =
    columns === 4
      ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="space-y-8">
      {showFilters && (
        <DestinationFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
        />
      )}

      {filteredDestinations.length > 0 ? (
        <div className={gridClass}>
          {filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-800 mb-3">
            🔍
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            No destinations found
          </h3>
          <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
            We couldn&apos;t find any destination matching &quot;{search}&quot;. Try a different keyword or category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
            className="mt-5 rounded-full bg-emerald-800 px-5 py-2 text-xs font-semibold text-white transition hover:bg-emerald-900"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function DestinationGrid(props: DestinationGridProps) {
  return (
    <Suspense fallback={<div className="h-48 animate-pulse rounded-2xl bg-gray-100" />}>
      <DestinationGridInner {...props} />
    </Suspense>
  );
}
