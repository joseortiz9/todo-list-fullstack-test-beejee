import 'dotenv/config';

import { HttpServer } from '@/core';
import { Middlewares } from '@/middlewares';

const { app } = HttpServer.create();

Middlewares.config(app);
