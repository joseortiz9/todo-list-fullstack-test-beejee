import type { inferAsyncReturnType } from '@trpc/server';
import type * as trpcExpress from '@trpc/server/adapters/express';

import { AuthService, DatabaseService } from '@/services';

export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  const sessionToken = req.headers['authorization']?.split(' ')[1];
  const session = await AuthService.parseSessionByJwt(sessionToken);
  const cacheControl = req.headers['x-cache-control'];
  const db = DatabaseService.getDB();
  return {
    req,
    res,
    db,
    session,
    cacheControl,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
