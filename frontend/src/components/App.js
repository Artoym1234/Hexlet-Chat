import {
  Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './Signup/Signup.jsx';
import NotFoundPage from './NotFoundPage/NotFoundPage.jsx';
import MainPage from './MainPage/MainPage.jsx';
import LoginPage from './LoginPage/LoginPage.jsx';
import Header from './Header/Header.jsx';
import AuthProvider, { useAuth } from './contexts/AuthProvider.jsx';
import SocketProvider from './contexts/SocketProvider.jsx';
import { pageRoutes } from '../routes.js';

const PrivateRoute = () => {
  const auth = useAuth();

  return auth.user ? <Outlet /> : <Navigate to={pageRoutes.loginPage()} />;
};
const PublicRoute = () => {
  const auth = useAuth();

  return auth.user ? <Navigate to={pageRoutes.mainPage()} /> : <Outlet />;
};

const App = ({ socket }) => (
  <>
    <AuthProvider>
      <Header />
      <SocketProvider socket={socket}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={pageRoutes.loginPage()} element={<LoginPage />} />
            <Route path={pageRoutes.signUpPage()} element={<Signup />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path={pageRoutes.mainPage()} element={(<MainPage />)} />
          </Route>
          <Route path={pageRoutes.notFoundPage()} element={<NotFoundPage />} />
        </Routes>
      </SocketProvider>
    </AuthProvider>
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </>
);

export default App;
