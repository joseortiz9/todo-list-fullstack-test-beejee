import { RouterProvider, createRouter } from '@tanstack/react-router';

import { useAuthSession, useAuthSessionRefresher } from '@/hooks';

import { Providers } from './providers';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  context: { session: null },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

const Router = () => {
  useAuthSessionRefresher();
  const session = useAuthSession((state) => state.session);

  return <RouterProvider router={router} context={{ session }} />;
};

export const App = () => (
  <Providers>
    <Router />
  </Providers>
);

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
