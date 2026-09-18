'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function RegisterForm() {
  const router = useRouter();

  const setUser = useAuthStore(state => state.setUser);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');
    setIsLoading(true);

    try {
      const response = await register({
        username,
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
      setError('Registration failed. Please check your data.');
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
        {isLoading ? 'Registering...' : 'Register'}
      </button>

      <p>
        Already have an account?{' '}
        <Link href="/sign-in">Login</Link>
      </p>
    </form>
  );
}