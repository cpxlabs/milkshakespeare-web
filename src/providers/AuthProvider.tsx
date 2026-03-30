import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export type UserRole = 'client' | 'admin' | 'dev';

export type ViewMode = 'client' | 'admin';

interface User {
  id: string;
  email: string;
  name: string;
  photo?: string;
  role: UserRole;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  hasPermission: (requiredRole: UserRole) => boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const ROLE_HIERARCHY: Record<UserRole, number> = {
  client: 0,
  admin: 1,
  dev: 2,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_STORAGE_KEY = '@app:auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewModeState] = useState<ViewMode>('client');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (!parsed.role) {
            parsed.role = 'client';
          }
          setUser(parsed);
          if (ROLE_HIERARCHY[parsed.role] >= ROLE_HIERARCHY.admin) {
            setViewModeState('admin');
          }
        }
      } catch {
        // ignore
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const setViewMode = useCallback(
    (mode: ViewMode) => {
      if (user && ROLE_HIERARCHY[user.role] >= ROLE_HIERARCHY.admin) {
        setViewModeState(mode);
      }
    },
    [user]
  );

  const hasPermission = useCallback(
    (requiredRole: UserRole): boolean => {
      if (!user) return false;
      return ROLE_HIERARCHY[user.role] >= ROLE_HIERARCHY[requiredRole];
    },
    [user]
  );

  const signIn = useCallback(async () => {
    try {
      if (Platform.OS === 'web') {
        // Web stub: simulate sign-in with guest user
        const guestUser: User = {
          id: 'guest',
          email: 'guest@example.com',
          name: 'Guest User',
          role: 'client',
        };
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(guestUser));
        setUser(guestUser);
      } else {
        // Native: use Google Sign-In
        // This is a stub — real implementation requires @react-native-google-signin/google-signin
        const nativeUser: User = {
          id: 'native-user',
          email: 'user@example.com',
          name: 'Native User',
          role: 'client',
        };
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nativeUser));
        setUser(nativeUser);
      }
    } catch {
      // handle error
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      setUser(null);
      setViewModeState('client');
    } catch {
      // handle error
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        viewMode,
        setViewMode,
        hasPermission,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
