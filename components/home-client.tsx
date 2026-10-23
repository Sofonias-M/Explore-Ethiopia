"use client";

import {
  ThemeToggleButton,
  useThemeTransition,
} from "@/components/ui/shadcn-io/theme-toggle-button";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { LogOut, UserRound,LayoutDashboard,
  MapPin,
  Map,
  PlusCircle, } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import TripSummary from "@/app/componets/TripSummary";

import TripList from "@/app/componets/trips/TripList";
import Link from "next/link";

type HomeClientProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
};



export default function HomeClient({ user }: HomeClientProps) {
  const { theme, setTheme } = useTheme();
  const { startTransition } = useThemeTransition();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    startTransition(() => {
      setTheme(theme === "light" ? "dark" : "light");
    });
  };

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.replace("/login");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to log out");
          },
        },
      });
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* LEFT SIDEBAR */}
        <aside className="w-full shrink-0 border-b border-stone-200 bg-white p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
          <h2 className="text-xl font-bold text-green-800">
            Explore Ethiopia
          </h2>

          <p className="mt-1 text-sm text-stone-500">
            Plan your next adventure
          </p>

          <nav className="mt-8 space-y-2">
          <Link href="/dashboard/trips/new">
  <Button>
    Create Trip
  </Button>
</Link>

            <button
              type="button"
              onClick={() =>
                toast.info("The Destinations page is coming soon.")
              }
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-stone-600 hover:bg-stone-100"
            >
              <MapPin className="size-5" />
              Destinations
            </button>

            <Link
              href="#my-trips"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-stone-600 hover:bg-stone-100"
            >
              <Map className="size-5" />
              My Trips
            </Link>

            <Link
  href="/dashboard/trips/new"
  className="flex items-center gap-3 rounded-lg px-4 py-3 text-stone-600 hover:bg-stone-100"
>
  <PlusCircle className="size-5" />
  Create Trip
</Link>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <div className="min-w-0 flex-1 p-5 md:p-8">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {user.image ? (
                <img
                  src={user.image}
                  alt={`${user.name}'s Google profile`}
                  referrerPolicy="no-referrer"
                  className="size-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-10 items-center justify-center rounded-full bg-stone-200">
                  <UserRound className="size-5" />
                </div>
              )}

              <div>
                <h1 className="font-semibold">
                  Welcome, {user.name || "there"}!
                </h1>
                <p className="text-sm text-stone-500">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {mounted && (
                <ThemeToggleButton
                  theme={theme === "light" ? "light" : "dark"}
                  variant="circle"
                  onClick={toggleTheme}
                />
              )}

              <Button onClick={handleLogout} disabled={loggingOut}>
                <LogOut className="mr-2 size-4" />
                {loggingOut ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </header>

          <section id="dashboard" className="mt-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">
                  Your Travel Dashboard
                </h2>
                <p className="mt-2 text-stone-500">
                  Plan your next Ethiopian adventure.
                </p>
              </div>


            </div>

            <TripSummary />



            <div id="my-trips">
              <TripList />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
