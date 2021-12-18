// @ts-check

import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import useSocket from '../hooks/useSocket.js';

const RemovingPanel = ({ closeModal }) => {
  const { t } = useTranslation();
  const socket = useSocket();
  const channelId = useSelector((state) => state.modalWindowInfo.channelId);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannel = channels.find(({ id }) => id === channelId);
  const notify = (message) => toast(message);

  const removeChannel = (channel) => ({ setErrors }) => {
    try {
      socket.removeChannel(channel);
      closeModal();
      notify(t('channelRemoved'));
    } catch (error) {
      setErrors({ name: error.message });
    }
  };

  return (
    <>
      <p className="lead">{t('sure')}</p>
      <div className="d-flex justify-content-end">
        <Button onClick={closeModal} variant="secondary" className="me-2" type="button">{t('cancel')}</Button>
        <Button onClick={removeChannel(currentChannel)} variant="danger" type="button">{t('remove')}</Button>
      </div>
    </>
  );
};

export default RemovingPanel;
