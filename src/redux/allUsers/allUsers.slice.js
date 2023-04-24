import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersData: [
    {
      email: "john.doe@example.com",
      firstName: "John",
      id: "8382",
      isDeleted: false,
      kycStatus: "failed",
      lastName: "Doe",
      mobileNumber: "+1-555-555-5555",
      pennyDropStatus: "not started",
      profilePic: "https://example.com/profiles/johndoe.jpg",
      refereeUserID: null,
      updated: "2022-01-01T12:00:00Z",
      username: "johndoe",
    },
    {
      email: "jane.doe@example.com",
      firstName: "Jane",
      id: "5678",
      isDeleted: false,
      kycStatus: "in_progress",
      lastName: "Doe",
      mobileNumber: "+1-555-555-5555",
      pennyDropStatus: "verified",
      profilePic: "https://example.com/profiles/janedoe.jpg",
      refereeUserID: null,
      updated: "2022-01-01T12:00:00Z",
      username: "janedoe",
    },
    {
      email: "mike.tyson@example.com",
      firstName: "Mike",
      id: "9012",
      isDeleted: false,
      kycStatus: "success",
      lastName: "Tyson",
      mobileNumber: "+1-555-5555",
      pennyDropStatus: "not started",
      profilePic: null,
      refereeUserID: null,
      updated: "2022-01-01T12:00:00Z",
      username: "deleteduser",
    },
    {
      email: "alice@example.com",
      firstName: "Alice",
      id: "3456",
      isDeleted: false,
      kycStatus: "success",
      lastName: "Smith",
      mobileNumber: "+1-555-555-5555",
      pennyDropStatus: "verified",
      profilePic: "https://example.com/profiles/alicesmith.jpg",
      refereeUserID: "1234",
      updated: "2022-01-01T12:00:00Z",
      username: "alicesmith",
    },
    {
      email: "bob@example.com",
      firstName: "Bob",
      id: "7890",
      isDeleted: false,
      kycStatus: "success",
      lastName: "Johnson",
      mobileNumber: "+1-555-555-5555",
      pennyDropStatus: "not started",
      profilePic: null,
      refereeUserID: null,
      updated: "2022-01-01T12:00:00Z",
      username: "bobjohnson",
    },
    {
      email: "jim@example.com",
      firstName: "Jim",
      id: "2468",
      isDeleted: false,
      kycStatus: "success",
      lastName: "Lee",
      mobileNumber: "+1-555-555-5555",
      pennyDropStatus: "not started",
      profilePic: "https://example.com/profiles/jimlee.jpg",
      refereeUserID: null,
      updated: "2022-01-01T12:00:00Z",
      username: "jimlee123",
    },
    {
      email: "susan@example.com",
      firstName: "Susan",
      id: "1357",
      isDeleted: false,
      kycStatus: "failed",
      lastName: "Brown",
      mobileNumber: "+1-555-555-5555",
      pennyDropStatus: "not started",
      profilePic: "https://example.com/profiles/susanbrown.jpg",
      refereeUserID: null,
      updated: "2022-01-01T12:00:00Z",
      username: "susanbrown",
    },
    {
      email: "jake@example.com",
      firstName: "Jake",
      id: "1593",
      isDeleted: false,
      kycStatus: "failed",
      lastName: "Smith",
      mobileNumber: "+1-555-555-5555",
      pennyDropStatus: "not started",
      profilePic: "https://example.com/profiles/jakesmith.jpg",
      refereeUserID: null,
      updated: "2022-01-01T12:00:00Z",
      username: "jakesmith",
    },
    {
      email: "emily@example.com",
      firstName: "Emily",
      id: "3579",
      isDeleted: false,
      kycStatus: "failed",
      lastName: "Davis",
      mobileNumber: "+1-555-555-5555",
      pennyDropStatus: "verified",
      profilePic: "https://example.com/profiles/emilydavis.jpg",
      refereeUserID: null,
      updated: "2022-01-01T12:00:00Z",
      username: "emilydavis",
    },
    {
      email: "john@example.com",
      firstName: "John",
      id: "1234",
      isDeleted: false,
      kycStatus: "failed",
      lastName: "Johnson",
      mobileNumber: "+1-555-5555",
      pennyDropStatus: "not started",
      profilePic: null,
      refereeUserID: null,
      updated: "2022-01-01T12:00:00Z",
      username: "johnjohnson",
    },
  ],
  usersKycData: [],
  kycLog: [],
};

const allUsers = createSlice({
  name: "kycUsers",
  initialState,
  reducers: {
    editUser(state, action) {
      return {
        ...state,
        usersData: state.usersData.map((user) => {
          if (user.id === action.payload) {
            return { ...user, kycStatus: "success" };
          }
          return user;
        }),
      };
    },
    filterByFirstname(state, action) {
      return {
        ...state,
        usersData: state.usersData.filter((user) =>
          user.firstName.includes(action.payload)
        ),
      };
    },
    filterByLastname(state, action) {
      return {
        ...state,
        usersData: state.usersData.filter((user) =>
          user.lastName.includes(action.payload)
        ),
      };
    },
    filterByEmail(state, action) {
      return {
        ...state,
        usersData: state.usersData.filter((user) =>
          user.email.includes(action.payload)
        ),
      };
    },
    resetFilter(state) {
      return {
        ...state,
        usersData: initialState.usersData,
      };
    },
  },
});

export const {
  editUser,
  filterByFirstname,
  filterByLastname,
  filterByEmail,
  resetFilter,
} = allUsers.actions;
export default allUsers.reducer;
