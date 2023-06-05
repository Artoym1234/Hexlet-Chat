import React, {
  createContext, useState, useMemo, useCallback,
  useContext,
} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const stateInit = localStorage.token;
  const [loggedIn, setLoggedIn] = useState(stateInit);

  const logIn = useCallback((token, username) => {
    setLoggedIn(true);
    localStorage.token = token;
    localStorage.username = username;
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  }, []);

  const token = localStorage.getItem('token');

  const getAuthHeader = useCallback(() => {
    if (localStorage.getItem('token')) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  }, [token]);

  const notify = useCallback((type, text) => {
    if (type === 'success') {
      toast.success(text, { toastId: `${text} sucsess` });
      return;
    }
    toast.error(text, { toatId: `${text} error` });
  }, []);

  const memo = useMemo(() => ({
    loggedIn, logIn, logOut, notify, getAuthHeader,
  }), [loggedIn, logIn, logOut, notify, getAuthHeader]);

  return (
    <AuthContext.Provider value={memo}>
      {children}
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
    </AuthContext.Provider>
  );
};

export default AuthProvider;
