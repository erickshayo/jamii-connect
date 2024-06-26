import { createSlice } from "@reduxjs/toolkit";


const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null

const user = localStorage.getItem('user')
  ? localStorage.getItem('user')
  : null

const currrentUsrRl = localStorage.getItem('ussrCrrl')?localStorage.getItem('ussrCrrl'):4

const authSlice = createSlice({
   name: "auth",
   initialState: { user:user , token: token, currrentUsrRl:currrentUsrRl},
   reducers: {
      loginAuth: (state, action) => {
         const { user, token, role } = action.payload
         state.user = user
         state.token = token
         state.currrentUsrRl =role
      },
      logOut: (state, action) => {
         state.user = null
         state.token = null
      }
   }
});


const authRegSlice = createSlice({
   name: "regAuth",
   initialState: { user: null, registered: false },
   reducers: {
      registerAuth: (state, action) => {
         state.user = action.payload
         state.registered = true
      }
   }
});


export const { logOut, loginAuth } = authSlice.actions;

export const { registerAuth } = authRegSlice.actions;

export default authSlice.reducer;

export const authRegReducer = authRegSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;

export const selectCurrentToken = (state) => state.auth.token;

export const selectUserCurretRole = (state) =>  state.auth.currrentUsrRl;