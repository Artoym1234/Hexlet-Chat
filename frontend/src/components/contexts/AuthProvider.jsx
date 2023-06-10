import React, {
  createContext, useState, useMemo, useCallback,
  useContext,
} from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { actions as loadingStateActions } from '../../slices/loadingSlice.js';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const stateInit = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(stateInit);

  const logIn = useCallback((data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    dispatch(loadingStateActions.unload());
    setUser(null);
  }, [dispatch]);

  const getAuthHeader = useCallback(() => {
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  }, [user]);

  const notify = useCallback((type, text) => {
    if (type === 'success') {
      toast.success(text, { toastId: `${text} sucsess` });
      return;
    }
    toast.error(text, { toatId: `${text} error` });
  }, []);

  const memo = useMemo(() => ({
    setUser, user, logIn, logOut, notify, getAuthHeader,
  }), [setUser, user, logIn, logOut, notify, getAuthHeader]);

  return (
    <AuthContext.Provider value={memo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
