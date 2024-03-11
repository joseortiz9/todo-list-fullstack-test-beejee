import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '@/env';

const JWT_EXPIRATION = '7d';

export class JwtHelper {
  static async generateToken<T extends object>(data: T): Promise<string> {
    return jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  }
  static parseToken<T extends object>(token: string): T | null {
    return jwt.verify(token, JWT_SECRET) as T;
  }
}
