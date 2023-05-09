import { Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from './NotFoundPage.jsx';
import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage.jsx';
import Signup from './Signup.jsx';
import Header from './Header.jsx';
import useAuth from '../hooks/index.jsx';
import AuthProvider from '../contexts/AuthProvider.jsx';
import SocketProvider from '../contexts/SocketProvider.jsx';
import routes from '../routes.js';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.loggedIn ? children : <Navigate to={routes.loginPage()} />;
};

const App = ({ socket }) => (
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
export default App;
