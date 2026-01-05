import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isAuthenticate: false,
    loading: false,
  },
  reducers: {
    registerRequest(state, action) {
      state.user = {};
      state.isAuthenticate = false;
      state.loading=true
    },
    registerSuccess(state, action) {
      state.isAuthenticate = true,
       state.user = action.payload.user;
    },
    registerFailed(state, action) {
      state.isAuthenticate = false;
      state.user = {};
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
    },
  },
});

export const register = (data) => async (dispatch) => {
  try {
    dispatch(userSlice.actions.registerRequest());
    const response = await axios.post(
      'http://localhost:5000/api/v1/user/register',
      data,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    dispatch(userSlice.actions.registerSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.registerFailed());

  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      'http://localhost:5000/api/v1/user/login',
      data,
      {
        withCredentials: true,
       headers: { 'Content-Type': 'application/json' },

      }
    );
    dispatch(userSlice.loginSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.loginFailed());
  }
};

export default userSlice.reducer;
