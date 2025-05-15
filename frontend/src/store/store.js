// src/redux/store.js ou src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice'; // Chemin vers ton slice

const store = configureStore({
  reducer: {
    auth: authReducer, // clé 'auth' pour accéder dans le state → state.auth
  },
});

export default store;
