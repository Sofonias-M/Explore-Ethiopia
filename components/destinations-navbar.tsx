"use client";

import {
  ThemeToggleButton,
  useThemeTransition,
} from "@/components/ui/shadcn-io/theme-toggle-button";
import { useSignOut } from "@/hooks/user-signout";
import { useTheme } from "next-themes";
import { ArrowLeft, LogIn, LogOut, Menu, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

type DestinationsNavbarProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  } | null;
};

export default function DestinationsNavbar({ user }: DestinationsNavbarProps) {
  const { theme, setTheme } = useTheme();
  const signOut = useSignOut();
  const { startTransition } = useThemeTransition();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    startTransition(() => {
      setTheme(theme === "light" ? "dark" : "light");
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Left: back + brand */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <span className="h-5 w-px bg-border" />

          <Link href="/destinations" className="group flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full border-2 border-brand/40 transition-transform duration-300 group-hover:rotate-12">
              <span className="size-3.5 rounded-full bg-[#C69A45] transition-transform duration-300 group-hover:scale-110" />
            </span>
            <span className="text-base font-semibold tracking-tight">
              Explore <span className="text-[#C69A45]">Ethiopia</span>
            </span>
          </Link>

          <Link href="/dashboard" className="ml-2 hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-brand sm:flex">
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Right: theme + user */}
        <div className="flex items-center gap-2">
          {mounted && (
            <div className="rounded-full bg-accent/60">
              <ThemeToggleButton
                theme={theme === "light" ? "light" : "dark"}
                variant="circle"
                onClick={toggleTheme}
              />
            </div>
          )}

          {user ? (
            <div className="group relative hidden sm:block">
              {/* Avatar trigger */}
              <button
                type="button"
                aria-label="Account menu"
                aria-haspopup="menu"
                className="flex rounded-full border border-border bg-accent/40 p-1.5 text-foreground transition-colors duration-200 hover:bg-accent focus-visible:outline-2 focus-visible:outline-brand"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={`${user.name}'s profile`}
                    referrerPolicy="no-referrer"
                    className="size-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex size-8 items-center justify-center rounded-full bg-muted">
                    <UserRound size={16} />
                  </span>
                )}
              </button>

              {/* Dropdown */}
              <div className="invisible absolute right-0 top-full z-50 w-64 translate-y-2 pt-3 opacity-0 transition-all duration-200 ease-out group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div
                  role="menu"
                  className="origin-top-right scale-95 rounded-2xl border border-border bg-card p-2 text-card-foreground shadow-2xl transition-transform duration-200 ease-out group-focus-within:scale-100 group-hover:scale-100"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 px-3 py-3">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="size-10 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                        <UserRound size={18} />
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {user.name || "Traveler"}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="my-1 h-px bg-border" />

                  {/* Log out */}
                  <button
                    role="menuitem"
                    onClick={signOut}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden items-center gap-2 rounded-full border border-[#C69A45]/40 bg-[#244B3C] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#315B49] sm:inline-flex"
            >
              <LogIn size={16} />
              Log in
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full border border-border bg-accent/40 p-2.5 text-foreground sm:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="border-t border-border bg-card px-5 pb-4 pt-2 text-sm text-card-foreground sm:hidden">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg p-3 hover:bg-accent"
            onClick={() => setMenuOpen(false)}
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          <Link
            href="/destinations"
            className="block rounded-lg p-3 hover:bg-accent"
            onClick={() => setMenuOpen(false)}
          >
            All Destinations
          </Link>

          <div className="my-1 h-px bg-border" />

          {user ? (
            <>
              <div className="flex items-center gap-3 px-3 py-3">
                {user.image ? (
                  <img
                    src={user.image}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="size-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex size-8 items-center justify-center rounded-full bg-muted">
                    <UserRound size={14} />
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {user.name || "Traveler"}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={signOut}
                className="flex w-full items-center gap-2 rounded-lg p-3 text-left text-destructive hover:bg-destructive/10"
              >
                <LogOut size={14} />
                Log out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="block rounded-lg p-3 font-semibold text-brand hover:bg-accent"
              onClick={() => setMenuOpen(false)}
            >
              Log in
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
