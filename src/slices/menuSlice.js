// menuSlice.js
import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    restaurantDetailsArray: [], // Use an array to store restaurant details
    cart: [],
  },
  reducers: {
    setRestaurantDetailsById: (state, action) => {
      const { id, data } = action.payload;
      // Check if the restaurant ID already exists in the array
      const existingRestaurantIndex = state.restaurantDetailsArray.findIndex(
        (restaurant) => restaurant.id === id
      );

      if (existingRestaurantIndex !== -1) {
        // Update the existing restaurant details if found
        state.restaurantDetailsArray[existingRestaurantIndex].data = data;
      } else {
        // Add a new restaurant object to the array
        state.restaurantDetailsArray.push({ id, data });
      }
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
  },
});

export const { setRestaurantDetailsById, addToCart } = menuSlice.actions;

export default menuSlice.reducer;
