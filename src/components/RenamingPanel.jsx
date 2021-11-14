// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';
import useSocket from '../hooks/useSocket.js';

import PanelForm from './PanelForm.jsx';

const RenamingPanel = ({ closeModal }) => {
  const socket = useSocket();
  const channelId = useSelector((state) => state.modalWindowInfo.channelId);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannel = channels.find(({ id }) => id === channelId);
  const initialName = currentChannel.name;

  const renameChannel = (channel) => ({ name }, { setErrors }) => {
    const changedСhannel = { ...channel, name };
    try {
      socket.renameChannel(changedСhannel);
      closeModal();
    } catch (error) {
      setErrors({ name: error.message });
    }
  };

  return (
    <PanelForm
      initialName={initialName}
      handleSubmit={renameChannel(currentChannel)}
      closeModal={closeModal}
    />
  );
};

export default RenamingPanel;
