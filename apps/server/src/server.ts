import 'dotenv/config';
import express from 'express';

import { configureExpress, initHttpServer } from '@/core';

const app = express();

configureExpress(app).config();

initHttpServer(app).start();
