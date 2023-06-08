import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { pageRoutes } from '../../routes.js';
import { useAuth } from '../contexts/AuthProvider.jsx';

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  if (auth.loggedIn) {
    return (
      <Button variant="primary" onClick={() => auth.logOut()}>
        {t('header.button_exit')}
      </Button>
    );
  }
  return null;
};

const Header = () => {
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm bg-white" expand="lg" variant="light">
      <Container className="d-flex p-2">
        <Navbar.Brand>
          <a href={pageRoutes.mainPage()} className="link-dark text-decoration-none">
            {t('header.title')}
          </a>
        </Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
  );
};

export default Header;
