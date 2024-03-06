import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { z } from 'zod';

import { JwtService } from '@/services';
import { loginInput } from '@/sharedTypes';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/trpc';

export const authRouter = createTRPCRouter({
  whoami: protectedProcedure.output(z.object({})).query(async ({ ctx }) => {
    return ctx.db.user.findUnique({ where: { id: ctx.session.userId } });
  }),
  login: publicProcedure.input(loginInput).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({ where: { username: input.username } });
    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Invalid email or password',
      });
    }
    try {
      const match = await bcrypt.compare(input.password, user.password);
      if (!match) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Invalid email or password',
        });
      }
      const session = {
        userId: user.id,
        isAdmin: user.role === 'ADMIN',
      };
      const token = await JwtService.generateToken(session);

      ctx.session = session;

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
  }),
  logout: protectedProcedure.mutation(({ ctx }) => {
    // TODO: Fix this ts error
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    ctx.session = null;
    return { ok: true };
  }),
});
