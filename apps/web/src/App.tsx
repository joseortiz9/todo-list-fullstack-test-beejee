import { RouterProvider, createRouter } from '@tanstack/react-router';

import { Providers } from './providers';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

export const App = () => (
  <Providers>
    <RouterProvider router={router} />
  </Providers>
);

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
