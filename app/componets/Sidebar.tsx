import Link from "next/link";

function Sidebar() {
    return(
        <aside className="rounded-2xl border border-stone-200 bg-white p-5">
      <h2 className="text-xl font-bold text-green-800">
        Explore Ethiopia
      </h2>

      <nav className="mt-8 flex flex-col gap-3">
        <Link
          href="/dashboard"
          className="rounded-lg bg-green-50 p-3 font-semibold text-green-800"
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard"
          className="rounded-lg p-3 text-stone-600 hover:bg-stone-50"
        >
          My Trips
        </Link>

        <Link
          href="/dashboard/trips/new"
          className="rounded-lg p-3 text-stone-600 hover:bg-stone-50"
        >
          Create Trip
        </Link>

        <Link
          href="/destinations"
          className="rounded-lg p-3 text-stone-600 hover:bg-stone-50"
        >
          Destinations
        </Link>
      </nav>
    </aside>
    )
}
export default Sidebar;