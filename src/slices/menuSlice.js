// menuSlice.js
import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuItems: [],
    cart: [],
  },
  reducers: {
    setMenuItemsByRestaurant: (state, action) => {
      state.menuItems = action.payload;
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
  },
});

export const { setMenuItemsByRestaurant, addToCart } = menuSlice.actions;

export default menuSlice.reducer;
