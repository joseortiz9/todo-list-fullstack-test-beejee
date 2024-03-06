import { type inferRouterOutputs } from '@trpc/server';

import { createTRPCRouter } from '@/trpc';

import { authRouter } from './resolvers';

export const appRouter = createTRPCRouter({ auth: authRouter });

export type AppRouter = typeof appRouter;
export type RouterOutput = inferRouterOutputs<AppRouter>;
