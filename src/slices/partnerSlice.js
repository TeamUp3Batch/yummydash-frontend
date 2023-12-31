import { createSlice } from '@reduxjs/toolkit';

const partnerSlice = createSlice({
  name: 'partner',
  initialState: {
    loggedInPartner: null,
    token: null,
    isLoading: false,
    error: false
  },
  reducers: {
    loginPartnerStart: (state) => {
      state.isLoading = true;
    },
    loginPartnerSuccess: (state, action) => {

      state.loggedInPartner = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    signUpPartnerStart: (state) => {
      state.isLoading = true;
    },
    signUpPartnerSuccess: (state, action) => {
      state.loggedInPartner = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    signUpPartnerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    loginPartnerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutPartner: (state) => {
      state.loggedInPartner = null;
      state.isLoading = false;
      state.error = false;
    },
    updatePhoneNumber: (state, action) => {
      state.loggedInPartner.phoneNumber = action.payload;
    },
    updateName: (state, action) => {
      state.loggedInPartner.name = action.payload;
    },
    
  }
});

export const {
  loginPartnerStart,
  loginPartnerSuccess,
  loginPartnerFailure,
  signUpPartnerStart,
  signUpPartnerSuccess,
  signUpPartnerFailure,
  logoutPartner,
  updatePartnerAddress,
  deletePartnerAddress,
  updatePartnerPhoneNumber,
  updatePartnerFirstName,
  updatePartnerLastName,
  updatePhoneNumber,
  updateName

} = partnerSlice.actions;

export default partnerSlice.reducer;
