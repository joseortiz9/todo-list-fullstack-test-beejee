import { TRPCError, initTRPC } from '@trpc/server';
import { ZodError } from 'zod';

import type { Context } from './context';

const t = initTRPC.context<Context>().create({
  // Recommendation by the TRPC team, but there is a bug in this library
  // with ES modules exports, https://github.com/blitz-js/superjson/issues/268
  // transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
});

const isAuth = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});

const isAdmin = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.isAdmin) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = publicProcedure.use(isAuth);
export const adminProcedure = publicProcedure.use(isAdmin);
