import React from 'react';
import { Provider } from 'react-redux';

import createStore from './store.js';
import App from './components/App.jsx';
import ProvideAuth from './components/ProvideAuth.jsx';

export default async () => {
  const store = createStore();
  return (
    <Provider store={store}>
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </Provider>
  );
};
