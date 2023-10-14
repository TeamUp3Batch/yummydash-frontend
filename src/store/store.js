// CreateStore is the main method to create redux store
import {combineReducers,configureStore} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import restaurantReducer from '../slices/restaurantSlice';
import menuReducer from '../slices/menuSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer, // Include the user reducer in the rootReducer
  restaurant: restaurantReducer,
  menu: menuReducer,
});

const persistConfig = {
   key: 'root',
   version: 1,
   storage,
 };
 
 const persistedReducer = persistReducer(persistConfig, rootReducer);

// Creating store

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware({
       serializableCheck: false,
     }),
 });
 
 export const persistor = persistStore(store);