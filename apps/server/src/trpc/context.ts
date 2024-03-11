import type { inferAsyncReturnType } from '@trpc/server';
import type * as trpcExpress from '@trpc/server/adapters/express';

import { tokenToSessionData } from '@/parsers/tokenToSessionData';

export const createContext = ({ req }: trpcExpress.CreateExpressContextOptions) => {
  const sessionToken = req.headers['authorization']?.split(' ')[1];
  const session = tokenToSessionData(sessionToken);
  const cacheControl = req.headers['x-cache-control'];
  return {
    session,
    cacheControl,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
