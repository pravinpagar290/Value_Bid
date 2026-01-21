/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios.js';

export const bidSlice = createSlice({
  name: 'bid',
  initialState: {
    loading: false,
  },
  reducers: {
    bidRequest(state, action) {
      state.loading = true;
    },
    bidSuccess(state, action) {
      state.loading = false;
    },
    bidFail(state, action) {
      state.loading = false;
    },
  },
});

export const bid = (id, data) => async (dispatch) => {
  dispatch(bidSlice.actions.bidRequest());
  try {
    const response = await api.post(`/bids/place_bid/${id}`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(bidSlice.actions.bidSuccess());
  } catch (error) {
    dispatch(bidSlice.actions.bidFail());
  }
};

export default bidSlice.reducer;
