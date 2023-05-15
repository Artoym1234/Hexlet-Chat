import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';

const Header = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm bg-white" expand="lg" variant="light">
      <Container className="d-flex p-2">
        <Navbar.Brand>
          <a href="/" className="link-dark text-decoration-none">
            {t('header.title')}
          </a>
        </Navbar.Brand>
        {auth.loggedIn && (
          <Button variant="primary" onClick={() => auth.logOut()}>
            {t('header.button_exit')}
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
