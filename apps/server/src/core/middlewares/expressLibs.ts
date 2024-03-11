import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { type Application } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';

export const configureExpressLibs = (app: Application) => {
  const config = () => {
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
  };

  return { config };
};
