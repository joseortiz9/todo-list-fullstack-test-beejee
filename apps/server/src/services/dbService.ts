import { PrismaClient } from '@prisma/client';

import { isTest } from '@/env';

export class DatabaseService {
  private static prisma: PrismaClient;

  static getDB() {
    if (!this.prisma) {
      this.prisma = new PrismaClient({ log: isTest ? ['error'] : ['query', 'error', 'warn'] });
    }
    return this.prisma;
  }
}
