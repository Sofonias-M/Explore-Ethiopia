import { useAppSelector } from "./lib/redux/hooks";

function TripSummary(){
    const trips = useAppSelector((state) => state.trips.trips);

const totalTrips = trips.length;

const totalBudget = trips.reduce(
  (total, trip) => total + trip.budget,
  0
);
const totalDestinations = new Set(
    trips.map((trip) => trip.destination.trim().toLowerCase())
  ).size;
    return(
        <section className="rounded-2xl border border-stone-200 bg-white p-5">
      <h2 className="text-lg font-bold text-stone-900">
        Trip Summary
      </h2>

      <p className="mt-2 text-sm text-stone-500">
        Your travel plans at a glance.
      </p>

      <div className="mt-5 flex justify-between border-b border-stone-100 py-3">
        <span className="text-stone-600">Total trips</span>
        <span className="font-semibold">{totalTrips}</span>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-5">
                <p className="text-sm text-stone-500">Destinations</p>
                <p className="mt-2 text-2xl font-bold text-stone-900">{totalDestinations}</p>
              </div>

      <div className="flex justify-between py-3">
        <span className="text-stone-600">Total budget</span>
        <span className="font-semibold">
  ETB {totalBudget.toLocaleString()}
</span>
      </div>
    </section>
    )
}
export default TripSummary;