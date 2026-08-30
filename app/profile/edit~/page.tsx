import type { Metadata } from 'next';

import EditProfileForm from './EditProfileForm';

export const metadata: Metadata = {
  title: 'Edit Profile | NoteHub',
  description: 'Edit your NoteHub profile information.',
  openGraph: {
    title: 'Edit Profile | NoteHub',
    description: 'Edit your NoteHub profile information.',
    url: 'https://notehub.com/profile/edit',
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

export default function EditProfilePage() {
  return (
    <main>
      <h1>Edit Profile</h1>
      <EditProfileForm />
    </main>
  );
}