// @ts-check

import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useSocket from '../hooks/useSocket.js';

import ChannelForm from './ChannelForm.jsx';

const AddingPanel = ({ closeModal }) => {
  const socket = useSocket();
  const initialName = '';
  const { t } = useTranslation();
  const notify = (message) => toast(message);

  const addChannel = ({ name }, { setErrors }) => {
    const channel = { name };
    try {
      socket.addChannel(channel);
      closeModal();
      notify(t('channelCreated'));
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
