import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        isAuthennticated : false,
        token :"",
        error : null,
    },
    reducers:{
        loginSuccess: (state, action) =>{
            state.isAuthennticated = true;
            state.token = action.payload.token;
            state.error = null;
        },
        loginFail: (state, action) =>{
            state.isAuthennticated =true;
            state.token =null;
            state.error = action.payload;
        },
        logout: (state) =>{
            state.isAuthennticated =false;
            state.token = null;
            state.error = null;
        },
    },
})
export const { loginSuccess, loginFail, logout} =authSlice.actions;

export default authSlice.reducer;