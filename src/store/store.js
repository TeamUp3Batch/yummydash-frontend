// CreateStore is the main method to create redux store
// CombineReducers allows the user to combbine multiple reducers together
import {combineReducers,configureStore} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "../slices/authSlice";

const rootReducer = combineReducers({ auth: authReducer });

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