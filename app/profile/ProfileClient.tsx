'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { logout } from '@/lib/api';
import { useAuthStore } from '@/lib/store/authStore';

export default function ProfileClient() {
  const router = useRouter();

  const user = useAuthStore(state => state.user);
  const clearAuth = useAuthStore(state => state.clearAuth);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearAuth();
      router.push('/');
      router.refresh();
    }
  };

  if (!user) {
    return (
      <main>
        <h1>Profile</h1>
        <p>You are not logged in.</p>
        <Link href="/login">Login</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Profile</h1>

      <div>
        <p>
          <strong>Username:</strong> {user.username}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <Link href="/profile/edit">Edit profile</Link>

      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </main>
  );
}