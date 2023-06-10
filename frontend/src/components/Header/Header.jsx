import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../routes.js';
import { useAuth } from '../contexts/AuthProvider.jsx';

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  /* if (auth.user) {
    return (
      <Button variant="primary" onClick={auth.logOut}>
        {t('header.button_exit')}
      </Button>
    );
  }
  return null; */
  return (
    auth.user
      ? <Button onClick={auth.logOut} variant="primary">{t('header.button_exit')}</Button>
      : null
  );
};

const Header = () => {
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm bg-white" expand="lg" variant="light">
      <Container className="d-flex p-2">
        <Navbar.Brand as={Link} to={pageRoutes.mainPage()}>{t('header.title')}</Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
  );
};

export default Header;
