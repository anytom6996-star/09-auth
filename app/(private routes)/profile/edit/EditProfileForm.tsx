'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function EditProfileForm() {
  const router = useRouter();

  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const [username, setUsername] = useState(user?.username ?? '');
  const [email, setEmail] = useState(user?.email ?? '');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');
    setIsLoading(true);

    try {
      const updatedUser = await updateMe({
        username,
        email,
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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={username}
          onChange={event => setUsername(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
        />
      </div>

      {error && <p>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save changes'}
      </button>

      <button
        type="button"
        onClick={() => router.back()}
      >
        Cancel
      </button>
    </form>
  );
}