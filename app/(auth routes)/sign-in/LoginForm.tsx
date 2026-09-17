'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { login } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function LoginForm() {
  const router = useRouter();

  const setUser = useAuthStore(state => state.setUser);
  const setToken = useAuthStore(state => state.setToken);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError('');
    setIsLoading(true);

    try {
      const response = await login({
        email,
        password,
      });

      setToken(response.token);
      setUser(response.user);

      document.cookie = `auth-token=${response.token}; path=/; max-age=2592000`;

      router.push('/profile');
      router.refresh();
    } catch {
      setError('Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <div>
        <label htmlFor="password">Password</label>

        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
          minLength={6}
        />
      </div>

      {error && <p>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      <p>
        Don&apos;t have an account?{' '}
        <Link href="/register">Register</Link>
      </p>
    </form>
  );
}