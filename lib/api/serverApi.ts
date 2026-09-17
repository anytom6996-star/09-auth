import axios from 'axios';

import { cookies } from 'next/headers';

import type { Note, NotesResponse } from '@/types/note';

const API_URL = 'https://notehub-public.goit.study/api';

async function serverApi() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  return axios.create({
    baseURL: API_URL,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });
}

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
  const api = await serverApi();

  const response = await api.get<NotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search,
      ...(tag ? { tag } : {}),
    },
  });

  return response.data;
};

export const fetchNoteById = async (
  id: string,
): Promise<Note> => {
  const api = await serverApi();

  const response = await api.get<Note>(`/notes/${id}`);

  return response.data;
};