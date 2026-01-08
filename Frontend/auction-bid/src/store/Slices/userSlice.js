/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios.js';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isAuthenticate: false,
    loading: false,
    leaderBoard: [],
  },
  reducers: {
    registerRequest(state, action) {
      state.user = {};
      state.isAuthenticate = false;
      state.loading = true;
    },
    registerSuccess(state, action) {
      ((state.isAuthenticate = true), (state.user = action.payload.user));
      state.loading = false;
    },
    registerFailed(state, action) {
      state.isAuthenticate = false;
      state.user = {};
      state.loading = false;
    },
    loginRequest(state, action) {
      state.user = {};
      state.isAuthenticate = false;
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.isAuthenticate = true;
      state.loading = false;
    },
    loginFailed(state, action) {
      state.user = {};
      state.isAuthenticate = false;
      state.loading = false;
    },
    fetchUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticate = false;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticate = true;
      state.user = action.payload.user;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticate = false;
    },
    fetchLeaderBoardRequest(state, action) {
      state.loading = true;
    },
    fetchLeaderBoardSuccess(state, action) {
      state.loading = false;
      state.leaderBoard = action.payload.leaderBoard;
    },
    fetchLeaderBoardFailed(state, action) {
      state.loading = false;
    },  
  },
});

export const register = (data) => async (dispatch) => {
  try {
    dispatch(userSlice.actions.registerRequest());
    const response = await api.post('/user/register', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch(userSlice.actions.registerSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.registerFailed());
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await api.post('/user/login', data, {
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(userSlice.actions.loginSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.loginFailed());
  }
};

export const fetchUser = (data) => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await api.get('/user/me', {
      headers: {
        'content-type': 'application/json',
      },
    });
    dispatch(userSlice.actions.fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed());
  }
};

export const fetchLeaderBoard = (data) => async (dispatch) => {
  dispatch(userSlice.actions.fetchLeaderBoardRequest());
  try {
    const response = await api.get('/user/leaderboard', {
      headers: {
        'content-type': 'application/json',
      },
    });
    dispatch(userSlice.actions.fetchLeaderBoardSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.fetchLeaderBoardFailed());
  }
};

export default userSlice.reducer;
