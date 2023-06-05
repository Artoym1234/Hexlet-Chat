import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchInitialData from './fetchInitialData.js';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ currentChannelId: 1 });

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      channelsAdapter.addOne(state, payload);
    },
    addChannels: (state, { payload }) => {
      channelsAdapter.addMany(state, payload);
    },
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
      if (state.currentChannelId === payload) {
        state.currentChannelId = 1;
      }
      channelsAdapter.removeOne(state, payload);
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    renameChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.fulfilled, (state, { payload }) => {
        channelsAdapter.setAll(state, payload.channels);
        // state.currentChannelId = payload.currentChannelId;
      });
  },
});

export const selectors = channelsAdapter.getSelectors(
  (state) => state.channels,
);
export const { actions } = channelSlice;
export default channelSlice.reducer;
