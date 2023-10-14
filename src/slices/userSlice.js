// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const { loggedInUser } = useSelector((state) => state.auth);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: loggedInUser,
  },
  reducers: {
    addAddress: (state, action) => {
      state.user.address = action.payload;
    },
    deleteAddress: (state, action) => {
      state.user.address = action.payload;
    },
    updateUserFirstName: (state, action) => {
      state.user.firstName = action.payload;
    },
    updateUserLastName: (state, action) => {
      state.user.lastName = action.payload;
    },
    updateUserPhoneNumber: (state, action) => {
      state.user.phoneNumber = action.payload;
    },
  },
});

export const {
  addAddress,
  deleteAddress,
  updatePhoneNumber,
  updateFirstName,
  updateLastName,
} = userSlice.actions;

export default userSlice.reducer;
