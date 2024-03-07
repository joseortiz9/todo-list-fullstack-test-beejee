import { useNavigate } from '@tanstack/react-router';
import { type ChangeEvent, useMemo, useState } from 'react';

import { type OrderDirection, type TasksOrderBy } from '@/sharedTypes';

import type { SearchParamsSchema } from '@/utils/filtersHelper';

type UseAllTasksFiltersProps = {
  searchParams: SearchParamsSchema;
};

export const useAllTasksFilters = ({ searchParams }: UseAllTasksFiltersProps) => {
  const navigate = useNavigate<'/'>();
  const [params, setParams] = useState<SearchParamsSchema>(searchParams);

  const callbacks = useMemo(
    () => ({
      onChangeSortType: (event: ChangeEvent<HTMLSelectElement>) => {
        const value = (event.target.value as TasksOrderBy) || undefined;
        navigate({ search: (prev) => ({ ...prev, page: 1, sortType: value }) });
        setParams((prev) => ({ ...prev, page: 1, sortType: value }));
      },

      onChangeSortOrder: (event: ChangeEvent<HTMLSelectElement>) => {
        const value = (event.target.value as OrderDirection) || undefined;
        navigate({ search: (prev) => ({ ...prev, page: 1, sortOrder: value }) });
        setParams((prev) => ({ ...prev, page: 1, sortOrder: value }));
      },

      onPrevPageClick: () => {
        navigate({ search: (prev) => ({ ...prev, page: prev.page - 1 }) });
        setParams((prev) => ({ ...prev, page: prev.page - 1 }));
      },

      onNextPageClick: () => {
        navigate({ search: (prev) => ({ ...prev, page: prev.page + 1 }) });
        setParams((prev) => ({ ...prev, page: prev.page + 1 }));
      },
    }),
    [navigate],
  );

  return {
    page: params.page,
    sortType: params.sortType,
    sortOrder: params.sortOrder,
    ...callbacks,
  };
};
