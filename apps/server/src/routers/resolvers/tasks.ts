import { createTaskInput, editTaskInput, markTaskAsDoneInput } from '@/sharedTypes';
import { adminProcedure, createTRPCRouter, publicProcedure } from '@/trpc';

export const tasksRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.task.findMany();
  }),
  create: publicProcedure.input(createTaskInput).mutation(async ({ ctx, input }) => {
    const currUserId = ctx.session?.userId || null;
    const task = await ctx.db.task.create({
      data: {
        ...input,
        authorId: currUserId,
      },
    });
    return {
      ok: true,
      task,
    };
  }),
  edit: adminProcedure.input(editTaskInput).mutation(async ({ ctx, input }) => {
    console.log('input', input);
  }),
  markAsDone: adminProcedure.input(markTaskAsDoneInput).mutation(async ({ ctx, input }) => {
    console.log('input', input);
  }),
});
