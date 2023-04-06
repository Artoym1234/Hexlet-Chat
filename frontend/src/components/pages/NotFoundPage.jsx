import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const mainPage = 'на главную страницу';
  return (
    <div className="text-center">
      <h1 className="h4 text-muted">404 - Not Found!</h1>
      <p className="text-muted">
        Go Home
        <Link to="/">{mainPage}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
