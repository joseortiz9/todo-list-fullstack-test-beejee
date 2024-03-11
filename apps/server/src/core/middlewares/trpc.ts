import * as trpcExpress from '@trpc/server/adapters/express';
import { type Application } from 'express';

import { appRouter } from '@/routers/root';
import { createContext } from '@/trpc/context';

export const configureTRPC = (app: Application) => {
  const config = () => {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: appRouter().create(),
        createContext,
        responseMeta: ({ ctx, errors }) => {
          if (errors.length) {
            return {};
          }
          if (ctx?.cacheControl) {
            return { headers: { 'Cache-Control': ctx?.cacheControl } };
          }
          return {};
        },
      }),
    );
  };

  return { config };
};
