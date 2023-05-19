/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentUserInfo: [],
};

const currentUser = createSlice({
	name: 'currentUser',
	initialState,
	reducers: {
		getCurrentUserInfo(state, action) {
			state.currentUserInfo = action.payload;
		},
	},
});

export const { getCurrentUserInfo } = currentUser.actions;
export default currentUser.reducer;
