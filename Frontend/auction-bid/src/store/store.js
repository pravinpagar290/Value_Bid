import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./Slices/userSlice.js"
import bidReducer from "./Slices/bidSlice.js"
export const store = configureStore({
    reducer:{
        user: userReducer,
        bid: bidReducer
    }
});
