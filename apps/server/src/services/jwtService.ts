import jwt from 'jsonwebtoken';

import { type UserSessionData } from '@todo-list-fullstack-test/shared-ts';

import { JWT_SECRET } from '@/env';

export class JwtService {
  static async generateToken(data: UserSessionData): Promise<string> {
    return jwt.sign(data, JWT_SECRET, { expiresIn: '7d' });
  }
  static async parseSessionByToken(token?: string): Promise<UserSessionData | null> {
    if (!token) {
      return null;
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as UserSessionData;
      if (!decoded) {
        return null;
      }
      return decoded;
    } catch (e) {
      console.error('Error parsing session by JWT', e);
      return null;
    }
  }
}
