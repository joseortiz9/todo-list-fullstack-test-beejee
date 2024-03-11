import { loginInput, loginOutput } from '@/dtos/authDto';
import { type AuthService } from '@/interfaces/authService';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/trpc';

export const authRouter = (authService: AuthService) => {
  const create = () =>
    createTRPCRouter({
      whoami: protectedProcedure.query(async ({ ctx }) => authService.whoami(ctx.session.userId)),
      login: publicProcedure
        .input(loginInput)
        .output(loginOutput)
        .mutation(async ({ ctx, input }) => {
          const { username, password } = input;
          const { session, token } = await authService.login(username, password);
          ctx.session = session;
          return {
            session,
            token,
          };
        }),
      logout: publicProcedure.mutation(({ ctx }) => {
        ctx.session = null;
        return { ok: true };
      }),
    });

  return { create };
};
