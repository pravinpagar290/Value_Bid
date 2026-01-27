/* eslint-disable no-self-assign */
import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';

const auctionSlice = createSlice({
  name: 'auction',
  initialState: {
    loading: false,
    itemDetail: {},
    auctionDetail: {},
    auctionBidders: {},
    myAuctions: [],
    myWonAuctions: [],
    allAuctions: [],
    paymentProof: null,
  },
  reducers: {
    createAuctionRequest(state) {
      state.loading = true;
    },
    createAuctionSuccess(state) {
      state.loading = false;
    },
    createAuctionFailed(state) {
      state.loading = false;
    },
    getAllItemRequest(state) {
      state.loading = true;
    },
    getAllItemSuccess(state, action) {
      state.loading = false;
      state.allAuctions = action.payload || [];
    },
    getAllItemFailed(state) {
      state.loading = false;
    },
    getAuctionDetailRequest(state) {
      state.loading = true;
    },
    getAuctionDetailSuccess(state, action) {
      state.loading = false;
      state.auctionDetail = action.payload.auctionItem;
      state.auctionBidders = action.payload.bidders;
    },
    getAuctionDetailFailed(state) {
      state.loading = false;
      state.auctionDetail = state.auctionDetail;
      state.auctionBidders = state.auctionBidders;
    },
    getMyAuctionsRequest(state) {
      state.loading = true;
    },
    getMyAuctionsSuccess(state, action) {
      state.loading = false;
      state.myAuctions = action.payload;
    },
    getMyAuctionsFailed(state) {
      state.loading = false;
    },
    republishAuctionRequest(state) {
      state.loading = true;
    },
    republishAuctionSuccess(state) {
      state.loading = false;
    },
    republishAuctionFailed(state) {
      state.loading = false;
    },
    deleteAuctionRequest(state) {
      state.loading = true;
    },
    deleteAuctionSuccess(state) {
      state.loading = false;
    },
    deleteAuctionFailed(state) {
      state.loading = false;
    },
    getWonAuctionsRequest(state) {
      state.loading = true;
    },
    getWonAuctionsSuccess(state, action) {
      state.loading = false;
      state.myWonAuctions = action.payload;
    },
    getWonAuctionsFailed(state) {
      state.loading = false;
      state.myWonAuctions = [];
    },
    getPaymentProofRequest(state) {
      state.loading = true;
    },
    getPaymentProofSuccess(state, action) {
      state.loading = false;
      state.paymentProof = action.payload;
    },
    getPaymentProofFailed(state) {
      state.loading = false;
      state.paymentProof = null;
    },
  },
});

export const getAllItem =
  (filters = {}) =>
  async (dispatch) => {
    dispatch(auctionSlice.actions.getAllItemRequest());
    try {
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.condition) queryParams.append('condition', filters.condition);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);

      const queryString = queryParams.toString();
      const url = `/auctions/items${queryString ? `?${queryString}` : ''}`;

      const response = await api.get(url, {
        withCredentials: true,
      });
      dispatch(auctionSlice.actions.getAllItemSuccess(response.data.items));
    } catch {
      dispatch(auctionSlice.actions.getAllItemFailed());
    }
  };

export const getMyAuctionItem = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.getMyAuctionsRequest());
  try {
    const response = await api.get(`/auctions/item/${id}`, {
      withCredentials: true,
    });
    dispatch(auctionSlice.actions.getMyAuctionsSuccess(response.data.items));
  } catch {
    dispatch(auctionSlice.actions.getMyAuctionsFailed());
  }
};

export const createAuction = (data, navigate) => async (dispatch) => {
  dispatch(auctionSlice.actions.createAuctionRequest());
  try {
    const response = await api.post('/auctions/create-item', data, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch(
      auctionSlice.actions.createAuctionSuccess(response.data.auctionItem)
    );
    toast.success('Auction created successfully!');
    if (navigate) navigate('/my-auctions');
  } catch {
    dispatch(auctionSlice.actions.createAuctionFailed());
  }
};

export const getAuctionDetail = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.getAuctionDetailRequest());
  try {
    const response = await api.get(`/auctions/get-detail/${id}`);
    dispatch(auctionSlice.actions.getAuctionDetailSuccess(response.data));
  } catch {
    dispatch(auctionSlice.actions.getAuctionDetailFailed());
  }
};

export const deleteAuction = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.deleteAuctionRequest());
  try {
    const response = await api.delete(`/auctions/delete-item/${id}`, {
      withCredentials: true,
    });
    dispatch(
      auctionSlice.actions.deleteAuctionSuccess(response.data.auctionItem)
    );
  } catch {
    dispatch(auctionSlice.actions.deleteAuctionFailed());
  }
};

export const republishAuction = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.republishAuctionRequest());
  try {
    const response = await api.put(
      `/auctions/republish-item/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(
      auctionSlice.actions.republishAuctionSuccess(response.data.auctionItem)
    );
  } catch {
    dispatch(auctionSlice.actions.republishAuctionFailed());
  }
};

export const getWonAuctions = () => async (dispatch) => {
  dispatch(auctionSlice.actions.getWonAuctionsRequest());
  try {
    const response = await api.get('/auctions/won', {
      withCredentials: true,
    });
    dispatch(
      auctionSlice.actions.getWonAuctionsSuccess(response.data.auctions)
    );
  } catch {
    dispatch(auctionSlice.actions.getWonAuctionsFailed());
  }
};

export const getPaymentProof = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.getPaymentProofRequest());
  try {
    const response = await api.get(`/auctions/get-payment-proof/${id}`);
    dispatch(
      auctionSlice.actions.getPaymentProofSuccess(response.data.paymentProof)
    );
  } catch {
    dispatch(auctionSlice.actions.getPaymentProofFailed());
  }
};

export default auctionSlice.reducer;
