import { z } from 'zod';

import { userSessionData } from '@/sharedTypes';

export const loginInput = z.object({ username: z.string(), password: z.string() });

export const loginOutput = z.object({ session: userSessionData, token: z.string() });

export type LoginOutput = z.infer<typeof loginOutput>;
