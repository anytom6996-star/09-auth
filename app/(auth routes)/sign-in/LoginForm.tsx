'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { login } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function LoginForm() {
  const router = useRouter();

  const setUser = useAuthStore(state => state.setUser);

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

      setUser({
        username: response.user.username,
        email: response.user.email,
        avatar: '',
      });

      router.push('/profile');
      router.refresh();
    } catch {
      setError(
        'Login failed. Please check your email and password.',
      );
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
          type="email"
          name="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>

        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log in'}
        </button>
      </div>

      {error && <p>{error}</p>}

      <p>
        Don&apos;t have an account?{' '}
        <Link href="/sign-up">Sign up</Link>
      </p>
    </form>
  );
}