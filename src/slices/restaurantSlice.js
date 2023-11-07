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
    },
    resetRestaurantState: (state) => {
      state.restaurants = [];
      state.cuisines = [];
    }
  },
});

export const { setRestaurantsByCuisine, setRestaurantsNearYou, setAllCuisines, resetRestaurantState } = restaurantSlice.actions;

export default restaurantSlice.reducer;