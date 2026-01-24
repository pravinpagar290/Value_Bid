import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios.js';
import { toast } from 'react-hot-toast';

export const bidSlice = createSlice({
  name: 'bid',
  initialState: {
    loading: false,
  },
  reducers: {
    bidRequest(state) {
      state.loading = true;
    },
    bidSuccess(state) {
      state.loading = false;
    },
    bidFail(state) {
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
    toast.success(response.data.message || 'Bid placed successfully!');
  } catch {
    dispatch(bidSlice.actions.bidFail());
  }
};

export default bidSlice.reducer;
