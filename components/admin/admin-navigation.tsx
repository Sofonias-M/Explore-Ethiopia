import Link from "next/link";
import {
  LayoutDashboard,
  MapPin,
  ArrowLeft,
} from "lucide-react";

const navigationItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Destinations",
    href: "/admin/destinations",
    icon: MapPin,
  },
];

export default function AdminNavigation() {
  return (
    <aside className="flex w-full flex-col border-b bg-white md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="border-b px-6 py-6">
        <Link href="/admin" className="block">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Explore Ethiopia
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Administration
          </p>
        </Link>
      </div>

      <nav
        aria-label="Admin navigation"
        className="flex flex-col gap-1 p-4"
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-950"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-950"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />

          <span>Back to website</span>
        </Link>
      </div>
    </aside>
  );
}