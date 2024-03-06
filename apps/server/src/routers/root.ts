import { type inferRouterOutputs } from '@trpc/server';

import { createTRPCRouter } from '@/trpc';

import { authRouter, tasksRouter } from './resolvers';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  tasks: tasksRouter,
});

export type AppRouter = typeof appRouter;
export type RouterOutput = inferRouterOutputs<AppRouter>;
