import { Environment } from './env';

export const { PORT, isProd, isDev, isTest, JWT_SECRET } = Environment.config();
