import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { getMe } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description: 'User profile',
};

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <main>
      <h1>Profile</h1>

      {user.avatar ? (
        <Image
          src={user.avatar}
          alt={user.username}
          width={120}
          height={120}
        />
      ) : null}

      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>

      <Link href="/profile/edit">
        Edit profile
      </Link>
    </main>
  );
}