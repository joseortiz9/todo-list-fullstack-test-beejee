import { TRPCClientError, type TRPCLink, createTRPCReact } from '@trpc/react-query';
import { observable } from '@trpc/server/observable';
import { type AxiosError } from 'axios';

import { useAuthSession } from '@/hooks';

import type { AppRouter } from '../../../server/src/routers/root';

export const trpc = createTRPCReact<AppRouter>();

export const useTRPCContext = () => trpc.useUtils();

export const customLink: TRPCLink<AppRouter> = () => {
  return ({ next, op }) => {
    return observable((observer) => {
      const unsubscribe = next(op).subscribe({
        next: (value) => {
          observer.next(value);
        },
        error: (err) => {
          observer.error(err);
          if (isAuthError(err)) {
            useAuthSession.getState().logout();
          }
        },
        complete: () => {
          observer.complete();
        },
      });
      return unsubscribe;
    });
  };
};

export const isAuthError = (err: unknown): boolean =>
  err instanceof TRPCClientError ? err.data?.httpStatus === 401 : false;

export const isAxiosError = (e: unknown): e is AxiosError =>
  !!e && typeof e === 'object' && 'isAxiosError' in e && e.isAxiosError === true;
