import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../routes.js';

const MainPage = () => (
  <div className="text-center">
    <h1 className="h4 text-muted">{}</h1>
    <p className="text-muted">
      <Link to={routes.mainPage()}>{}</Link>
    </p>
  </div>
);

export default MainPage;
