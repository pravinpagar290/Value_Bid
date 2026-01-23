import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice.js';
import bidReducer from './Slices/bidSlice.js';
import adminReducer from './Slices/adminSlice.js';
import auctionReducer from './Slices/auctionSlice.js';
import commissionReducer from './Slices/commissionSlice.js';
import themeReducer from './Slices/themeSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
    bid: bidReducer,
    auction: auctionReducer,
    admin: adminReducer,
    commission: commissionReducer,
    theme:themeReducer
  },
});
