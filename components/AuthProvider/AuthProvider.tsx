'use client';

import { useEffect } from 'react';

import { getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore(state => state.setUser);
  const clearAuth = useAuthStore(state => state.clearAuth);
  const token = useAuthStore(state => state.token);

  useEffect(() => {
    if (!token) {
      return;
    }

    const checkAuth = async () => {
      try {
        const user = await getMe();

        setUser(user);
      } catch {
        clearAuth();
      }
    };

    checkAuth();
  }, [token, setUser, clearAuth]);

  return children;
};

export default AuthProvider;