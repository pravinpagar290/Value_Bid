/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios';

const auctionSlice = createSlice({
  name: 'auction',
  initialState: {
    loading: false,
    itemDetail: {},
    auctionDetail: {},
    auctionBidders: {},
    myAuctions: [],
    allAuctions: [],
  },
  reducers: {
    createAuctionRequest(state, action) {
      state.loading = true;
    },
    createAuctionSuccess(state, action) {
      state.loading = false;
    },
    createAuctionFailed(state, action) {
      state.loading = false;
    },
    getAllItemRequest(state, action) {
      state.loading = true;
    },
    getAllItemSuccess(state, action) {
      state.loading = false;
      state.allAuctions = action.payload || [];
    },
    getAllItemFailed(state, action) {
      state.loading = false;
    },
    getAuctionDetailRequest(state, action) {
      state.loading = true;
    },
    getAuctionDetailSuccess(state, action) {
      state.loading = false;
      state.auctionDetail = action.payload.auctionItem;
      state.auctionBidders = action.payload.bidders;
    },
    getAuctionDetailFailed(state, action) {
      state.loading = false;
      state.auctionDetail = state.auctionDetail;
      state.auctionBidders = state.auctionBidders;
    },
    getMyAuctionsRequest(state, action) {
      state.loading = true;
    },
    getMyAuctionsSuccess(state, action) {
      state.loading = false;
      state.myAuctions = action.payload;
    },
    getMyAuctionsFailed(state, action) {
      state.loading = false;
    },
    republishAuctionRequest(state, action) {
      state.loading = true;
    },
    republishAuctionSuccess(state, action) {
      state.loading = false;
    },
    republishAuctionFailed(state, action) {
      state.loading = false;
    },
    deleteAuctionRequest(state, action) {
      state.loading = true;
    },
    deleteAuctionSuccess(state, action) {
      state.loading = false;
    },
    deleteAuctionFailed(state, action) {
      state.loading = false;
    },
  },
});

export const getAllItem = () => async (dispatch) => {
  dispatch(auctionSlice.actions.getAllItemRequest());
  try {
    const response = await api.get('/auctions/items', {
      withCredentials: true,
    });
    dispatch(auctionSlice.actions.getAllItemSuccess(response.data.items));
  } catch (error) {
    dispatch(auctionSlice.actions.getAllItemFailed());
  }
};

export const getMyAuctionItem = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.getMyAuctionsRequest());
  try {
    const response = api.get(`/auctions/item/${id}`);
    dispatch(auctionSlice.actions.getMyAuctionsSuccess(response.data.items));
  } catch (error) {
    dispatch(auctionSlice.actions.getMyAuctionsFailed());
  }
};

export const createAuction = (data) => async (dispatch) => {
  dispatch(auctionSlice.actions.createAuctionRequest());
  try {
    const response = await api.post('/auctions/create-item', data, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch(
      auctionSlice.actions.createAuctionSuccess(response.data.auctionItem)
    );
  } catch (error) {
    dispatch(auctionSlice.actions.createAuctionFailed());
  }
};

export const getAuctionDetail = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.getAuctionDetailRequest());
  try {
    const response = await api.get(`/auctions/get-detail/${id}`);
    dispatch(auctionSlice.actions.getAuctionDetailSuccess(response.data));
  } catch (error) {
    dispatch(auctionSlice.actions.getAuctionDetailFailed());
  }
};

export const deleteAuction = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.deleteAuctionRequest());
  try {
    const response = await api.delete(`/auctions/delete-item/${id}`);
    dispatch(
      auctionSlice.actions.deleteAuctionSuccess(response.data.auctionItem)
    );
  } catch (error) {
    dispatch(auctionSlice.actions.deleteAuctionFailed());
  }
};

export const republishAuction = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.republishAuctionRequest());
  try {
    const response = await api.put(`/auctions/republish-item/${id}`);
    dispatch(
      auctionSlice.actions.republishAuctionSuccess(response.data.auctionItem)
    );
  } catch (error) {
    dispatch(auctionSlice.actions.republishAuctionFailed());
  }
};

export default auctionSlice.reducer;
