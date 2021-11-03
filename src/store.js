// @ts-check

import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsSlice.js';

export default () => {
  const store = configureStore({
    reducer: {
      channelsInfo: channelsReducer,
    },
  });

  return store;
};
