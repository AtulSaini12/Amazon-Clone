import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      const ind = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      let newCart = [...state.items];
      if (ind >= 0) {
        newCart.splice(ind, 1);
      } else {
        console.warn("The product doesn't exist ");
      }
      state.items = newCart;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price, 0);
export default cartSlice.reducer;
