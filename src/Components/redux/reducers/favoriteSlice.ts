import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../Pages/Product/components/interfaces";

interface FavoritesState {
  items: Product[];
}

const initialState: FavoritesState = {
  items: JSON.parse(localStorage.getItem("favoriteProductsEuroCos") || "[]"),
};

const favoritesSlice = createSlice({
  name: "favoriteProductsEuroCos",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(
        (item) => item.product?.articule === action.payload.product.articule
      );
      if (exists) {
        state.items = state.items.filter(
          (item) => item.product?.articule !== action.payload.product.articule
        );
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem(
        "favoriteProductsEuroCos",
        JSON.stringify(state.items)
      );
    },
    loadFavorites: (state) => {
      state.items = JSON.parse(
        localStorage.getItem("favoriteProductsEuroCos") || "[]"
      );
    },
  },
});

export const { toggleFavorite, loadFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
