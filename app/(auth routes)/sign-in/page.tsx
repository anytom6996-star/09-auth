import type { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Login | NoteHub',
  description: 'Log in to your NoteHub account.',
  openGraph: {
    title: 'Login | NoteHub',
    description: 'Log in to your NoteHub account.',
    url: 'https://notehub.com/login',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};

export default function LoginPage() {
  return (
    <main>
      <h1>Login</h1>
      <LoginForm />
    </main>
  );
}