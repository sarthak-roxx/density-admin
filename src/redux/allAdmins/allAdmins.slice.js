/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const initialState = {
  admins: [],
  adminPermissions: [],
};

const admins = createSlice({
  name: "admins",
  initialState,
  reducers: {
    addAllAdmins(state, action) {
      state.admins = action.payload;
    },
    addAdminPermissions(state, action) {
      const adminExists = state.adminPermissions.find(
        (admin) => admin.adminId === action.payload.adminId
      );
      if (!adminExists) {
        state.adminPermissions.push(action.payload);
      }
    },
    
  },
});

export const { addAllAdmins, addAdminPermissions } = admins.actions;
export default admins.reducer;
