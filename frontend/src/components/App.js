import { Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from './NotFoundPage.jsx';
import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage.jsx';
import Header from './Header.jsx';
import useAuth from '../hooks/index.jsx';
import AuthProvider from '../contexts/AuthProvider.jsx';
import routes from '../routes.js';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.loggedIn ? children : <Navigate to={routes.loginPage()} />;
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <Header />
      <Routes>
        <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
        <Route path={routes.loginPage()} element={<LoginPage />} />
        <Route
          path={routes.mainPage()}
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  </div>
);

export default App;
