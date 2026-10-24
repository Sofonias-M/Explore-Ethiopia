import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Trip = {
  id: number;
  title: string;
  destination: string;
  budget: number;
};

type TripsState = {
  trips: Trip[];
};

const initialState: TripsState = {
  trips: [],
};

const tripsSlice = createSlice({
    name: "trips",
    initialState,
    reducers: {
      addTrip: (state, action: PayloadAction<Trip>) => {
        state.trips.push(action.payload);
      },

      editTrip: (state, action: PayloadAction<Trip>) => {
        const updatedTrip = action.payload;

        const index = state.trips.findIndex(
          (trip) => trip.id === updatedTrip.id
        );

        if (index !== -1) {
          state.trips[index] = updatedTrip;
        }
      },

      deleteTrip: (state, action: PayloadAction<number>) => {
        state.trips = state.trips.filter(
          (trip) => trip.id !== action.payload
        );
      },
    },
  });

  export const { addTrip, editTrip, deleteTrip } = tripsSlice.actions;

  export default tripsSlice.reducer;
