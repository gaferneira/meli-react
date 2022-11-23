import { Cart, CartItem } from "@/domain/entities";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Cart = {
  items: [],
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      state.items.push({
        id: action.payload.id,
        title: action.payload.title,
        quantity: 1,
        price: action.payload.price,
        total: action.payload.price,
      });
    },
    removeItem(state, action: PayloadAction<CartItem>) {},
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice;
