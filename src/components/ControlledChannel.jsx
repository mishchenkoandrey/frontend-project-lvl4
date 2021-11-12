// @ts-check

import React from 'react';
import {
  Nav, Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';

const ControlledChannel = ({
  name,
  btnVariant,
  removeChannel,
  renameChannel,
  handleActiveChannel,
}) => (
  <Nav.Item className="w-100" as="li">
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button
        onClick={handleActiveChannel}
        variant={btnVariant}
        className="w-100 rounded-0 text-start text-truncate"
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

export default ControlledChannel;
