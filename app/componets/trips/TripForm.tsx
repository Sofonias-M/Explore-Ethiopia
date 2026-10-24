"use client";

import type { FormEvent } from "react";
import { useAppDispatch } from "../lib/redux/hooks";
import {
    addTrip,
    editTrip,
  } from "../lib/redux/feature/trips/tripSlice";
import { store } from "../lib/redux/store";

type Trip = {
    id: number;
    title: string;
    destination: string;
    budget: number;
  };

  type TripFormProps = {
    trip?: Trip;
  };



  function TripForm({ trip }: TripFormProps)  {
  const dispatch = useAppDispatch();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = formData.get("title");
    const destination = formData.get("destination");
    const budget = formData.get("budget");

    // Validate the required fields.
    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof destination !== "string" ||
      !destination.trim() ||
      typeof budget !== "string" ||
      budget.trim() === "" ||
      !Number.isFinite(Number(budget)) ||
      Number(budget) < 0
    ) {
      alert("Please enter a valid title, destination, and budget.");
      return;
    }

    const budgetValue = Number(budget);

    // Save the new trip to Redux.
    const tripData = {
        id: trip?.id ?? Date.now(),
        title: title.trim(),
        destination: destination.trim(),
        budget: budgetValue,
      };

      if (trip) {
        dispatch(editTrip(tripData));
      } else {
        dispatch(addTrip(tripData));
      }
    console.log("Current Redux state:", store.getState());
    console.log("Trip dispatched to Redux");

    // Clear the form after creating the trip.
    event.currentTarget.reset();
  }

  return (

    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="title"
          className="text-sm font-medium text-stone-700"
        >
          Trip title
        </label>
        <input
  id="title"
  name="title"
  type="text"
  defaultValue={trip?.title ?? ""}
  required
  className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:ring-2 focus:ring-green-700"
/>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="destination"
          className="text-sm font-medium text-stone-700"
        >
          Destination
        </label>
        <input
          className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:ring-2 focus:ring-green-700"
          id="destination"
          name="destination"
          type="text"
          defaultValue={trip?.destination ?? ""}
          placeholder="e.g. Lalibela"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="startDate"
          className="text-sm font-medium text-stone-700"
        >
          Start date
        </label>
        <input
          className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:ring-2 focus:ring-green-700"
          id="startDate"
          name="startDate"
          type="date"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="endDate"
          className="text-sm font-medium text-stone-700"
        >
          End date
        </label>
        <input
          className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:ring-2 focus:ring-green-700"
          id="endDate"
          name="endDate"
          type="date"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="budget"
          className="text-sm font-medium text-stone-700"
        >
          Estimated budget (ETB)
        </label>
        <input
          className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:ring-2 focus:ring-green-700"
          id="budget"
          name="budget"
          type="number"
          min="0"
          step="any"
          defaultValue={trip?.budget ?? ""}
          placeholder="e.g. 15000"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="notes"
          className="text-sm font-medium text-stone-700"
        >
          Travel notes (optional)
        </label>
        <textarea
          className="w-full resize-y rounded-lg border border-stone-300 px-4 py-3 outline-none focus:ring-2 focus:ring-green-700"
          id="notes"
          name="notes"
          placeholder="What would you like to do on this trip?"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-green-800 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
      >
       {trip ? "Save Changes" : "Create Trip"}
      </button>
    </form>
  );
}

export default TripForm;
