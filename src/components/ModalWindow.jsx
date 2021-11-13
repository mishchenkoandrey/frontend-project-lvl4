// @ts-check

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import { closeModalWindow } from '../slices/modalWindowSlice.js';
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

const RemovingPanel = ({ closeModal }) => {
  const socket = useSocket();
  const channelId = useSelector((state) => state.modalWindowInfo.channelId);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannel = channels.find(({ id }) => id === channelId);

  const removeChannel = (channel) => ({ setErrors }) => {
    try {
      socket.removeChannel(channel);
      closeModal();
    } catch (error) {
      setErrors({ name: error.message });
    }
  };

  return (
    <>
      <p className="lead">areYouSure</p>
      <div className="d-flex justify-content-end">
        <Button onClick={closeModal} variant="secondary" className="me-2">
          cancel
        </Button>
        <Button onClick={removeChannel(currentChannel)} variant="danger">
          remove
        </Button>
      </div>
    </>
  );
};

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
    <PanelForm
      initialName={initialName}
      handleSubmit={addChannel}
      closeModal={closeModal}
    />
  );
};

const ControlPanels = {
  addChannel: AddingPanel,
  removeChannel: RemovingPanel,
  renameChannel: RenamingPanel,
};

const ModalWindow = () => {
  const { isVisible, name } = useSelector((state) => state.modalWindowInfo);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeModalWindow());
  };

  const ControlPanel = ControlPanels[name];

  return (
    <Modal show={isVisible} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ControlPanel
          && <ControlPanel closeModal={closeModal} />}
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
