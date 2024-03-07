import {
  OrderDirection,
  TasksOrderBy,
  allTasksInput,
  allTasksOutput,
  createTaskInput,
  editTaskInput,
  markTaskAsDoneInput,
} from '@/sharedTypes';
import { adminProcedure, createTRPCRouter, publicProcedure } from '@/trpc';

const TASKS_LIMIT = 3;

const getTasksOrderBy = (sortType: TasksOrderBy | undefined, sortOrder: OrderDirection | undefined) => {
  if (!sortType && !sortOrder) {
    return [{ [TasksOrderBy.CreatedAt]: OrderDirection.ASC }];
  }
  if (!sortType) {
    return [{ [TasksOrderBy.CreatedAt]: sortOrder }];
  }
  if (!sortOrder) {
    return [{ [sortType]: OrderDirection.ASC }];
  }
  return [{ [sortType]: sortOrder }];
};

export const tasksRouter = createTRPCRouter({
  all: publicProcedure
    .input(allTasksInput)
    .output(allTasksOutput)
    .query(async ({ ctx, input }) => {
      const { page, sortType, sortOrder } = input;
      const skip = (page - 1) * TASKS_LIMIT;
      const orderBy = getTasksOrderBy(sortType, sortOrder);
      const [total, data] = await Promise.all([
        ctx.db.task.count(),
        ctx.db.task.findMany({
          take: TASKS_LIMIT,
          skip,
          orderBy,
        }),
      ]);
      const lastPage = Math.ceil(total / TASKS_LIMIT);

      return {
        data,
        meta: {
          total,
          lastPage,
          currentPage: page,
          limit: TASKS_LIMIT,
          prev: page > 1 ? page - 1 : null,
          next: page < lastPage ? page + 1 : null,
        },
      };
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
    const task = await ctx.db.task.update({
      where: { id: input.id },
      data: {
        content: input.content,
        updated: true,
      },
    });
    return {
      ok: true,
      task,
    };
  }),
  markAsDone: adminProcedure.input(markTaskAsDoneInput).mutation(async ({ ctx, input }) => {
    const task = await ctx.db.task.update({
      where: { id: input.id },
      data: { completed: true },
    });
    return {
      ok: true,
      task,
    };
  }),
});
