// src/context/AuthContext.tsx

import { createContext, useState, useEffect, ReactNode } from 'react';
import AuthService from '../utils/auth';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthService.loggedIn());

  const login = (token: string) => {
    AuthService.login(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setIsAuthenticated(AuthService.loggedIn());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};