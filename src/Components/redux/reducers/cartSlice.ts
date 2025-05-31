import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../Pages/Product/components/interfaces";

interface CartProduct extends Product {
  quantity: number;
}

interface CartState {
  items: CartProduct[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cartProductsEuroCos") || "[]"),
};

const saveToLocalStorage = (items: CartProduct[]) => {
  localStorage.setItem("cartProductsEuroCos", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cartProductsEuroCos",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(
        (item) => item.product?.id === action.payload.product?.id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveToLocalStorage(state.items);
    },

    removeProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product?.id !== action.payload
      );
      saveToLocalStorage(state.items);
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.items.find(
        (item) => item.product?.id === action.payload
      );
      if (product) {
        product.quantity += 1;
        saveToLocalStorage(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartProductsEuroCos");
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.items.find(
        (item) => item.product?.id === action.payload
      );
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.product?.id !== action.payload
          );
        }
        saveToLocalStorage(state.items);
      }
    },

    loadCart: (state) => {
      state.items = JSON.parse(
        localStorage.getItem("cartProductsEuroCos") || "[]"
      );
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  loadCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
