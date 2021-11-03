// @ts-check

import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import useAuth from '../hooks/useAuth.js';

const Header = () => {
  const auth = useAuth();
  const handleLogOut = () => {
    auth.logOut();
  };
  return (
    <Navbar className="shadow-sm" expand="lg" bg="white">
      <Container>
        <Navbar.Brand as="a" href="/">
          Hexlet Chat
        </Navbar.Brand>
        {auth.isLoggedIn() && (
          <Button onClick={handleLogOut}>Выйти</Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
