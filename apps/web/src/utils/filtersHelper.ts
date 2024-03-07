import { z } from 'zod';

import { OrderDirection, TasksOrderBy, tasksOrderBy, tasksOrderDirection } from '@/sharedTypes';

export const sortingItems = [
  { value: TasksOrderBy.Username, label: 'Username' },
  { value: TasksOrderBy.Email, label: 'Email' },
  { value: TasksOrderBy.Status, label: 'Status' },
];

export const sortingDirectionItems = [
  { value: OrderDirection.ASC, label: 'ASC' },
  { value: OrderDirection.DESC, label: 'DESC' },
];

const searchParamsSchema = z.object({
  page: z.number().catch(1),
  sortType: tasksOrderBy.optional().catch(undefined),
  sortOrder: tasksOrderDirection.optional().catch(undefined),
});
export type SearchParamsSchema = z.infer<typeof searchParamsSchema>;

export const searchParamsValidator = (searchParams: Record<string, string>) => searchParamsSchema.parse(searchParams);
