import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawerOpen: false,
};

const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleDrawer(state) {
      state.drawerOpen = !state.drawerOpen;
    },
  },
});

export default menu.reducer;
export const { toggleDrawer } = menu.actions;
