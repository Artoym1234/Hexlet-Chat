import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import fetchInitialData from './fetchInitialData.js';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ currentChannelId: null });

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      channelsAdapter.addOne(state, payload);
      if (state.currentChannelId !== payload.id) {
        const newCurrentChannelId = state.ids[state.ids.length - 1];
        /* eslint-disable no-param-reassign */
        state.currentChannelId = newCurrentChannelId;
      }
    },
    addChannels: channelsAdapter.addMany,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
      if (state.currentChannelId === payload) {
        const newCurrentChannelId = state.ids[0];
        /* eslint-disable no-param-reassign */
        state.currentChannelId = newCurrentChannelId;
      }
      channelsAdapter.removeOne(state, payload);
    },
    setCurrentChannelId: (state, { payload }) => {
      /* eslint-disable no-param-reassign */
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.fulfilled, (state, { payload }) => {
        channelsAdapter.setAll(state, payload.channels);
        /* eslint-disable no-param-reassign */
        state.currentChannelId = payload.currentChannelId;
      });
  },
});

export const selectors = channelsAdapter.getSelectors(
  (state) => state.channels,
);

const selectChannels = selectors.selectAll;

const activeChannelId = (state) => {
  const { currentChannelId } = state.channels;
  return currentChannelId;
};
export const selectChannelNames = createSelector(
  selectChannels,
  activeChannelId,
  (channels) => channels.map((channel) => channel.name),
);
export const useCurrentChannel = createSelector(
  selectChannels,
  activeChannelId,
  (channels, currentChannelId) => channels.find((channel) => channel.id === currentChannelId),
);
export const { actions } = channelSlice;
export default channelSlice.reducer;
