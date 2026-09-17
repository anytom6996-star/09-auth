'use client';

import axios from 'axios';

import type {
  CreateNoteParams,
  Note,
  NotesResponse,
} from '@/types/note';

import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UpdateUserRequest,
} from '@/types/auth';

import type { User } from '@/types/user';

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}): Promise<NotesResponse> => {
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
  const response = await api.get<Note>(`/notes/${id}`);

  return response.data;
};

export const createNote = async (
  note: CreateNoteParams,
): Promise<Note> => {
  const response = await api.post<Note>('/notes', note);

  return response.data;
};

export const deleteNote = async (
  id: string,
): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);

  return response.data;
};

export const register = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    '/auth/register',
    data,
  );

  return response.data;
};

export const login = async (
  data: LoginRequest,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    '/auth/login',
    data,
  );

  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>('/auth/me');

  return response.data;
};

export const updateMe = async (
  data: UpdateUserRequest,
): Promise<User> => {
  const response = await api.patch<User>(
    '/auth/me',
    data,
  );

  return response.data;
};