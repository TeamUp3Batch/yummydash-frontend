import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
  },
});

export const { loginStart, loginSuccess, loginFailure, signUpStart, signUpSuccess, signUpFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
