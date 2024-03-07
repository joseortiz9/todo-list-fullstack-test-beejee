import { z } from 'zod';

const userSessionData = z.object({
  userId: z.number(),
  isAdmin: z.boolean(),
});

export const loginInput = z.object({ username: z.string(), password: z.string() });

export const loginOutput = z.object({ session: userSessionData, token: z.string() });

export type LoginInput = z.infer<typeof loginInput>;

export type UserSessionData = z.infer<typeof userSessionData>;
