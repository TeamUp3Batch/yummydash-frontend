import { createSlice } from '@reduxjs/toolkit';

const driverSlice = createSlice({
  name: 'driver',
  initialState: {
    loggedInDriver: null,
    token: null,
    isLoading: false,
    error: false
  },
  reducers: {
    loginDriverStart: (state) => {
      state.isLoading = true;
    },
    loginDriverSuccess: (state, action) => {
      state.loggedInDriver = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    signUpDriverStart: (state) => {
      state.isLoading = true;
    },
    signUpDriverSuccess: (state, action) => {
      state.loggedInDriver = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    signUpDriverFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    loginDriverFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutDriver: (state) => {
      state.loggedInDriver = null;
      state.isLoading = false;
      state.error = false;
    },
    updateDriverAddress: (state, action) => {
      state.loggedInDriver.address = action.payload;
    },
    deleteDriverAddress: (state, action) => {
      state.loggedInDriver.address = action.payload;
    },
    updateDriverPhoneNumber: (state, action) => {
      state.loggedInDriver.phoneNumber = action.payload;
    },
    updateDriverFirstName: (state, action) => {
      state.loggedInDriver.firstName = action.payload;
    },
    updateDriverLastName: (state, action) => {
      state.loggedInDriver.lastName = action.payload;
    }
  }
});

export const {
  loginDriverStart,
  loginDriverSuccess,
  loginDriverFailure,
  signUpDriverStart,
  signUpDriverSuccess,
  signUpDriverFailure,
  logoutDriver,
  updateDriverAddress,
  deleteDriverAddress,
  updateDriverPhoneNumber,
  updateDriverFirstName,
  updateDriverLastName
} = driverSlice.actions;

export default driverSlice.reducer;
