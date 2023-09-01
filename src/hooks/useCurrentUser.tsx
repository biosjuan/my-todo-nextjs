import { User } from '@/redux/usersSlice';
import { useEffect, useState } from 'react';

interface UseCurrentUser {
  (key: string): {
    user: User | null;
  };
}

const parseCookie = (key: string) => {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${key}=`));
  if (!cookie) return null;

  const userCookieValue = cookie.split('=')[1];
  try {
    return JSON.parse(userCookieValue) as User;
  } catch {
    return null;
  }
};

const useCurrentUser: UseCurrentUser = (key) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const user = parseCookie(key);
    if (user) {
      setUser(user);
    }
  }, [key]);

  return { user };
};

export default useCurrentUser;
