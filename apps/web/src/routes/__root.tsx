import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

import type { UserSessionData } from '@/sharedTypes';

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

type RootRouteContext = {
  session: UserSessionData | null;
};

export const Route = createRootRouteWithContext<RootRouteContext>()({ component: RootComponent });
