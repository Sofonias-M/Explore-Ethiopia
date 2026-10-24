import Link from "next/link";
import { Mountain } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-600">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {/* Brand column */}
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
              <Mountain className="h-4 w-4 stroke-[2.2]" />
            </div>
            <span className="text-base font-bold tracking-tight text-gray-900">
              Explore Ethiopia
            </span>
          </Link>

          <p className="text-xs leading-6 text-gray-500">
            A comprehensive travel discovery platform celebrating the ancient
            monuments, stunning highlands, and vibrant cultures of Ethiopia.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-xs">
            <li>
              <Link href="/" className="hover:text-emerald-800 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/destinations" className="hover:text-emerald-800 transition">
                All Destinations
              </Link>
            </li>
            <li>
              <Link href="/destinations?category=Historical" className="hover:text-emerald-800 transition">
                Historical Sites
              </Link>
            </li>
            <li>
              <Link href="/destinations?category=Adventure" className="hover:text-emerald-800 transition">
                Adventure & Trekking
              </Link>
            </li>
          </ul>
        </div>

        {/* Trips & Planning */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
            Trip Planning
          </h3>
          <ul className="mt-4 space-y-2.5 text-xs">
            <li>
              <Link href="/login" className="hover:text-emerald-800 transition">
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-emerald-800 transition">
                Create Account
              </Link>
            </li>
            <li>
              <Link href="/dashboard/trips/new" className="hover:text-emerald-800 transition">
                Plan a New Trip
              </Link>
            </li>
          </ul>
        </div>

        {/* About & University Project */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
            About Project
          </h3>
          <p className="mt-4 text-xs leading-6 text-gray-500">
            Developed as a collaborative capstone project showcasing modern full-stack web engineering, accessible UI design, and scalable architecture.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-[#faf9f6] py-5 px-6">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 lg:px-10">
          <p>© {new Date().getFullYear()} Explore Ethiopia. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-gray-600 transition">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-gray-600 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
