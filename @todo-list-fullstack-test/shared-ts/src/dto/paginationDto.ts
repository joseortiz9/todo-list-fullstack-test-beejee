import { z } from 'zod'

export const createPaginatedSchema = <ItemType extends z.ZodTypeAny>(itemSchema: ItemType) => z.object({
  data: z.array(itemSchema),
  meta: z.object({
    total: z.number(),
    lastPage: z.number(),
    currentPage: z.number(),
    limit: z.number(),
    prev: z.number().nullable(),
    next: z.number().nullable(),
  }),
});
