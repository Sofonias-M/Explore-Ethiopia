"use client";

import { ThemeToggleButton } from "@/components/ui/shadcn-io/theme-toggle-button";
import { useTheme } from "next-themes";
import { LogOut, Menu, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

type NavbarProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
  onLogout: () => void;
  loggingOut: boolean;
};

export default function Navbar({ user, onLogout, loggingOut }: NavbarProps) {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="relative z-30 mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
      <a href="#home" className="flex items-center gap-2.5 text-white">
        <span className="flex size-8 items-center justify-center rounded-full border-2 border-white/80">
          <span className="size-4 rounded-full bg-brand" />
        </span>
        <span className="text-lg font-semibold tracking-tight">
          Explore <span className="text-brand">Ethiopia</span>
        </span>
      </a>

      <div className="flex items-center gap-2">
        {mounted && (
          <div className="rounded-full bg-card/90 text-foreground">
            <ThemeToggleButton
              theme={theme === "light" ? "light" : "dark"}
              variant="circle"
              onClick={toggleTheme}
            />
          </div>
        )}

        <div className="group relative hidden sm:block">
          {/* Avatar trigger */}
          <button
            type="button"
            aria-label="Account menu"
            aria-haspopup="menu"
            className="flex rounded-full border border-white/30 bg-black/20 p-1.5 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/40 focus-visible:outline-2 focus-visible:outline-white"
          >
            {user.image ? (
              <img
                src={user.image}
                alt={`${user.name}'s profile`}
                referrerPolicy="no-referrer"
                className="size-8 rounded-full object-cover"
              />
            ) : (
              <span className="flex size-8 items-center justify-center rounded-full bg-white/20">
                <UserRound size={16} />
              </span>
            )}
          </button>

          {/* Dropdown: pt-3 is an invisible bridge so hover isn't lost in the gap */}
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
                onClick={onLogout}
                disabled={loggingOut}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-60"
              >
                <LogOut size={16} />
                {loggingOut ? "Logging out..." : "Log out"}
              </button>
            </div>
          </div>
        </div>

        <button
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-full border border-white/30 bg-black/20 p-3 text-white md:hidden"
        >
          <Menu size={18} />
        </button>
      </div>

      {menuOpen && (
        <nav className="absolute right-5 top-20 z-50 flex w-52 flex-col rounded-2xl bg-card p-2 text-sm text-card-foreground shadow-2xl md:hidden">
          <a
            className="rounded-lg p-3 hover:bg-accent"
            href="#home"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>
          <a
            className="rounded-lg p-3 hover:bg-accent"
            href="#about"
            onClick={() => setMenuOpen(false)}
          >
            About us
          </a>
          <a
            className="rounded-lg p-3 hover:bg-accent"
            href="#destinations"
            onClick={() => setMenuOpen(false)}
          >
            Destinations
          </a>
          <a
            className="rounded-lg p-3 hover:bg-accent"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
          <button
            onClick={onLogout}
            disabled={loggingOut}
            className="rounded-lg p-3 text-left text-destructive hover:bg-destructive/10"
          >
            {loggingOut ? "Logging out..." : "Log out"}
          </button>
        </nav>
      )}
    </header>
  );
}
