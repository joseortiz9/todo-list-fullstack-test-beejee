import { createFileRoute } from '@tanstack/react-router';

import { Home } from '@/features';
import { searchParamsValidator } from '@/utils/filtersHelper';

export const HomeRoute = () => {
  const params = Route.useSearch();
  return <Home searchParams={params} />;
};

export const Route = createFileRoute('/')({ validateSearch: searchParamsValidator, component: HomeRoute });
