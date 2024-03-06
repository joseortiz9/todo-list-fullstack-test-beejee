import { type UserSessionData } from '@todo-list-fullstack-test/shared-ts';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '@/env';

export class AuthService {
  static async parseSessionByJwt(token?: string): Promise<UserSessionData | null> {
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
