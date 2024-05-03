import authReducer from "./AuthSlice";
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./ModalSlice"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        modal: modalReducer,
    },
    devTools:true
})