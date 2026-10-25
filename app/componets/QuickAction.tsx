import Link from "next/link";

function QuickAction() {
    return(
        <section className="rounded-2xl border border-stone-200 bg-white p-5">
      <h2 className="text-lg font-bold text-stone-900">
        Quick Actions
      </h2>

      <Link
        href="/dashboard/trips/new"
        className="mt-4 block rounded-lg bg-green-50 p-3 font-medium text-green-800 hover:bg-green-100"
      >
        + Plan a new trip
      </Link>

      <Link
        href="/destinations"
        className="mt-3 block rounded-lg p-3 text-stone-600 hover:bg-stone-50"
      >
        Explore destinations →
      </Link>
    </section>
    )
}

export default QuickAction