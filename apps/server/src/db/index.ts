import { PrismaClient } from '@prisma/client';

import { isTest } from '@/env';

export const db = new PrismaClient({ log: isTest ? ['error'] : ['query', 'error', 'warn'] });
