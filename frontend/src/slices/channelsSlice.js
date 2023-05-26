import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ currentChannelId: 1 });

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    //  addChannel: channelsAdapter.addOne,
    addChannel: (state, { payload }) => {
      channelsAdapter.addOne(state, payload);
      // const { channels } = payload;

      // eslint-disable-next-line no-param-reassign
      // state.currentChannelId = channels;
    },
    addChannels: channelsAdapter.addMany,
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
      if (state.currentChannelId === payload) {
        // eslint-disable-next-line no-param-reassign
        state.currentChannelId = 1;
      }
    },
    setCurrentChannelId: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = payload;
    },
    renameChannel: channelsAdapter.updateOne,
  },
});

export const selectors = channelsAdapter.getSelectors(
  (state) => state.channels,
);
export const { actions } = channelSlice;
export default channelSlice.reducer;
