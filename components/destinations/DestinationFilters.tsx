"use client";

import { categories } from "@/lib/destinations";

type DestinationFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
};

export default function DestinationFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
}: DestinationFiltersProps) {
  return (
    <div className="mb-8 space-y-5">
      <input
        type="search"
        placeholder="Search destinations..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-gray-900 outline-none focus:border-emerald-700 sm:max-w-lg"
      />

      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onCategoryChange(item)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              category === item
                ? "bg-emerald-800 text-white"
                : "border border-gray-200 bg-white text-gray-700 hover:border-emerald-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}