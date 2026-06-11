export interface User {
  _id: string;
  googleId: string;
  email: string;
  firstName: string;
  lastName?: string;
  provider: string;
  createdAt: string;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  user: string;
  isArchived: boolean;
  isPinned: boolean;
  createdAt: string;
  modifiedAt: string;
}

export interface NoteFormValues {
  title: string;
  content: string;
  tags: string;
}

export interface ApiError {
  error: string;
}
