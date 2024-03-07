import { z } from 'zod';

import { createPaginatedSchema } from './paginationDto';

export const task = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  content: z.string(),
  completed: z.boolean(),
  updated: z.boolean(),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
});

export type Task = z.infer<typeof task>;

export const createTaskInput = z.object({
  username: z.string(),
  email: z.string().email(),
  content: z.string(),
});

export const editTaskInput = z.object({
  id: z.number(),
  content: z.string(),
});

export const markTaskAsDoneInput = z.object({ id: z.number() });

export const allTasksOutput = createPaginatedSchema(task);

export enum TasksOrderBy {
  Username = 'username',
  Email = 'email',
  Status = 'completed',
  CreatedAt = 'createdAt',
}

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export const tasksOrderBy = z.nativeEnum(TasksOrderBy);
export const tasksOrderDirection = z.nativeEnum(OrderDirection);

export const allTasksInput = z.intersection(
  z.object({ page: z.number().default(1).catch(1) }),
  z
    .object({
      sortType: tasksOrderBy.optional(),
      sortOrder: tasksOrderDirection.optional(),
    })
    .partial(),
);

export type AllTasksInput = z.infer<typeof allTasksInput>;
