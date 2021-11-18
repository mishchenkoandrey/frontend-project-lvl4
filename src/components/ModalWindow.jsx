// @ts-check

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { closeModalWindow } from '../slices/modalWindowSlice.js';
import AddingPanel from './AddingPanel.jsx';
import RenamingPanel from './RenamingPanel.jsx';
import RemovingPanel from './RemovingPanel.jsx';

const ControlPanels = {
  addChannel: AddingPanel,
  removeChannel: RemovingPanel,
  renameChannel: RenamingPanel,
};

const ModalWindow = () => {
  const { t } = useTranslation();
  const { isVisible, name } = useSelector((state) => state.modalWindowInfo);
  const dispatch = useDispatch();

  const closeModal = () => {
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
