export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
  total: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';