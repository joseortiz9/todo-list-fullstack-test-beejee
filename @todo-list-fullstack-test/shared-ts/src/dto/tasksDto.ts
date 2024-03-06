import { z } from 'zod'

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
