// @ts-check

import React from 'react';
import {
  Nav, Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';

const ControlledChannel = ({
  name,
  btnVariant,
  handleActiveChannel,
}) => (
  <Nav.Item className="w-100" as="li">
    <Dropdown as={ButtonGroup} className="d-flex mb-2">
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
        <Dropdown.Item>remove</Dropdown.Item>
        <Dropdown.Item>rename</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Nav.Item>
);

export default ControlledChannel;
