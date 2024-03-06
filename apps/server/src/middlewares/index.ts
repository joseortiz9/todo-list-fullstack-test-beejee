import * as trpcExpress from '@trpc/server/adapters/express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Application } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { join, resolve } from 'path';

import { isProd } from '@/env';
import { appRouter } from '@/routers/root';
import { createContext } from '@/trpc/context';

export class Middlewares {
  public static config(app: Application) {
    app.use(cookieParser());
    app.use(bodyParser.json({ limit: '1mb' }));
    app.use(
      bodyParser.raw({
        inflate: true,
        limit: '1mb',
        type: 'application/json',
      }),
    );
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(
      hpp({
        checkBody: true,
        checkQuery: true,
      }),
    );
    app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true,
      }),
    );

    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: appRouter,
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

    if (isProd) {
      this.serveWeb(app);
    }
  }

  private static serveWeb(app: Application) {
    const buildPath = resolve(__dirname, '../../../../web/dist');

    app.use(express.static(buildPath));

    app.get('*', (_, res) => res.sendFile(join(buildPath, 'index.html')));
  }
}
