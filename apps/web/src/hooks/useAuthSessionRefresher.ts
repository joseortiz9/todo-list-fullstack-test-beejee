import { useEffect } from 'react';

import { STORE_KEY, useAuthSession } from './useAuthSession';

export const useAuthSessionRefresher = () => {
  const updateStore = (e: StorageEvent) => {
    if (e.key === STORE_KEY) {
      useAuthSession.persist.rehydrate();
    }
  };

  useEffect(() => {
    window.addEventListener('storage', updateStore);
    return () => {
      window.removeEventListener('storage', updateStore);
    };
  }, []);

  return null;
};
