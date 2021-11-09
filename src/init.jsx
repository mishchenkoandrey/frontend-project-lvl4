import React from 'react';
import { Provider } from 'react-redux';

import createStore from './store.js';
import { addNewMessage } from './slices/messagesSlice.js';
import SocketProvider from './components/SocketProvider.jsx';
import App from './components/App.jsx';
import AuthProvider from './components/AuthProvider.jsx';

export default async (socket) => {
  const store = createStore();
  socket.on('newMessage', (message) => {
    store.dispatch(addNewMessage({ message }));
  });

  return (
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SocketProvider>
    </Provider>
  );
};
