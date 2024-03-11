import { type User as UserModel } from '@prisma/client';

import type { UserSessionData } from '@/sharedTypes';

export const parseUserToSessionData = (user: UserModel): UserSessionData => ({
  userId: user.id,
  isAdmin: user.role === 'ADMIN',
});
