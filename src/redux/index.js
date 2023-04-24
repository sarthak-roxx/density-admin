import { configureStore } from "@reduxjs/toolkit";
import allUsersReducer from "./allUsers/allUsers.slice";
import menuReducer from "./layout/menu";
import usersReducer from "./kyc/users.slice";
import adminsReducer from "./allAdmins/allAdmins.slice";

const store = configureStore({
  reducer: {
    kycUsers: allUsersReducer,
    appMenu: menuReducer,
    users: usersReducer,
    admins: adminsReducer,
  },
});

export default store;
