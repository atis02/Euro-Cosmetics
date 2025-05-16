import { configureStore } from "@reduxjs/toolkit";
import swiperReducer from "../reducers/swiperSlice";
import favoritesReducer from "../reducers/favoriteSlice";
import cartReducer from "../reducers/cartSlice";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    swiper: swiperReducer,
    cart: cartReducer,
  },
});

export default store;
