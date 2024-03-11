import { z } from 'zod';

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
