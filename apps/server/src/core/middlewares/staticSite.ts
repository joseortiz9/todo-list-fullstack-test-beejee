import express, { type Application } from 'express';
import { join, resolve } from 'path';

export const configureStaticSite = (app: Application) => {
  const serve = () => {
    const buildPath = resolve(__dirname, '../../../../../web/dist');

    app.use(express.static(buildPath));

    app.get('*', (_, res) => res.sendFile(join(buildPath, 'index.html')));
  };

  return { serve };
};
