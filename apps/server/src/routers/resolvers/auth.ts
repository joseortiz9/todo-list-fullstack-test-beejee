import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/trpc';

export const authRouter = createTRPCRouter({
  whoami: protectedProcedure.output(z.object({})).query(async ({ ctx }) => {
    return ctx.db.user.findUnique({ where: { id: ctx.session.userId } });
  }),
});
