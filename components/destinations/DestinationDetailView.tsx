"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Star,
  Calendar,
  Clock,
  Heart,
  ChevronLeft,
  Share2,
  DollarSign,
  PlusCircle,
  Check,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import type { Destination } from "@/lib/destinations";

type DestinationDetailViewProps = {
  destination: Destination;
};

export default function DestinationDetailView({
  destination,
}: DestinationDetailViewProps) {
  const [activeTab, setActiveTab] = useState<
    "Overview" | "Gallery" | "Location" | "Reviews"
  >("Overview");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [heroImageSrc, setHeroImageSrc] = useState(destination.imageUrl);
  const [copied, setCopied] = useState(false);

  // Check and sync wishlist with localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(`wishlist_${destination.id}`);
        if (saved === "true") {
          setIsWishlisted(true);
        }
      } catch {
        // localStorage not accessible
      }
    }
  }, [destination.id]);


  const handleToggleWishlist = () => {
    const nextState = !isWishlisted;
    setIsWishlisted(nextState);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`wishlist_${destination.id}`, String(nextState));
      } catch {
        // localStorage not accessible
      }
    }

    if (nextState) {
      toast.success(`${destination.name} saved to your wishlist!`);
    } else {
      toast.info(`${destination.name} removed from your wishlist.`);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Destination link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-6 sm:px-10 lg:px-12">
      {/* Top Bar: Back link & share */}
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-emerald-800 transition"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to destinations</span>
        </Link>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition shadow-sm"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-600" />
          ) : (
            <Share2 className="h-3.5 w-3.5" />
          )}
          <span>{copied ? "Copied" : "Share"}</span>
        </button>
      </div>

      {/* Hero Banner with Title & Meta */}
      <div className="relative overflow-hidden rounded-3xl bg-stone-900 shadow-md">
        <div className="relative h-72 w-full sm:h-96 md:h-[440px]">
          <img
            src={heroImageSrc}
            alt={`${destination.name} in ${destination.region}, Ethiopia`}
            onError={() => {
              setHeroImageSrc(
                "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80"
              );
            }}
            className="h-full w-full object-cover object-center"
          />

          {/* Dark gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

          {/* Wishlist button top-right on hero */}
          <button
            type="button"
            onClick={handleToggleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition hover:bg-white/40"
          >
            <Heart
              className={`h-5 w-5 transition ${
                isWishlisted ? "fill-rose-500 text-rose-500" : "text-white"
              }`}
            />
          </button>

          {/* Bottom Title & Meta on hero */}
          <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-10 text-white">
            <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
              {destination.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 text-white/90">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span>{destination.region}</span>
              </span>

              <span className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold backdrop-blur-sm border border-white/10 text-amber-300">
                <Star className="h-3.5 w-3.5 fill-amber-300" />
                <span>
                  {destination.rating.toFixed(1)} ({destination.reviews} reviews)
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mt-6 border-b border-gray-200">
        <div className="flex gap-8 overflow-x-auto">
          {(["Overview", "Gallery", "Location", "Reviews"] as const).map(
            (tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-3 text-sm font-semibold transition shrink-0 ${
                    isActive
                      ? "text-emerald-900"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab}
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-emerald-800" />
                  )}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr] items-start">
        {/* LEFT COLUMN: Overview or Tab Info */}
        <div className="space-y-8">
          {activeTab === "Overview" && (
            <>
              <div>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  About {destination.name}
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-7 sm:leading-8 text-gray-600">
                  {destination.description}
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                <div className="flex items-start gap-3.5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">
                      Best time to visit
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-gray-900">
                      {destination.bestTimeToVisit}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">
                      Recommended duration
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-gray-900">
                      {destination.duration || "2–3 days"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">
                      Location
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-gray-900">
                      {destination.locationDetail || `${destination.region}, Ethiopia`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">
                      Estimated Cost
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-gray-900">
                      ${destination.estimatedCost} / person
                    </p>
                  </div>
                </div>
              </div>

              {/* Sample Data Disclaimer */}
              <div className="flex items-center gap-2 rounded-xl bg-amber-50/80 p-3 text-xs text-amber-800 border border-amber-200/60">
                <Info className="h-4 w-4 shrink-0" />
                <span>
                  Note: Costs, durations, and ratings are illustrative sample figures for planning purposes. Confirm current rates with licensed local operators before departure.
                </span>
              </div>
            </>
          )}

          {activeTab === "Gallery" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                {destination.name} Photo Gallery
              </h2>
              <p className="text-sm text-gray-600">
                Featured view of {destination.name}.
              </p>
              <div className="max-w-2xl overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={destination.imageUrl}
                  alt={`${destination.name} in ${destination.region}, Ethiopia`}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
            </div>
          )}

          {activeTab === "Location" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                Location & Travel Access
              </h2>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-3">
                <p className="text-sm font-semibold text-gray-900">
                  Region: {destination.region}, Ethiopia
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Regular domestic flights operated by Ethiopian Airlines connect Addis Ababa Bole International Airport with regional airports in {destination.region}. Certified local guides and 4WD transport can be arranged locally or via your travel dashboard.
                </p>
                <div className="pt-2 text-xs text-gray-500">
                  Tip: Wear comfortable walking shoes and stay hydrated. Local permits or park entrance fees may apply.
                </div>
              </div>
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Sample Traveler Reviews
                </h2>
                <div className="flex items-center gap-1 font-semibold text-amber-500 text-sm">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <span>{destination.rating.toFixed(1)}</span>
                  <span className="text-gray-400 font-normal">
                    ({destination.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-gray-900">
                      Yordanos A.
                    </span>
                    <span className="text-xs text-gray-400">2 weeks ago</span>
                  </div>
                  <div className="mt-1 flex text-amber-400 text-xs">
                    {"★".repeat(5)}
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    An unforgettable destination! The history and scenery took our breath away. Highly recommend staying at least two full days.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-gray-900">
                      Michael S.
                    </span>
                    <span className="text-xs text-gray-400">1 month ago</span>
                  </div>
                  <div className="mt-1 flex text-amber-400 text-xs">
                    {"★".repeat(5)}
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    One of the most unique places in the world. Our local guide was fantastic and made the entire experience seamless.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Action Buttons */}
        <div className="space-y-4 lg:pl-4">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900">
              Plan Your Visit
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Save {destination.name} to your personal wishlist or start building your trip itinerary today.
            </p>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleToggleWishlist}
                className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold transition shadow-sm ${
                  isWishlisted
                    ? "bg-rose-50 text-rose-600 border border-rose-200"
                    : "bg-emerald-900 text-white hover:bg-emerald-950"
                }`}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isWishlisted ? "fill-rose-500 text-rose-500" : ""
                  }`}
                />
                <span>
                  {isWishlisted ? "Saved in Wishlist" : "Add to Wishlist"}
                </span>
              </button>

              <Link
                href={`/dashboard/trips/new?destinationId=${destination.id}&destinationName=${encodeURIComponent(destination.name)}`}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-900 bg-white py-3.5 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 transition"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Plan a Trip to {destination.name}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
