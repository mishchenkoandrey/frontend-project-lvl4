// @ts-check

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Nav, Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { setCurrentChannelId } from '../slices/channelsSlice.js';

const DefaultChannel = ({ name, btnVariant, handleActiveChannel }) => (
  <Nav.Item className="w-100" as="li">
    <Button
      variant={btnVariant}
      onClick={handleActiveChannel}
      className="w-100 rounded-0 text-start"
    >
      <span className="me-1">#</span>
      {name}
    </Button>
  </Nav.Item>
);

const ControlledChannel = ({
  name,
  btnVariant,
  removeChannel,
  renameChannel,
  handleActiveChannel,
}) => (
  <Nav.Item className="w-100" as="li">
    <Dropdown as={ButtonGroup} className="d-flex mb-2">
      <Button
        onClick={handleActiveChannel}
        variant={btnVariant}
        className="flex-grow-1 w-100 rounded-0 text-start"
      >
        <span className="me-1">#</span>
        {name}
      </Button>
      <Dropdown.Toggle split variant={btnVariant} className="flex-grow-0" />
      <Dropdown.Menu>
        <Dropdown.Item onClick={removeChannel}>remove</Dropdown.Item>
        <Dropdown.Item onClick={renameChannel}>rename</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Nav.Item>
);

const Channels = () => {
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const dispatch = useDispatch();

  const handleActiveChannel = (channelId) => () => dispatch(setCurrentChannelId({ channelId }));

  return (
    <>
      <Nav className="flex-column nav-pills nav-fill px-2" as="ul">
        {channels.map(({ id, name, removable }) => {
          const btnVariant = id === currentChannelId && 'secondary';
          return removable ? (
            <ControlledChannel
              key={id}
              name={name}
              btnVariant={btnVariant}
              removeChannel={removeChannel(id)}
              renameChannel={renameChannel(id)}
              handleActiveChannel={handleActiveChannel(id)}
            />
          ) : (
            <DefaultChannel
              key={id}
              name={name}
              btnVariant={btnVariant}
              handleActiveChannel={handleActiveChannel(id)}
            />
          );
        })}
      </Nav>
    </>
  );
};

export default Channels;
