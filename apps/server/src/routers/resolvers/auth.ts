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
      logout: protectedProcedure.mutation(({ ctx }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ctx.session = null;
        return { ok: true };
      }),
    });

  return { create };
};
