'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api/clientApi';

interface NoteDetailsClientProps {
  id: string;
}

const NoteDetailsClient = ({
  id,
}: NoteDetailsClientProps) => {
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <p>
        Could not fetch note.{' '}
        {error instanceof Error
          ? error.message
          : 'Unknown error'}
      </p>
    );
  }

  if (!note) {
    return <p>Note not found.</p>;
  }

  return (
    <main>
      <h1>{note.title}</h1>

      <p>{note.content}</p>

      <p>Tag: {note.tag}</p>

      <p>
        Created:{' '}
        {new Date(
          note.createdAt,
        ).toLocaleString()}
      </p>
    </main>
  );
};

export default NoteDetailsClient;