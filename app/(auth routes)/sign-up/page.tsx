import type { Metadata } from 'next';
import RegisterForm from './RegisterForm';

export const metadata: Metadata = {
  title: 'Register | NoteHub',
  description: 'Create your NoteHub account.',
  openGraph: {
    title: 'Register | NoteHub',
    description: 'Create your NoteHub account.',
    url: 'https://notehub.com/register',
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

export default function RegisterPage() {
  return (
    <main>
      <h1>Register</h1>
      <RegisterForm />
    </main>
  );
}