import { allTasksInput, allTasksOutput, createTaskInput, editTaskInput, markTaskAsDoneInput } from '@/dtos/tasksDto';
import type { TasksService } from '@/interfaces/tasksService';
import { adminProcedure, createTRPCRouter, publicProcedure } from '@/trpc';

export const tasksRouter = (tasksService: TasksService) => {
  const create = () =>
    createTRPCRouter({
      all: publicProcedure
        .input(allTasksInput)
        .output(allTasksOutput)
        .query(async ({ input }) => {
          const { page, sortType, sortOrder } = input;
          return tasksService.getAll(page, sortType, sortOrder);
        }),
      create: publicProcedure.input(createTaskInput).mutation(async ({ ctx, input }) => {
        const currUserId = ctx.session?.userId;
        return tasksService.create(input, currUserId);
      }),
      edit: adminProcedure
        .input(editTaskInput)
        .mutation(async ({ input }) => tasksService.edit(input.id, input.content)),
      markAsDone: adminProcedure
        .input(markTaskAsDoneInput)
        .mutation(async ({ input }) => tasksService.markAsDone(input.id)),
    });

  return { create };
};
