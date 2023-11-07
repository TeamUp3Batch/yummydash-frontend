// menuSlice.js
import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    cart: null,
    cartId: null,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart = action.payload;
    },
    setCartId: (state, action) => {
      state.cartId= action.payload;
    },
    removeFromCart: (state, action) => {
      state.cart.menuItems = state.cart.menuItems.filter(item => item._id !== action.payload._id);
    },
    resetMenuState :(state) => {
      state.cart = null;
      state.cartId = null;

    }

  },
});

export const { addToCart, setCartId, removeFromCart, resetMenuState  } = menuSlice.actions;

export default menuSlice.reducer;
