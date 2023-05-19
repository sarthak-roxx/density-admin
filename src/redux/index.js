import { configureStore } from '@reduxjs/toolkit';
import allUsersReducer from './allUsers/allUsers.slice';
import menuReducer from './layout/menu';
import usersReducer from './kyc/users.slice';
import adminsReducer from './allAdmins/allAdmins.slice';
import currentUser from './currentUser/currentUser.slice';

const store = configureStore({
	reducer: {
		kycUsers: allUsersReducer,
		appMenu: menuReducer,
		users: usersReducer,
		admins: adminsReducer,
		currentUser: currentUser,
	},
});

export default store;
