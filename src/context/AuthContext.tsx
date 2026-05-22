import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const AUTH_KEY = '@foodapp_auth';

const MOCK_USER: User = { id: '1', name: 'Pratik Sharma', email: 'pratik@foodapp.com' };

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(AUTH_KEY);
        if (stored) setUser(JSON.parse(stored));
      } catch (e) {
        console.warn('Auth restore error:', e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Mock validation — any non-empty credentials work
    if (!email.trim()) return false;
    const loggedUser = { ...MOCK_USER, email };
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(loggedUser));
    setUser(loggedUser);
    return true;
  };

  const logout = async () => {
    await AsyncStorage.removeItem(AUTH_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
