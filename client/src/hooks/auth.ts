import { useState, useEffect } from 'react';
import { User, getUser, signOut } from '@/utils/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  return { user, loading, logout };
}
