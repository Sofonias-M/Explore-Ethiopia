"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/destinations?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/destinations");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mt-8 flex w-full max-w-xl items-center rounded-2xl bg-white p-2 shadow-2xl backdrop-blur-sm"
    >
      <div className="flex flex-1 items-center gap-3 pl-3 text-gray-400">
        <Search className="h-5 w-5 shrink-0 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destinations..."
          className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
        />
      </div>
      <button
        type="submit"
        className="rounded-xl bg-emerald-800 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-900 shrink-0"
      >
        Search
      </button>
    </form>
  );
}
