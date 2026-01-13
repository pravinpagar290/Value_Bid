/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import api from '../../api/axios';

const commissionSlice = createSlice({
  name: 'commission',
  initialState: {
    loading: false,
  },
  reducers: {
    postCommissionProofRequest(state, action) {
      state.loading = true;
    },
    postCommissionProofSuccess(state, action) {
      state.loading = false;
    },
    postCommissionProofFailed(state, action) {
      state.loading = false;
    },
  },
});

export const postCommissionProof = (data) => async (dispatch) => {
  dispatch(commissionSlice.actions.postCommissionProofRequest());
  try {
    const response = await api.post('/commission/proof', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch(commissionSlice.actions.postCommissionProofSuccess());
    toast.success(response.data.message);
  } catch (error) {
    dispatch(commissionSlice.actions.postCommissionProofFailed());
    toast.error(error.response.data.message);
  }
};

export default commissionSlice.reducer;
