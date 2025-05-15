import { configureStore } from "@reduxjs/toolkit";
import swiperReducer from "../reducers/swiperSlice";
import favoritesReducer from "../reducers/favoriteSlice";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    swiper: swiperReducer,
  },
});

export default store;
