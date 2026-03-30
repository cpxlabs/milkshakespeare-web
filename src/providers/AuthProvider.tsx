import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

interface User {
  id: string;
  email: string;
  name: string;
  photo?: string;
  provider?: 'google' | 'facebook' | 'instagram' | 'guest';
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithInstagram: () => Promise<void>;
  signInAsGuest: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_STORAGE_KEY = '@app:auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
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
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      if (Platform.OS === 'web') {
        const googleUser: User = {
          id: 'google-web-user',
          email: 'user@gmail.com',
          name: 'Google User',
          provider: 'google',
        };
        await persistUser(googleUser);
      } else {
        const nativeUser: User = {
          id: 'google-native-user',
          email: 'user@gmail.com',
          name: 'Google User',
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
