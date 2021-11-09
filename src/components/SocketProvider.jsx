// @ts-check

import React from 'react';
import _ from 'lodash';

import socketContext from '../context/socketContext.js';

const socketWrapper = (socket, action, data) => {
  if (socket.disconnected) {
    throw new Error('networkError');
  }
  socket.emit(action, data, _.noop);
};

const SocketProvider = ({ socket, children }) => {
  const sendMessage = (message) => {
    socketWrapper(socket, 'newMessage', message);
  };

  const addChannel = (channel) => {
    socketWrapper(socket, 'newChannel', channel);
  };

  const removeChannel = (channel) => {
    socketWrapper(socket, 'removeChannel', channel);
  };

  const renameChannel = (channel) => {
    socketWrapper(socket, 'renameChannel', channel);
  };

  return (
    <socketContext.Provider value={{
      sendMessage, addChannel, removeChannel, renameChannel,
    }}
    >
      {children}
    </socketContext.Provider>
  );
};

export default SocketProvider;
