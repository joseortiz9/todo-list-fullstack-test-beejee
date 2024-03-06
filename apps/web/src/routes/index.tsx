import { createFileRoute } from '@tanstack/react-router';

import { Home } from '@/features';

export const HomeRoute = () => {
  return <Home />;
};

export const Route = createFileRoute('/')({ component: HomeRoute });
