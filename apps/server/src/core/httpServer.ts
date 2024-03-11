import { type Application } from 'express';
import http from 'http';

import { PORT } from '@/env';

export const initHttpServer = (app: Application) => {
  const start = () => {
    const server = http.createServer(app);
    server.listen(PORT, () => console.log(`🚀 Server has launched`));
  };
  return { start };
};
