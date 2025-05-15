import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    firstName: "",
    lastName: "",
    userName: "",
  },
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = {
        firstName: action.payload.user.firstName || "",
        lastName: action.payload.user.lastName || "",
        userName: action.payload.user.userName || "",
      };
      state.token = action.payload.token;
    },
    updateUser(state, action) {
      if (state.user) {
        state.user.firstName = action.payload.firstName || state.user.firstName;
        state.user.lastName = action.payload.lastName || state.user.lastName;
        state.user.userName = action.payload.userName || state.user.userName;
      }
    },
    
    logout(state) {
      state.user = { firstName: "", lastName: "", userName: "" };
      state.token = null;
    },
  },
});

export const { loginSuccess, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
