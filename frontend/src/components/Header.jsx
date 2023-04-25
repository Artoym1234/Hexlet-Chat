import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import useAuth from '../hooks/index.jsx';

const Header = () => {
  const auth = useAuth();
  const name = 'Hexlet Chat';
  const exit = 'Выход';
  return (
    <Navbar className="shadow-sm bg-white" expand="lg" variant="light">
      <Container className="d-flex p-2">
        <Navbar.Brand>
          <a href="/" className="link-dark text-decoration-none">
            {name}
          </a>
        </Navbar.Brand>
        {auth.loggedIn && (
          <Button variant="primary" onClick={() => auth.logOut()}>
            {exit}
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
