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
    <header className="shadow-sm" expand="lg" bg="white">
      <Navbar>
        <Container>
          <Navbar.Brand as="a" href="/">
            Hexlet Chat
          </Navbar.Brand>
          {auth.isLoggedIn() && (
            <Button onClick={handleLogOut}>Выйти</Button>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
