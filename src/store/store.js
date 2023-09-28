// CreateStore is the main method to create redux store
// CombineReducers allows the user to combbine multiple reducers together
import {configureStore} from '@reduxjs/toolkit'
import authReducer from "../slices/authSlice";

// Creating store
let store = configureStore({
   reducer:{auth: authReducer,},
   middleware:(getDefaultMiddleware) => getDefaultMiddleware(),
   devTools:true
}) 

// Exporting store
export default store