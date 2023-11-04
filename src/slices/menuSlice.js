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
        state.restaurantDetailsArray.push(action.payload);
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
  },
});

export const { setRestaurantDetailsById, addToCart } = menuSlice.actions;

export default menuSlice.reducer;
