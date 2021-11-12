// @ts-check

import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Modal, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { closeModalWindow } from '../slices/modalWindowSlice.js';
import useSocket from '../hooks/useSocket.js';

const PanelForm = ({
  initialName,
  validationSchema,
  handleSubmit,
  closeModal,
}) => {
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: {
      name: initialName,
    },
    validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: false,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [formik.isSubmitting]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          value={formik.values.name}
          ref={inputRef}
          onFocus={(e) => e.currentTarget.select()}
          type="text"
          name="name"
          id="name"
          onChange={formik.handleChange}
          aria-label="add channel"
          className="mb-2 form-control"
          data-testid="add-channel"
          isInvalid={!formik.isValid}
          autoComplete="off"
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.name}
        </Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button
            disabled={formik.isSubmitting}
            onClick={closeModal}
            type="button"
            variant="secondary"
            className="me-2"
          >
            cancel
          </Button>
          <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
            send
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

const RenamingPanel = ({ closeModal }) => {
  const socket = useSocket();
  const channelId = useSelector((state) => state.modalWindowInfo.channelId);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannel = channels.find(({ id }) => id === channelId);
  const initialName = currentChannel.name;
  const validationSchema = yup.object().shape({
    name: yup.string().required().min(3).max(20),
  });

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
      validationSchema={validationSchema}
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
  const channels = useSelector((state) => state.channelsInfo.channels);
  const channelsNames = channels.map(({ name }) => name);
  const validationSchema = yup.object().shape({
    name: yup.string().required().notOneOf(channelsNames).min(3)
      .max(20),
  });

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
      validationSchema={validationSchema}
      handleSubmit={addChannel}
      closeModal={closeModal}
    />
  );
};

const controllPanels = {
  adding: AddingPanel,
  removing: RemovingPanel,
  renaming: RenamingPanel,
};

const ModalWindow = () => {
  const isVisible = useSelector((state) => state.modalWindowInfo.isVisible);
  const type = useSelector((state) => state.modalWindowInfo.type);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeModalWindow());
  };

  const modalTitleKeysMap = {
    adding: 'addChannel',
    renaming: 'renameChannel',
    removing: 'removeChannel',
  };

  const ControllPanel = controllPanels[type];

  return (
    <Modal show={isVisible} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitleKeysMap[type]}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ControllPanel
          && <ControllPanel closeModal={closeModal} />}
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
