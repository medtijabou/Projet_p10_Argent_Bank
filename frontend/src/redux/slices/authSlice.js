// redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,   // { firstName: "...", ... } ou { userName: "..." }
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    updateUserName(state, action) {
      if (state.user) {
        state.user.userName = action.payload;
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout, updateUserName } = authSlice.actions;
export default authSlice.reducer;
