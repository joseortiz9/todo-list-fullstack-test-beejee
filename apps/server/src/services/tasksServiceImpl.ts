import { db } from '@/db';
import { type CreateTaskInput } from '@/dtos/tasksDto';
import { getTasksOrderBy } from '@/helpers/getTasksOrderBy';
import { type TasksService } from '@/interfaces/tasksService';
import { type OrderDirection, type TasksOrderBy } from '@/sharedTypes';

const TASKS_LIMIT = 3;

export const tasksServiceImpl = (): TasksService => {
  const getAll = async (page: number, sortType: TasksOrderBy | undefined, sortOrder: OrderDirection | undefined) => {
    const skip = (page - 1) * TASKS_LIMIT;
    const orderBy = getTasksOrderBy(sortType, sortOrder);
    const [total, data] = await Promise.all([
      db.task.count(),
      db.task.findMany({
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
  };
  const create = async (input: CreateTaskInput, authorId: number | undefined) => {
    const task = await db.task.create({
      data: {
        ...input,
        authorId,
      },
    });
    return {
      ok: true,
      data: task,
    };
  };
  const edit = async (id: number, content: string) => {
    const task = await db.task.update({
      where: { id },
      data: {
        content,
        updated: true,
      },
    });
    return {
      ok: true,
      data: task,
    };
  };
  const markAsDone = async (id: number) => {
    const task = await db.task.update({
      where: { id },
      data: { completed: true },
    });
    return {
      ok: true,
      data: task,
    };
  };

  return {
    getAll,
    create,
    edit,
    markAsDone,
  };
};
