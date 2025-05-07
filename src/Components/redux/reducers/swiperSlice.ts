// src/features/textColorSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "#000000",
  colorNavbarText: false,
  scrolled: false,
};

const textColorSlice = createSlice({
  name: "textColor",
  initialState,
  reducers: {
    setTextColor: (state, action) => {
      state.color = action.payload;
    },
    setHoveredNavbar: (state, action) => {
      state.colorNavbarText = action.payload;
    },
    setScrolled: (state, action) => {
      state.scrolled = action.payload;
    },
  },
});

export const { setTextColor, setHoveredNavbar, setScrolled } =
  textColorSlice.actions;
export default textColorSlice.reducer;
