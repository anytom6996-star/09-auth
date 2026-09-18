import { cookies } from 'next/headers';

import type { Note, NotesResponse } from '@/types/note';
import type { User } from '@/types/user';

import { api } from './api';

const getCookieHeader = async () => {
  const cookieStore = await cookies();

  return cookieStore.toString();
};

export const checkSession = async () => {
  const cookieHeader = await getCookieHeader();

  return api.get('/auth/session', {
    headers: {
      Cookie: cookieHeader,
    },
  });
};

export const getMe = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();

  const response = await api.get<User>('/users/me', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
};

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<NotesResponse> => {
  const cookieHeader = await getCookieHeader();

  const response = await api.get<NotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search,
      tag,
    },
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
};

export const fetchNoteById = async (
  id: string,
): Promise<Note> => {
  const cookieHeader = await getCookieHeader();

  const response = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
};