import React, { createContext, useContext, useState } from 'react';
import { getUser, setUser, removeUser } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(() => getUser());

  const login = (userData) => {
    setUser(userData);
    setUserState(userData);
  };

  const logout = () => {
    removeUser();
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
