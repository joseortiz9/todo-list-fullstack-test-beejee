import type { Application } from 'express';

import { isTest } from '@/env';

import { configureExpressLibs, configureStaticSite, configureTRPC } from './middlewares';

export const configureExpress = (app: Application) => {
  const config = () => {
    configureExpressLibs(app).config();
    configureTRPC(app).config();

    if (isTest) {
      configureStaticSite(app).serve();
    }
  };

  return { config };
};
