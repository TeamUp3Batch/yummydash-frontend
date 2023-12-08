import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    loggedInAdmin: null,
    isLoggedIn: false,
    error: false
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.loggedInAdmin = action.payload;
      state.isLoggedIn = true;
      state.error = false;
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.loggedInAdmin = null;
      state.isLoggedIn = false;
      state.error = false;
    },
  }
});

export const {
  loginSuccess,
  loginFailure,
  logout,
} = adminSlice.actions;

export default adminSlice.reducer;
