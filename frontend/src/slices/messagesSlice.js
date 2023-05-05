import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as chanelsActions } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(chanelsActions.removeChannel, (state, action) => {
      const { chanelId } = action.payload;

      const allEntities = Object.values(state.entities);
      const restEntities = allEntities.filter((e) => e.channelId !== chanelId);
      messagesAdapter.setAll(state, restEntities);
    });
  },
});

export const selectors = messagesAdapter.getSelectors(
  (state) => state.messages,
);
export const { actions } = messagesSlice;
export default messagesSlice.reducer;
