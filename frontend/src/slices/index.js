import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messageReducer from './messagesSlice';
import loadingStateReducer from './loadingSlice';

export default configureStore({
  reducer: {
    loadingState: loadingStateReducer,
    channels: channelsReducer,
    messages: messageReducer,
  },
});
