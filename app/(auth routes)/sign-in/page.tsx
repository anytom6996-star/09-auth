import type { Metadata } from 'next';

import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Sign in | NoteHub',
  description: 'Sign in to your NoteHub account.',
  openGraph: {
    title: 'Sign in | NoteHub',
    description: 'Sign in to your NoteHub account.',
    url: 'https://notehub.com/sign-in',
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

export default function SignInPage() {
  return (
    <main>
      <h1>Sign in</h1>
      <LoginForm />
    </main>
  );
}