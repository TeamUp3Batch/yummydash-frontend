// menuSlice.js
import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    cart: null,
    cartId: null,
    checkout: null,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart = action.payload;
    },
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    resetMenuState: (state) => {
      state.cart = null;
      state.cartId = null;
    },
    updateCartItemQuantity: (state, action) => {
      const { menuId, quantity } = action.payload;
      if (state.cart && state.cart.menuItems) {
        const cartItem = state.cart.menuItems.find(
          (item) => item.menuId === menuId
        );
        if (cartItem) {
          cartItem.quantity = quantity;
        }
      }
    },
    checkout:(state,action)=>{
      state.checkout = action.payload;
    },
  },
});

export const { addToCart, setCartId, resetMenuState, updateCartItemQuantity, checkout  } =
  menuSlice.actions;

export default menuSlice.reducer;
