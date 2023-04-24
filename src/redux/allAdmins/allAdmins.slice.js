/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const initialState = {
  admins: [],
};

const admins = createSlice({
  name: "admins",
  initialState,
  reducers: {
    addAllAdmins(state, action) {
      state.admins = action.payload;
    },
  },
});

export const { addAllAdmins } = admins.actions;
export default admins.reducer;
