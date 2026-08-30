'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({
  id,
}: NotePreviewClientProps) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
  queryKey: ['note', id],
  queryFn: () => fetchNoteById(id as string),
  enabled: Boolean(id),
  refetchOnMount: false,
});

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <p>Loading...</p>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={handleClose}>
        <p>Could not fetch note.</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <main>
        <h1>{note.title}</h1>

        <p>{note.content}</p>

        <p>Tag: {note.tag}</p>

        <p>
          Created: {new Date(note.createdAt).toLocaleString()}
        </p>
      </main>
    </Modal>
  );
}