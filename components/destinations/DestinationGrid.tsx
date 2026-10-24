 "use client";

import { useMemo, useState } from "react";
import {
  destinations,
} from "@/lib/destinations";
import DestinationCard from "./destinationCard";
import DestinationFilters from "./DestinationFilters";

type DestinationGridProps = {
  limit?: number;
};

export default function DestinationGrid({
  limit,
}: DestinationGridProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredDestinations = useMemo(() => {
    const filtered = destinations.filter((destination) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        destination.name.toLowerCase().includes(query) ||
        destination.region.toLowerCase().includes(query) ||
        destination.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || destination.category === category;

      return matchesSearch && matchesCategory;
    });

    return limit ? filtered.slice(0, limit) : filtered;
  }, [search, category, limit]);

  return (
    <div>
      <DestinationFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
      />

      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-gray-50 px-6 py-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            No destinations found
          </h3>
          <p className="mt-2 text-gray-600">
            Try another search or choose a different category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
            className="mt-4 font-semibold text-emerald-800 underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {limit && (
        <p className="mt-5 text-sm text-gray-500">
          Showing {filteredDestinations.length} destinations
        </p>
      )}
    </div>
  );
}