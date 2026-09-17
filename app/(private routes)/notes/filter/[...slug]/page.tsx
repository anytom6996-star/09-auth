import type { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';

const PER_PAGE = 12;

interface NotesPageProps {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;

  const tag = slug[0] === 'all' ? 'All notes' : slug[0];

  return {
    title: `${tag} notes | NoteHub`,
    description: `Browse ${tag} notes in NoteHub.`,
    openGraph: {
      title: `${tag} notes | NoteHub`,
      description: `Browse ${tag} notes in NoteHub.`,
      url: `https://notehub.com/notes/filter/${slug.join('/')}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub application',
        },
      ],
    },
  };
}

export default async function NotesPage({
  params,
  searchParams,
}: NotesPageProps) {
  const { slug } = await params;
  const queryParams = await searchParams;

  const tag = slug[0] === 'all' ? undefined : slug[0];
  const page = Number(queryParams.page) || 1;
  const search = queryParams.search || '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search,
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}