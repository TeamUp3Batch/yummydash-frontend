import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        loading:false,
        loggedIn: false,
        loggedInUser: null,
        token: null,
    }
});
 

export default authSlice.reducer;