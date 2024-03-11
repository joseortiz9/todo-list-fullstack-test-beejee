import { type SuccessResDto } from '@/dtos/successResDto';
import { type AllTasksOutput, type CreateTaskInput } from '@/dtos/tasksDto';
import { type OrderDirection, type Task, type TasksOrderBy } from '@/sharedTypes';

export interface TasksService {
  getAll: (
    page: number,
    sortType: TasksOrderBy | undefined,
    sortOrder: OrderDirection | undefined,
  ) => Promise<AllTasksOutput>;
  create: (taskInput: CreateTaskInput, currSessionId?: number) => Promise<SuccessResDto<Task>>;
  edit: (id: number, content: string) => Promise<SuccessResDto<Task>>;
  markAsDone: (id: number) => Promise<SuccessResDto<Task>>;
}
