import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/types';
import { logoutUser } from '@/services/api';

/**
 * Context interface for authentication management
 */
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

/**
 * Create the context with default values
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Props for the AuthProvider component
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider component for authentication management
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Try to get saved user from localStorage
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    logoutUser(); // Clear JWT token
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: user !== null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use the authentication context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
