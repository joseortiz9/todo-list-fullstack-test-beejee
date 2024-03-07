import { useEffect } from 'react';

import { useAuthSession } from './useAuthSession';

export const useAuthSessionRefresher = () => {
  const updateStore = () => {
    useAuthSession.persist.rehydrate();
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', updateStore);
    window.addEventListener('focus', updateStore);
    return () => {
      document.removeEventListener('visibilitychange', updateStore);
      window.removeEventListener('focus', updateStore);
    };
  }, []);

  return null;
};
