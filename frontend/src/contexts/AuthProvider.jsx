import React, { useState, useMemo } from 'react';
import AuthContext from './index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const memo = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return <AuthContext.Provider value={memo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
