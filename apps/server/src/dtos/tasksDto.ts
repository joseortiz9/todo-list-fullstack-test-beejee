import { z } from 'zod';

import { createPaginatedSchema } from '@/helpers/createPaginatedSchema';
import { task, tasksOrderBy, tasksOrderDirection } from '@/sharedTypes';

export const createTaskInput = z.object({
  username: z.string(),
  email: z.string().email(),
  content: z.string(),
});
export type CreateTaskInput = z.infer<typeof createTaskInput>;

export const editTaskInput = z.object({
  id: z.number(),
  content: z.string(),
});

export const markTaskAsDoneInput = z.object({ id: z.number() });

export const allTasksOutput = createPaginatedSchema(task);

export type AllTasksOutput = z.infer<typeof allTasksOutput>;

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
