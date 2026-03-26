import { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../api/apiService';

const AuthContext = createContext();
const isDev = import.meta.env.DEV;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [csrfReady, setCsrfReady] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Initialize CSRF token FIRST - critical for all state-changing requests
        try {
          await apiService.initializeCsrf();
          setCsrfReady(true);
        } catch (csrfError) {
          if (isDev) console.warn('CSRF init failed:', csrfError.message);
          setCsrfReady(true);
        }
        
        const backendUser = await apiService.auth.verifyToken();
        const normalized = { ...backendUser, id: backendUser.id || backendUser._id };
        setUser(normalized);
      } catch (error) {
        if (isDev) console.warn('Auth init: no active session');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData) => {
    // No longer need to handle token - it's in httpOnly cookie
    setUser(userData);
  };

  const logout = async () => {
    try {
      await apiService.auth.logout();
    } catch (error) {
      if (isDev) console.warn('Logout API error:', error.message);
    }
    setUser(null);
  };

  const isTeacher = () => {
    return user?.role === 'teacher' || user?.role === 'admin';
  };

  const value = {
    user,
    isLoading,
    csrfReady,
    login,
    logout,
    isAuthenticated: !!user,
    isTeacher
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};