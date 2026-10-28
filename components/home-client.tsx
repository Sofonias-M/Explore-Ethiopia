"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSignOut } from "@/hooks/user-signout";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  LogIn,
  LogOut,
  Mountain,
  Star,
  UserRound,
} from "lucide-react";
import localFont from "next/font/local";
import Navbar from "./navbar";
import { PublicDestinationCard } from "./public/PublicDestinationCard";
import type { UserDestinationsData } from "@/app/data/user/user-get-destinations";

const myCustomFont = localFont({
  src: "../public/fonts/modernline bold.otf",
});

type HomeClientProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  } | null;
  destinations: UserDestinationsData;
};

// const destinations = [
//   {
//     name: "Lalibela",
//     location: "Amhara, Ethiopia",
//     category: "History & Culture",
//     image:
//       "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=85",
//   },
//   {
//     name: "Simien Mountains",
//     location: "Northern Ethiopia",
//     category: "Mountain Escape",
//     image:
//       "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
//   },
//   {
//     name: "Danakil Depression",
//     location: "Afar, Ethiopia",
//     category: "Natural Wonders",
//     image:
//       "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1000&q=85",
//   },
// ];

export default function HomeClient({ user, destinations }: HomeClientProps) {
  const signOut = useSignOut();
  // const destinations = await userGetDestinations();

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO — the only full-width background image */}
      <section
        id="home"
        className="relative isolate min-h-[680px] overflow-hidden sm:min-h-[740px] lg:min-h-[800px]"
      >
        <img
          src="/hero4.jpg"
          alt="Ethiopian highlands illuminated by warm golden-hour sunlight"
          fetchPriority="high"
          className="absolute inset-0 -z-20 size-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#211C14]/75 via-[#211C14]/30 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#211C14]/50 via-transparent to-[#211C14]/10" />

        {/* Navigation */}
        <Navbar user={user} />

        {/* Hero content */}
        <div className="relative mx-auto flex min-h-[570px] max-w-[1200px] flex-col items-center justify-center px-5 pb-20 pt-12 text-center text-white sm:min-h-[620px] lg:min-h-[650px]">
          <p className="mb-[-8px] -rotate-6 font-serif text-6xl italic leading-none text-[#E3C58A] sm:mb-[-18px] sm:text-8xl lg:text-[118px]">
            <span className={myCustomFont.className}>Explore</span>
          </p>

          <h1 className="text-[clamp(3.8rem,12vw,10rem)] font-black uppercase leading-[0.95] tracking-[-0.07em] drop-shadow-lg">
            Ethiopia
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-7 text-white/90 sm:text-base">
            Extraordinary places. Ancient stories. Unforgettable journeys.
            Discover the beauty waiting around every corner.
          </p>

          <Link
            href="/destinations"
            className="mt-8 inline-flex items-center gap-4 rounded-full bg-[#244B3C] py-2 pl-6 pr-2 text-sm font-semibold text-white shadow-lg transition duration-300 hover:bg-[#315F4C] hover:shadow-xl"
          >
            Start Exploring
            <span className="flex size-10 items-center justify-center rounded-full bg-white">
              <ArrowUpRight size={20} />
            </span>
          </Link>

          {/* Bottom left */}
          <div className="absolute bottom-8 left-6 text-left sm:bottom-10 sm:left-10 lg:left-12">
            <div className="mb-3 flex -space-x-3">
              {["A", "M", "S", "T"].map((letter) => (
                <span
                  key={letter}
                  className="flex size-9 items-center justify-center rounded-full border-2 border-white bg-[#eef0df] text-xs font-semibold text-neutral-800"
                >
                  {letter}
                </span>
              ))}
              <span className="flex size-9 items-center justify-center rounded-full border-2 border-white bg-brand text-xs font-bold text-brand-foreground">
                +
              </span>
            </div>
            <p className="text-[11px] leading-5 text-white/90">
              Journeys worth sharing
              <br />
              Explore Ethiopia together
            </p>
          </div>

          {/* Bottom right */}
          <div className="absolute bottom-8 right-6 rounded-2xl border border-white/35 bg-black/25 p-4 text-left backdrop-blur-md sm:bottom-10 sm:right-10 sm:p-5 lg:right-12">
            <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
              1,000<span className="text-brand">+</span>
            </p>
            <p className="mt-1 text-right text-xs italic text-white/80">
              Stories to discover
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT — normal full-width website layout */}
      <div className="bg-background">
        {/* Overview */}
        <section
          id="about"
          className="mx-auto grid max-w-[1440px] gap-8 px-5 py-16 sm:gap-10 sm:px-10 sm:py-20 lg:grid-cols-[1fr_1fr_0.95fr] lg:gap-12 lg:px-12 lg:py-28"
        >
          <div className="flex flex-col items-start">
            <p className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              <Star size={13} className="fill-brand-accent text-brand-accent" />
              The experience
            </p>
            <h2 className="max-w-md text-3xl font-semibold leading-[1.15] tracking-[-0.045em] sm:text-4xl lg:text-[2.75rem]">
              Find your own path through{" "}
              <span className="font-normal italic text-brand">Ethiopia.</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
              From ancient rock-hewn churches to dramatic mountain trails,
              discover places that connect you to the heart of a remarkable
              country.
            </p>
            <a
              href="#destinations"
              className="mt-7 flex items-center gap-3 text-xs font-semibold"
            >
              Plan your journey
              <span className="flex size-8 items-center justify-center rounded-full bg-card shadow-sm">
                <ArrowUpRight size={16} />
              </span>
            </a>
          </div>

          <div className="group relative min-h-[360px] overflow-hidden rounded-3xl bg-muted shadow-sm sm:min-h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=85"
              alt="African landscape"
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211C14]/85 via-[#211C14]/15 to-transparent" />
            <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-[#211C14]/35 px-4 py-2 text-[10px] font-medium tracking-wide text-white backdrop-blur-md">
              A world of discovery
            </span>
            <div className="absolute inset-x-5 bottom-5 text-white">
              <h3 className="text-2xl font-medium tracking-tight">
                More than a destination.
              </h3>
              <p className="mt-2 text-xs leading-5 text-white/80">
                Discover the places and people that make Ethiopia unique.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            {[
              ["Where", "Your next adventure"],
              ["When", "Whenever you're ready"],
              ["Discover", "A country of wonders"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 border-b border-border py-4 text-xs"
              >
                <span className="text-muted-foreground">{label}</span>
                <span className="text-right font-medium">{value}</span>
              </div>
            ))}

            <div className="mt-5 flex-1 rounded-3xl border border-border/70 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7">
              <div className="mb-5 flex size-11 items-center justify-center rounded-full bg-[#EDE7D9] text-[#244B3C]">
                <Compass size={20} />
              </div>
              <h3 className="text-xl font-medium leading-7 tracking-tight">
                Every journey has a story. Make yours unforgettable.
              </h3>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                Explore hidden gems, experience local culture, and create a trip
                that feels truly yours.
              </p>
              <a
                href="#destinations"
                className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs font-semibold"
              >
                Discover your story
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>

        {/* Destinations */}
        <section
          id="destinations"
          className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-20 sm:px-10 sm:pb-24 lg:px-12 lg:pb-32"
        >
          <div className="mb-9 flex items-end justify-between gap-5">
            <div>
              <p className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                <Mountain size={14} className="text-brand-accent" />
                Made for the curious
              </p>
              <h2 className="max-w-xl text-3xl font-semibold leading-[1.1] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Destinations that{" "}
                <span className="font-normal italic text-brand">stay with you.</span>
              </h2>
            </div>
            <a
              href="#contact"
              className="hidden items-center gap-2 text-xs sm:flex"
            >
              Explore all places
              <span className="flex size-8 items-center justify-center rounded-full bg-card shadow-sm">
                <ArrowUpRight size={16} />
              </span>
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <PublicDestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>
          {/* <DestinationList /> */}
        </section>

        {/* Closing section */}
        <section
          id="contact"
          className="mx-auto grid max-w-[1440px] gap-8 px-6 pb-20 sm:px-10 lg:grid-cols-2 lg:px-12 lg:pb-28"
        >
          <div className="rounded-3xl bg-muted p-8 sm:p-12">
            <p className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              <Star size={13} className="fill-brand-accent text-brand-accent" />
              Your next chapter
            </p>
            <h2 className="max-w-lg text-3xl font-medium leading-tight tracking-[-0.05em] sm:text-5xl">
              Travel better when it feels personal.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
              Your interests, your pace, your kind of adventure. Start building
              a trip around the places you have always wanted to see.
            </p>
            <a
              href="#destinations"
              className="mt-8 inline-flex items-center gap-4 rounded-full bg-primary py-2 pl-6 pr-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Find your destination
              <span className="flex size-9 items-center justify-center rounded-full bg-primary-foreground text-primary">
                <ArrowRight size={17} />
              </span>
            </a>
          </div>

          <div className="flex flex-col justify-center lg:pl-8">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              A little inspiration
            </p>
            {[
              "Find a place that sparks your curiosity",
              "Experience culture beyond the guidebook",
              "Create a journey worth remembering",
            ].map((item, index) => (
              <a
                key={item}
                href="#destinations"
                className="group flex items-center justify-between gap-4 border-b border-border/80 py-5 text-sm transition-all duration-300 hover:pl-2 hover:text-brand"
              >
                <span className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">
                    0{index + 1}
                  </span>
                  {item}
                </span>
                <ArrowUpRight size={17} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            ))}

            {user ? (
              <div className="mt-7 flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card p-4">
                <div className="flex min-w-0 items-center gap-3">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      className="size-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex size-10 items-center justify-center rounded-full bg-[#EDE7D9] text-[#244B3C]">
                      <UserRound size={18} />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {user.name || "Traveler"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Ready for your next adventure?
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={signOut}
                  className="shrink-0 rounded-full"
                >
                  <LogOut size={14} />
                  Log out
                </Button>
              </div>
            ) : (
              <div className="mt-7 flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  Log in to start planning your trips.
                </p>
                <Button size="sm" className="shrink-0 rounded-full bg-[#244B3C] px-5 text-white shadow-sm transition-all duration-300 hover:bg-[#315F4C] hover:shadow-md">
                  <Link href="/login">
                    <LogIn size={14} />
                    Log in
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>

      <footer className="border-t border-[#E5DED0] bg-[#F0EBE1]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-9 text-xs text-[#706F63] sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12">
          <a
            href="#home"
            className="text-sm font-bold tracking-tight text-[#244B3C] transition-opacity hover:opacity-75"
          >
            Explore <span className="text-brand-text">Ethiopia.</span>
          </a>
          <p>Discover the extraordinary, one journey at a time.</p>
          <a
            href="#home"
            className="group flex items-center gap-2 font-medium text-[#244B3C] transition-colors hover:text-[#9B7430]"
          >
            Back to top
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </footer>
    </main>
  );
}
