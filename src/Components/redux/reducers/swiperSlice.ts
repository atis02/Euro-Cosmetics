import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "#000000",
  colorNavbarText: false,
  scrolled: false,
  openSearch: false,
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
    setOpenSearch: (state, action) => {
      state.openSearch = action.payload;
    },
  },
});

export const { setTextColor, setHoveredNavbar, setScrolled, setOpenSearch } =
  textColorSlice.actions;
export default textColorSlice.reducer;
