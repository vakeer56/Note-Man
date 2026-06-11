import api from './api';
import type { Note, NoteFormValues } from '../types';

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message: string;
}

function toArray(data: unknown): Note[] {
  return Array.isArray(data) ? data : [];
}

function parseTagsInput(raw: string): string[] {
  return raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

export const getAllNotes = (): Promise<Note[]> =>
  api.get<ApiEnvelope<Note[]>>('/notes/all').then((r) => toArray(r.data.data));

export const getArchivedNotes = (): Promise<Note[]> =>
  api.get<ApiEnvelope<Note[]>>('/notes/getarchived').then((r) => toArray(r.data.data));

export const getNoteById = (id: string): Promise<Note> =>
  api.get<ApiEnvelope<Note>>(`/notes/${id}`).then((r) => r.data.data);

export const searchNotes = (q: string): Promise<Note[]> =>
  api
    .get<ApiEnvelope<Note[]>>('/notes/search', { params: { q } })
    .then((r) => toArray(r.data.data));

export const getNotesByTag = (tag: string): Promise<Note[]> =>
  api
    .get<ApiEnvelope<Note[]>>(`/notes/tag/${encodeURIComponent(tag)}`)
    .then((r) => toArray(r.data.data));

export const createNote = (values: NoteFormValues): Promise<Note> =>
  api
    .post<ApiEnvelope<Note>>('/notes/create', {
      title: values.title,
      content: values.content,
      tags: parseTagsInput(values.tags),
    })
    .then((r) => r.data.data);

export const updateNote = (id: string, values: NoteFormValues): Promise<Note> =>
  api
    .patch<ApiEnvelope<Note>>(`/notes/update/${id}`, {
      title: values.title,
      content: values.content,
      tags: parseTagsInput(values.tags),
    })
    .then((r) => r.data.data);

export const deleteNote = (id: string): Promise<void> =>
  api.delete(`/notes/delete/${id}`).then(() => undefined);

export const archiveNote = (id: string, isArchived: boolean): Promise<Note> =>
  api
    .patch<ApiEnvelope<Note>>(`/notes/update/${id}`, { isArchived })
    .then((r) => r.data.data);

export const togglePin = (id: string, isPinned: boolean): Promise<Note> =>
  api
    .patch<ApiEnvelope<Note>>(`/notes/update/${id}`, { isPinned })
    .then((r) => r.data.data);
