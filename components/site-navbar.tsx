"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Mountain, Search, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDestinationsActive =
    pathname === "/destinations" || pathname.startsWith("/destinations/");
  const isHomeActive = pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 lg:px-10">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
            <Mountain className="h-5 w-5 stroke-[2.2]" />
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Explore Ethiopia
          </span>
        </Link>

        {/* Center Nav Links - Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? isHomeActive
                : link.href === "/destinations"
                ? isDestinationsActive
                : pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition ${
                  isActive
                    ? "text-gray-900 font-semibold"
                    : "text-gray-600 hover:text-emerald-800"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-3.5 h-[2.5px] rounded-full bg-emerald-800" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/destinations"
            aria-label="Search destinations"
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
          >
            <Search className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-emerald-800 transition px-2 py-1"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-emerald-800 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-900 shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/destinations"
            aria-label="Search destinations"
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <Search className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-gray-200 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-gray-700 py-1.5 hover:text-emerald-800"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-full"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 text-sm font-semibold text-white bg-emerald-800 rounded-full"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
