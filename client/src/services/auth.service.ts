import api from './api';
import type { User } from '../types';

export const getMe = (): Promise<User> =>
  api.get<User>('/api/profile').then((r) => r.data);

export const logout = (): Promise<void> =>
  api.get('/auth/logout').then(() => undefined);
