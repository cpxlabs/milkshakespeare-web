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
  provider?: 'google' | 'facebook' | 'instagram' | 'guest';
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  hasPermission: (requiredRole: UserRole) => boolean;
  signIn: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithInstagram: () => Promise<void>;
  signInAsGuest: () => Promise<void>;
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
          const parsed = JSON.parse(stored) as User;
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

  const persistUser = useCallback(async (u: User) => {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
    setUser(u);
    if (ROLE_HIERARCHY[u.role] >= ROLE_HIERARCHY.admin) {
      setViewModeState('admin');
    }
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

  const signInWithGoogle = useCallback(async () => {
    try {
      if (Platform.OS === 'web') {
        const googleUser: User = {
          id: 'google-web-user',
          email: 'user@gmail.com',
          name: 'Google User',
          role: 'client',
          provider: 'google',
        };
        await persistUser(googleUser);
      } else {
        const nativeUser: User = {
          id: 'google-native-user',
          email: 'user@gmail.com',
          name: 'Google User',
          role: 'client',
          provider: 'google',
        };
        await persistUser(nativeUser);
      }
    } catch {
      // handle error
    }
  }, [persistUser]);

  const signInWithFacebook = useCallback(async () => {
    try {
      const fbUser: User = {
        id: 'facebook-user',
        email: 'user@facebook.com',
        name: 'Facebook User',
        role: 'client',
        provider: 'facebook',
      };
      await persistUser(fbUser);
    } catch {
      // handle error
    }
  }, [persistUser]);

  const signInWithInstagram = useCallback(async () => {
    try {
      const igUser: User = {
        id: 'instagram-user',
        email: 'user@instagram.com',
        name: 'Instagram User',
        role: 'client',
        provider: 'instagram',
      };
      await persistUser(igUser);
    } catch {
      // handle error
    }
  }, [persistUser]);

  const signInAsGuest = useCallback(async () => {
    try {
      const guestUser: User = {
        id: 'guest',
        email: 'guest@example.com',
        name: 'Guest User',
        role: 'client',
        provider: 'guest',
      };
      await persistUser(guestUser);
    } catch {
      // handle error
    }
  }, [persistUser]);

  const signIn = useCallback(async () => {
    await signInAsGuest();
  }, [signInAsGuest]);

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
        signInWithGoogle,
        signInWithFacebook,
        signInWithInstagram,
        signInAsGuest,
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
