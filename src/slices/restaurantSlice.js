// restaurantSlice.js
import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurants: [],
  },
  reducers: {
    setRestaurantsByCuisine: (state, action) => {
      state.restaurants = action.payload;
    },
    setRestaurantsNearYou: (state, action) => {
      state.restaurants = action.payload;
    },
  },
});

export const { setRestaurantsByCuisine, setRestaurantsNearYou } = restaurantSlice.actions;

export default restaurantSlice.reducer;
