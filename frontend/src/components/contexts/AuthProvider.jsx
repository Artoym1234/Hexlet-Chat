import React, { useState, useMemo, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './index.jsx';

const AuthProvider = ({ children }) => {
  const stateInit = localStorage.token;
  const [loggedIn, setLoggedIn] = useState(stateInit);

  const logIn = (token, username) => {
    setLoggedIn(true);
    localStorage.token = token;
    localStorage.username = username;
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  /* const getAuthHeader = useCallback(() => {
    if (loggedIn === true) {
      return { Authorization: `Bearer ${localStorage.getItem('token')}` };
    }
    return {};
  }, [loggedIn]); */
  const getAuthHeader = useCallback(() => ({ Authorization: `Bearer ${localStorage.getItem('token')}` }));

  const notify = (type, text) => {
    if (type === 'success') {
      toast.success(text, { toastId: `${text} sucsess` });
      return;
    }
    toast.error(text, { toatId: `${text} error` });
  };

  const memo = useMemo(() => ({
    loggedIn, logIn, logOut, notify, getAuthHeader,
  }), [loggedIn, logIn, logOut]);

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
