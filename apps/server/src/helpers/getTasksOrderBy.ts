import { OrderDirection, TasksOrderBy } from '@/sharedTypes';

export const getTasksOrderBy = (sortType: TasksOrderBy | undefined, sortOrder: OrderDirection | undefined) => {
  if (!sortType && !sortOrder) {
    return [{ [TasksOrderBy.CreatedAt]: OrderDirection.DESC }];
  }
  if (!sortType) {
    return [{ [TasksOrderBy.CreatedAt]: sortOrder }];
  }
  if (!sortOrder) {
    return [{ [sortType]: OrderDirection.DESC }];
  }
  return [{ [sortType]: sortOrder }];
};
