import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

import { MainLayout } from '@/layouts';

const RootComponent = () => {
  return (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
};

export const Route = createRootRouteWithContext<object>()({ component: RootComponent });
