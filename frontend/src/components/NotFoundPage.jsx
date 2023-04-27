import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../routes.js';

const NotFoundPage = () => {
  const mainPage = 'на главную страницу';
  return (
    <div className="text-center bg-light flex-grow-1">
      <h1 className="h4 text-muted">404 - Not Found!</h1>
      <p className="text-muted">
        Go Home
        <Link to={routes.loginPage()}>{mainPage}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
