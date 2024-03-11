import { z } from 'zod';

export const userSessionData = z.object({
  userId: z.number(),
  isAdmin: z.boolean(),
});

export type UserSessionData = z.infer<typeof userSessionData>;
