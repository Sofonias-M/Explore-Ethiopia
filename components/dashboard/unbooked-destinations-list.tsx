"use client";

import { useState } from "react";
import { Compass, Search } from "lucide-react";
import { UnbookedDestinationItem } from "@/app/data/user/user-get-dashboard-data";
import { PublicDestinationCard } from "@/components/public/PublicDestinationCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UnbookedDestinationsList({
  destinations,
}: {
  destinations: UnbookedDestinationItem[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Cultural",
    "Historical",
    "Natural",
    "Adventure",
  ];

  const filtered = destinations.filter((dest) => {
    const matchesCategory =
      selectedCategory === "All" || dest.category === selectedCategory;
    const matchesSearch =
      dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.place.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="unbooked-destinations" className="flex flex-col gap-6 scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Compass className="size-6 text-muted-foreground" />
            Destinations You Haven't Booked Yet
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Places across Ethiopia you haven't reserved yet.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="rounded-xl bg-card border border-border px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-xs w-fit">
          <span className="font-bold text-foreground">{destinations.length}</span> destinations available
        </div>
      </div>

      {/* Controls: Category Filter & Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destination or region..."
            className="pl-9 h-9 text-xs rounded-xl"
          />
        </div>
      </div>

      {/* Grid of PublicDestinationCard */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center bg-card/50">
          <p className="text-sm font-medium text-foreground">
            No unbooked destinations match your search or filter.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Try resetting your search or selecting another category.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-4 text-xs"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((destination) => (
            <PublicDestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>
      )}
    </div>
  );
}
