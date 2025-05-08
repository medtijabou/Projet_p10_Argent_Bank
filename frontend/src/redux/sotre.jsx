// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // adapte le chemin si besoin

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true,
});

export default store;
