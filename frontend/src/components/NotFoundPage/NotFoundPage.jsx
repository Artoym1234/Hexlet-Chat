import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { pageRoutes } from '../../routes.js';
import notFound from '../../images/notFound.jpg';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center bg-light flex-grow-1 p-5">
      <img
        alt={t('notFound.title')}
        className="img-fluid"
        src={notFound}
      />
      <h1 className="h4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">
        {t('notFound.feedback')}
        {' '}
        <Link to={pageRoutes.mainPage()}>{t('notFound.link')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
