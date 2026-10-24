"use client";

import { Search, X } from "lucide-react";
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
    <div className="space-y-4">
      {/* Search Input Bar */}
      <div className="relative max-w-2xl">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          <Search className="h-4 w-4" />
        </div>
        <input
          type="search"
          placeholder="Search destinations..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {categories.map((item) => {
          const isSelected = category === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => onCategoryChange(item)}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
                isSelected
                  ? "bg-emerald-900 text-white shadow-sm"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
