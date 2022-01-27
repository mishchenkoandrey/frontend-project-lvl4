// @ts-check

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { closeModalWindow } from '../slices/modalWindowSlice.js';
import AddingChannelForm from './AddingChannelForm.jsx';
import RenamingChannelForm from './RenamingChannelForm.jsx';
import RemovingChannelPanel from './RemovingChannelPanel.jsx';

const ControlPanels = {
  addChannel: AddingChannelForm,
  renameChannel: RenamingChannelForm,
  removeChannel: RemovingChannelPanel,
};

const ModalWindow = () => {
  const { t } = useTranslation();
  const { isVisible, name } = useSelector((state) => state.modalWindowInfo);
  const dispatch = useDispatch();
  const sendMessageButton = document.querySelector('input[data-testid="new-message"] ~ button');

  const closeModal = () => {
    sendMessageButton.removeAttribute('aria-hidden');
    dispatch(closeModalWindow());
  };

  const ControlPanel = ControlPanels[name];

  return (
    <Modal show={isVisible} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t(name)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ControlPanel
          && <ControlPanel closeModal={closeModal} />}
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
