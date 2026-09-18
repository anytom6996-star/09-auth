'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { logout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthNavigation() {
  const router = useRouter();

  const user = useAuthStore(state => state.user);
  const clearAuth = useAuthStore(state => state.clearAuth);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearAuth();
      router.push('/sign-in');
      router.refresh();
    }
  };

  return (
    <nav>
      {user ? (
        <>
          <Link href="/profile">
            {user.username || user.email}
          </Link>

          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/sign-in">Login</Link>
          <Link href="/sign-up">Register</Link>
        </>
      )}
    </nav>
  );
}