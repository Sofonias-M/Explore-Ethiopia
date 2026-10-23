"use client";

import { useAppSelector } from "../lib/redux/hooks";
import TripCard from "./TripCard";

function TripList(){
    const trips = useAppSelector((state) => state.trips.trips);
    return (
        <section className="space-y-4">
  <h2 className="text-2xl font-bold">Your Trips</h2>

  {trips.length === 0 ? (
    <p className="text-muted-foreground">
      No trips yet. Add your first trip above!
    </p>
  ) : (
    <div className="grid gap-4 md:grid-cols-2">
      {trips.map((trip) => (
        <TripCard key={trip.id} {...trip} />
      ))}
    </div>
  )}
</section>
    )
}


export default TripList;