import type { inferAsyncReturnType } from '@trpc/server';
import type * as trpcExpress from '@trpc/server/adapters/express';

import { DatabaseService, JwtService } from '@/services';

export const createContext = async ({ req }: trpcExpress.CreateExpressContextOptions) => {
  const sessionToken = req.headers['authorization']?.split(' ')[1];
  const session = await JwtService.parseSessionByToken(sessionToken);
  const cacheControl = req.headers['x-cache-control'];
  const db = DatabaseService.getDB();
  return {
    db,
    session,
    cacheControl,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
