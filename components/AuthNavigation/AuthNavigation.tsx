'use client';

import Link from 'next/link';

import { useAuthStore } from '@/lib/store/authStore';

export default function AuthNavigation() {
  const user = useAuthStore(state => state.user);

  return (
    <nav>
      {user ? (
        <Link href="/profile">Profile</Link>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </>
      )}
    </nav>
  );
}