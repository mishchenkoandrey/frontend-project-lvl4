// @ts-check

import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsSlice.js';
import messagesReducer from './slices/messagesSlice.js';

export default () => {
  const store = configureStore({
    reducer: {
      channelsInfo: channelsReducer.reducer,
      messages: messagesReducer.reducer,
    },
  });
  return store;
};
