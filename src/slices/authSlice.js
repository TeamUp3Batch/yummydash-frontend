import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedInUser: null,
    token: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.loggedInUser = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    signUpStart: (state) => {
      state.isLoading = true;
    },
    signUpSuccess: (state, action) => {
      state.loggedInUser = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    signUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.loggedInUser = null;
      state.isLoading = false;
      state.error = false;
    },
    // Add the following reducer functions to update user data in authSlice
    updateAddress: (state, action) => {
      state.loggedInUser.address = action.payload;
    },
    deleteAddress: (state, action) => {
      state.loggedInUser.address = action.payload;
    },
    updatePhoneNumber: (state, action) => {
      state.loggedInUser.phoneNumber = action.payload;
    },
    updateFirstName: (state, action) => {
      state.loggedInUser.firstName = action.payload;
    },
    updateLastName: (state, action) => {
      state.loggedInUser.lastName = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  logout,
  updateAddress,
  deleteAddress,
  updatePhoneNumber,
  updateFirstName,
  updateLastName,
} = authSlice.actions;

export default authSlice.reducer;
