import { type inferRouterOutputs } from '@trpc/server';

import { authServiceImpl, tasksServiceImpl } from '@/services';
import { createTRPCRouter } from '@/trpc';

import { authRouter, tasksRouter } from './resolvers';

export const appRouter = () => {
  const create = () => {
    const auth = authRouter(authServiceImpl()).create();
    const tasks = tasksRouter(tasksServiceImpl()).create();
    return createTRPCRouter({
      auth,
      tasks,
    });
  };
  return { create };
};

export type AppRouter = ReturnType<ReturnType<typeof appRouter>['create']>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
