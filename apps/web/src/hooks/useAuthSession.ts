import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { type UserSessionData } from '@/sharedTypes';

type AuthSessionProps = {
  session: UserSessionData | null;
  token: string | null;
  setSession: (session: UserSessionData, token: string) => void;
  logout: () => void;
};

export const STORE_KEY = 'auth-session';

export const useAuthSession = create<AuthSessionProps>()(
  persist(
    (set) => ({
      session: null,
      token: null,
      setSession: (session, token) => {
        set({
          session,
          token,
        });
      },
      logout: () => {
        set({
          session: null,
          token: null,
        });
      },
    }),
    {
      name: STORE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        session: state.session,
        token: state.token,
      }),
    },
  ),
);

export const useIsAdmin = () => useAuthSession((state) => state.session?.isAdmin ?? false);
