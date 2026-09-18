'use client';

import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function EditProfileForm() {
  const router = useRouter();

  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const [username, setUsername] = useState(user?.username ?? '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError('');
    setIsLoading(true);

    if (!user) {
      setError('User not found.');
      setIsLoading(false);
      return;
    }

    try {
      const updatedUser = await updateMe({
        username,
        email: user.email,
      });

      setUser(updatedUser);

      router.push('/profile');
      router.refresh();
    } catch {
      setError('Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <main>
      <div>
        <h1>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
        />

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={event =>
                setUsername(event.target.value)
              }
              required
            />
          </div>

          <p>Email: {user.email}</p>

          {error && <p>{error}</p>}

          <div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </button>

            <button
              type="button"
              onClick={() => router.push('/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}