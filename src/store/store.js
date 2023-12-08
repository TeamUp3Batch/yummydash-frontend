// CreateStore is the main method to create redux store
import {combineReducers,configureStore} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "../slices/authSlice";
import restaurantReducer from '../slices/restaurantSlice';
import menuReducer from '../slices/menuSlice';
import driverReducer from '../slices/driverSlice';
import partnerReducer from '../slices/partnerSlice';
import adminReducer from '../slices/adminSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  menu: menuReducer,
  driver: driverReducer,
  partner: partnerReducer,
  admin: adminReducer
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