import { Environment } from './env';

export const { PORT, isProd, isDev, JWT_SECRET } = Environment.config();
