import { configureStore } from "@reduxjs/toolkit";
import swiperReducer from "../reducers/swiperSlice";

const store = configureStore({
  reducer: {
    swiper: swiperReducer,
  },
});

export default store;
