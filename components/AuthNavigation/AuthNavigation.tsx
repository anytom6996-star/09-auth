'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { logout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthNavigation() {
  const router = useRouter();

  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(
    state => state.isAuthenticated,
  );
  const clearIsAuthenticated = useAuthStore(state => state.clearIsAuthenticated);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearIsAuthenticated();
      router.push('/sign-in');
      router.refresh();
    }
  };

  if (isAuthenticated && user) {
    return (
      <>
        <li>
          <Link href="/profile" prefetch={false}>
            Profile
          </Link>
        </li>

        <li>
          <p>{user.email}</p>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <li>
        <Link href="/sign-in" prefetch={false}>
          Login
        </Link>
      </li>

      <li>
        <Link href="/sign-up" prefetch={false}>
          Sign up
        </Link>
      </li>
    </>
  );
}