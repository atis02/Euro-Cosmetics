// src/features/textColorSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "#000000",
  colorNavbarText: false,
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
  },
});

export const { setTextColor, setHoveredNavbar } = textColorSlice.actions;
export default textColorSlice.reducer;
