import { Routes, Route, Navigate } from 'react-router-dom';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import NotFoundPage from './NotFoundPage.jsx';
import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage.jsx';
import Signup from './Signup.jsx';
import Header from './Header.jsx';
import useAuth from '../hooks/index.jsx';
import AuthProvider from '../contexts/AuthProvider.jsx';
import SocketProvider from '../contexts/SocketProvider.jsx';
import routes from '../routes.js';
import ru from '../locales/ru';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.loggedIn ? children : <Navigate to={routes.loginPage()} />;
};

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

  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
        <Route path={routes.loginPage()} element={<LoginPage />} />
        <Route path={routes.signUpPage()} element={<Signup />} />
        <Route
          path={routes.mainPage()}
          element={
            <PrivateRoute>
              <SocketProvider socket={socket}>
                <MainPage />
              </SocketProvider>
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
