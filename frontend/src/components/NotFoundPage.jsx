import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center bg-light flex-grow-1">
      <h1 className="h4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">
        {t('notFound.feedback')}
        <Link to={routes.loginPage()}>{t('notFound.link')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
