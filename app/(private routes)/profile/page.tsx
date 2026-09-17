'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { logout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function ProfilePage() {
  const router = useRouter();

  const user = useAuthStore(state => state.user);
  const clearAuth = useAuthStore(state => state.clearAuth);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearAuth();

      document.cookie =
        'auth-token=; path=/; max-age=0';

      router.push('/login');
      router.refresh();
    }
  };

  if (!user) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <h1>Profile</h1>

      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>

      <Link href="/profile/edit">Edit profile</Link>

      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </main>
  );
}