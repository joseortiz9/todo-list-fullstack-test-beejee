import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';

import { db } from '@/db';
import { JwtHelper } from '@/helpers/jwtHelper';
import { type AuthService } from '@/interfaces/authService';
import { parseUserToSessionData } from '@/parsers/userToSessionData';
import type { UserSessionData } from '@/sharedTypes';

export const authServiceImpl = (): AuthService => {
  const whoami = async (sessionId: number) => {
    const user = await db.user.findUnique({ where: { id: sessionId } });
    if (!user) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Failed to fetch user',
      });
    }
    return parseUserToSessionData(user);
  };

  const login = async (username: string, password: string) => {
    const user = await db.user.findUnique({ where: { username } });
    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Invalid email or password',
      });
    }
    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Invalid email or password',
        });
      }
      const session = parseUserToSessionData(user);
      const token = await JwtHelper.generateToken<UserSessionData>(session);

      return {
        session,
        token,
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Failed to authenticate user',
      });
    }
  };

  return {
    whoami,
    login,
  };
};
