import {
  Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import i18next from 'i18next';
import React, { useEffect } from 'react';
import Rollbar from 'rollbar';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { initReactI18next } from 'react-i18next';
import Signup from './Signup/Signup.jsx';
import NotFoundPage from './NotFoundPage/NotFoundPage.jsx';
import MainPage from './MainPage/MainPage.jsx';
import LoginPage from './LoginPage/LoginPage.jsx';
import Header from './Header/Header.jsx';
import useAuth from './commonComponents/hooks/index.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import SocketProvider from './contexts/SocketProvider.jsx';
import { pageRoutes } from '../routes.js';
import ru from '../locales/ru.js';

const PrivateRoute = () => {
  const auth = useAuth();
  return auth.loggedIn ? <Outlet /> : <Navigate to={pageRoutes.loginPage()} />;
};
const rollbarConfig = {
  accessToken: 'process.env.REACT_APP_ROLLBAR_TOKEN',
  // accessToken: '0b68d0c41ccb45fe997c9879e21fa3d7',
  environment: 'production',
};

const rollbar = new Rollbar(rollbarConfig);

const App = ({ socket }) => {
  i18next
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: true,
      resources: {
        ru,
      },
    });

  useEffect(() => {
    socket.on('connect_error', (e) => {
      rollbar.error(e);
    });
  }, [socket]);
    <Route path={pageRoutes.notFoundPage()} element={<NotFoundPage />} />;
    return (
      <Provider config={rollbarConfig}>
        <ErrorBoundary>
          <AuthProvider>
            <Header />
            <SocketProvider socket={socket}>
              <Routes>
                <Route path={pageRoutes.loginPage()} element={<LoginPage />} />
                <Route path={pageRoutes.signUpPage()} element={<Signup />} />
                <Route element={<PrivateRoute />}>
                  <Route path={pageRoutes.mainPage()} element={(<MainPage />)} />
                </Route>
              </Routes>
            </SocketProvider>
          </AuthProvider>
        </ErrorBoundary>
      </Provider>

    );
};

export default App;
