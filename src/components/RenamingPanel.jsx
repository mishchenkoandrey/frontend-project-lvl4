// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useSocket from '../hooks/useSocket.js';

import ChannelForm from './ChannelForm.jsx';

const RenamingPanel = ({ closeModal }) => {
  const socket = useSocket();
  const channelId = useSelector((state) => state.modalWindowInfo.channelId);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannel = channels.find(({ id }) => id === channelId);
  const initialName = currentChannel.name;
  const { t } = useTranslation();
  const notify = (message) => toast(message);

  const renameChannel = (channel) => ({ name }, { setErrors }) => {
    const changedСhannel = { ...channel, name };
    try {
      socket.renameChannel(changedСhannel);
      closeModal();
      notify(t('channelRenamed'));
    } catch (error) {
      setErrors({ name: error.message });
    }
  };

  return (
    <ChannelForm
      initialName={initialName}
      handleSubmit={renameChannel(currentChannel)}
      closeModal={closeModal}
    />
  );
};

export default RenamingPanel;
