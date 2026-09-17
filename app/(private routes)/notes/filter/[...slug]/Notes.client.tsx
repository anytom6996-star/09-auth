'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { fetchNotes } from '@/lib/api/clientApi';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [tag]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
        tag: tag === 'all' ? undefined : tag,
      }),
  });

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <div>
        <p>Could not load notes.</p>
        <p>Try again</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <main>
      <SearchBox value={search} onSearch={handleSearch} />

      <Link href="/notes/action/create">Create note +</Link>

      {data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found.</p>
      )}

      <Pagination
        currentPage={page}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}