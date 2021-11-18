// @ts-check

import React from 'react';
import useSocket from '../hooks/useSocket.js';

import ChannelForm from './ChannelForm.jsx';

const AddingPanel = ({ closeModal }) => {
  const socket = useSocket();
  const initialName = '';

  const addChannel = ({ name }, { setErrors }) => {
    const channel = { name };
    try {
      socket.addChannel(channel);
      closeModal();
    } catch (error) {
      setErrors({ name: error.message });
    }
  };

  return (
    <ChannelForm
      initialName={initialName}
      handleSubmit={addChannel}
      closeModal={closeModal}
    />
  );
};
export default AddingPanel;
