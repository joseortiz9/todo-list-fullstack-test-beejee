import { useNavigate } from '@tanstack/react-router';
import { type ChangeEvent, useCallback, useState } from 'react';

import { type OrderDirection, type TasksOrderBy } from '@/sharedTypes';

import type { SearchParamsSchema } from '@/utils/filtersHelper';

type UseAllTasksFiltersProps = {
  searchParams: SearchParamsSchema;
};

export const useAllTasksFilters = ({ searchParams }: UseAllTasksFiltersProps) => {
  const navigate = useNavigate<'/'>();
  const [page, setPage] = useState(searchParams.page);
  const [sortType, setSortType] = useState(searchParams.sortType);
  const [sortOrder, setSortOrder] = useState(searchParams.sortOrder);

  const onChangeSortType = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value = (event.target.value as TasksOrderBy) || undefined;
      navigate({ search: (prev) => ({ ...prev, page: 1, sortType: value }) });
      setSortType(value);
      setPage(1);
    },
    [navigate],
  );

  const onChangeSortOrder = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value = (event.target.value as OrderDirection) || undefined;
      navigate({ search: (prev) => ({ ...prev, page: 1, sortOrder: value }) });
      setSortOrder(value);
      setPage(1);
    },
    [navigate],
  );

  return {
    sortType,
    sortOrder,
    onChangeSortType,
    onChangeSortOrder,
  };
};
