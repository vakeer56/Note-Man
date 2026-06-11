import { useState, useEffect } from 'react';
import { getMe } from '../services/auth.service';
import type { User } from '../types';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = () => {
    setLoading(true);
    setError(null);
    getMe()
      .then(setUser)
      .catch(() => {
        setUser(null);
        setError('Not authenticated');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error, refetch: fetchUser };
}
