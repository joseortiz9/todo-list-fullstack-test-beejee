import type { UserSessionData } from '@todo-list-fullstack-test/shared-ts';

import { JwtHelper } from '@/helpers/jwtHelper';

export const tokenToSessionData = (sessionToken?: string): UserSessionData | null => {
  if (!sessionToken) {
    return null;
  }
  try {
    const decoded = JwtHelper.parseToken<UserSessionData>(sessionToken);
    if (!decoded) {
      return null;
    }
    return decoded;
  } catch (e) {
    console.error('Error parsing session by JWT', e);
    return null;
  }
};
