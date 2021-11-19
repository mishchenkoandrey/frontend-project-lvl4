// @ts-check

import React from 'react';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';

import createStore from './store.js';
import { addNewMessage } from './slices/messagesSlice.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from './slices/channelsSlice.js';
import SocketProvider from './components/SocketProvider.jsx';
import App from './components/App.jsx';
import AuthProvider from './components/AuthProvider.jsx';
import ru from './locales/ru.js';

export default async (socket) => {
  const store = createStore();
  const i18nextInstance = i18n.createInstance();
  await i18nextInstance.init({
    lng: 'ru',
    resources: {
      ru,
    },
  });

  socket.on('newMessage', (message) => {
    store.dispatch(addNewMessage({ message }));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel({ channel }));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel({ id }));
  });

  socket.on('renameChannel', (channel) => {
    store.dispatch(renameChannel({ channel }));
  });
  return (
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <I18nextProvider i18n={i18nextInstance}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </I18nextProvider>
      </SocketProvider>
    </Provider>
  );
};
