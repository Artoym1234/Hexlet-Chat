import { createSlice } from '@reduxjs/toolkit';
import fetchInitialData from './fetchInitialData.js';

export const stateLoad = {
  authError: 'authError',
  networkError: 'networkError',
  idle: 'idle',
  load: 'load',
  success: 'success',
};

const initialState = {
  status: stateLoad.idle,
};

const loadingStateSlice = createSlice({
  name: 'loadingState',
  initialState,
  reducers: {
    unload: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.pending, () => stateLoad.load)
      .addCase(fetchInitialData.fulfilled, () => stateLoad.success)
      .addCase(fetchInitialData.rejected, (state, action) => {
        const error = action.payload;
        if (error.response && error.response.status === 401) {
          return stateLoad.authError;
        }
        return stateLoad.networkError;
      });
  },
});

export const { actions } = loadingStateSlice;

export const selectors = {
  getStatus: (state) => state.loadingState,
};

export default loadingStateSlice.reducer;
