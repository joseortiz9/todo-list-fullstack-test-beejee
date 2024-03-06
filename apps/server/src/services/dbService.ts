import { PrismaClient } from '@prisma/client';

import { isProd } from '@/env';

export class DatabaseService {
  private static prisma: PrismaClient;

  static getDB() {
    if (!this.prisma) {
      this.prisma = new PrismaClient({ log: isProd ? ['error'] : ['query', 'error', 'warn'] });
    }
    return this.prisma;
  }
}
