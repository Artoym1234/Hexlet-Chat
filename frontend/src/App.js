import { Routes, Route, Navigate } from 'react-router-dom';
import i18next from 'i18next';
import React, { useEffect } from 'react';
import Rollbar from 'rollbar';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { initReactI18next } from 'react-i18next';
import Signup from './pages/Signup.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import MainPage from './pages/MainPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Header from './pages/Header.jsx';
import useAuth from './hooks/index.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import SocketProvider from './contexts/SocketProvider.jsx';
import routes from './routes.js';
import ru from './locales/ru.js';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.loggedIn ? children : <Navigate to={routes.loginPage()} />;
};
const rollbarConfig = {
  accessToken: '0b68d0c41ccb45fe997c9879e21fa3d7',
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

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
            <Route path={routes.loginPage()} element={<LoginPage />} />
            <Route path={routes.signUpPage()} element={<Signup />} />
            <Route
              path={routes.mainPage()}
              element={(
                <PrivateRoute>
                  <SocketProvider socket={socket}>
                    <MainPage />
                  </SocketProvider>
                </PrivateRoute>
              )}
            />
          </Routes>
        </AuthProvider>
      </ErrorBoundary>
    </Provider>

  );
};

export default App;
