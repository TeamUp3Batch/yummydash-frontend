// restaurantSlice.js
import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurants: [],
    cuisines: [],
  },
  reducers: {
    setRestaurantsByCuisine: (state, action) => {
      state.restaurants = action.payload;
    },
    setRestaurantsNearYou: (state, action) => {
      state.restaurants = action.payload;
    },
    setAllCuisines: (state,action) => {
      state.cuisines = action.payload;
    }
  },
});

export const { setRestaurantsByCuisine, setRestaurantsNearYou, setAllCuisines } = restaurantSlice.actions;

export default restaurantSlice.reducer;
