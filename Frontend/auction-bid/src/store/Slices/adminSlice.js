import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import api from '../../api/axios.js';
import { getAllItem } from './auctionSlice.js';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    loading: false,
    monthlyRevenue: [],
    totalAuctioneers: [],
    totalBidders: [],
    paymentProofs: [],
    singlePaymentProof: {},
  },
  reducers: {
    requestForMonthlyRevenue(state) {
      state.loading = true;
      state.monthlyRevenue = [];
    },
    successForMonthlyRevenue(state, action) {
      state.loading = false;
      state.monthlyRevenue = action.payload;
    },
    failedForMonthlyRevenue(state) {
      state.loading = false;
      state.monthlyRevenue = [];
    },
    requestForAllUsers(state) {
      state.loading = true;
      state.totalAuctioneers = [];
      state.totalBidders = [];
    },
    successForAllUsers(state, action) {
      state.loading = false;
      state.totalAuctioneers = action.payload.auctioneersArray;
      state.totalBidders = action.payload.biddersArray;
    },
    failureForAllUsers(state) {
      state.loading = false;
      state.totalAuctioneers = [];
      state.totalBidders = [];
    },
    requestForPaymentProofs(state) {
      state.loading = true;
      state.paymentProofs = [];
    },
    successForPaymentProofs(state, action) {
      state.loading = false;
      state.paymentProofs = action.payload;
    },
    failureForPaymentProofs(state) {
      state.loading = false;
      state.paymentProofs = [];
    },
    requestForDeletePaymentProof(state) {
      state.loading = true;
    },
    successForDeletePaymentProof(state) {
      state.loading = false;
    },
    failureForDeletePaymentProof(state) {
      state.loading = false;
    },
    requestForSinglePaymentProofDetail(state) {
      state.loading = true;
      state.singlePaymentProof = {};
    },
    successForSinglePaymentProofDetail(state, action) {
      state.loading = false;
      state.singlePaymentProof = action.payload;
    },
    failureForSinglePaymentProofDetail(state) {
      state.loading = false;
      state.singlePaymentProof = {};
    },
    requestForUpdatePaymentProof(state) {
      state.loading = true;
    },
    successForUpdatePaymentProof(state) {
      state.loading = false;
    },
    failureForUpdatePaymentProof(state) {
      state.loading = false;
    },
    requestForAuctionItemDelete(state) {
      state.loading = true;
    },
    successForAuctionItemDelete(state) {
      state.loading = false;
    },
    failureForAuctionItemDelete(state) {
      state.loading = false;
    },
    clearAllErrors(state) {
      state.loading = false;
      state.singlePaymentProof = {};
    },
  },
});

export const getMonthlyRevenue = () => async (dispatch) => {
  dispatch(adminSlice.actions.requestForMonthlyRevenue());
  try {
    const response = await api.get('/admin/monthly_revenue');
    dispatch(
      adminSlice.actions.successForMonthlyRevenue(
        response.data.totalMonthlyRevenue
      )
    );
  } catch (error) {
    dispatch(adminSlice.actions.failedForMonthlyRevenue());

    toast.error(error.response.data.message);
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch(adminSlice.actions.requestForAllUsers());
  try {
    const response = await api.get('/admin/users/getall');
    dispatch(adminSlice.actions.successForAllUsers(response.data));
  } catch (error) {
    dispatch(adminSlice.actions.failureForAllUsers());

    toast.error(error.response.data.message);
  }
};

export const getAllPaymentProofs = () => async (dispatch) => {
  dispatch(adminSlice.actions.requestForPaymentProofs());
  try {
    const response = await api.get('/admin/payment_proofs/getall');
    dispatch(
      adminSlice.actions.successForPaymentProofs(response.data.paymentProof)
    );
  } catch (error) {
    dispatch(adminSlice.actions.failureForPaymentProofs());

    toast.error(error.response.data.message);
  }
};

export const deletePaymentProof = (id) => async (dispatch) => {
  dispatch(adminSlice.actions.requestForDeletePaymentProof());
  try {
    const response = await api.delete(`/admin/payment_proof/delete/${id}`);
    dispatch(adminSlice.actions.successForDeletePaymentProof());
    dispatch(getAllPaymentProofs());
    toast.success(response.data.message);
  } catch (error) {
    dispatch(adminSlice.actions.failureForDeletePaymentProof());

    toast.error(error.response.data.message);
  }
};

export const getSinglePaymentProofDetail = (id) => async (dispatch) => {
  dispatch(adminSlice.actions.requestForSinglePaymentProofDetail());
  try {
    const response = await api.get(`/admin/payment_proof/${id}`);
    dispatch(
      adminSlice.actions.successForSinglePaymentProofDetail(
        response.data.paymentDetails
      )
    );
  } catch (error) {
    dispatch(adminSlice.actions.failureForSinglePaymentProofDetail());

    toast.error(error.response.data.message);
  }
};

export const updatePaymentProof = (id, status, amount) => async (dispatch) => {
  dispatch(adminSlice.actions.requestForUpdatePaymentProof());
  try {
    const response = await api.put(`/admin/payment_proof/status/update/${id}`, {
      status,
      amount,
    });
    dispatch(adminSlice.actions.successForUpdatePaymentProof());
    toast.success(response.data.message);
    dispatch(getAllPaymentProofs());
    dispatch(adminSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(adminSlice.actions.failureForUpdatePaymentProof());

    toast.error(error.response.data.message);
  }
};

export const deleteAuctionItem = (id) => async (dispatch) => {
  dispatch(adminSlice.actions.requestForAuctionItemDelete());
  try {
    const response = await api.delete(`/admin/auction_item/delete/${id}`);
    dispatch(adminSlice.actions.successForAuctionItemDelete());
    toast.success(response.data.message);
    dispatch(getAllItem());
  } catch (error) {
    dispatch(adminSlice.actions.failureForAuctionItemDelete());

    toast.error(error.response.data.message);
  }
};

export const clearAllAdminErrors = () => (dispatch) => {
  dispatch(adminSlice.actions.clearAllErrors());
};

export default adminSlice.reducer;
