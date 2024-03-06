import { Outlet, RootRoute, Route, Router, RouterProvider } from '@tanstack/router';
import styled from 'styled-components';

import { Home } from '@/components/features';
import { GlobalStyle } from '@/styles';
import { Label } from '@/ui/Label';

const rootRoute = new RootRoute({ component: () => <Outlet /> });

const home = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const routeTree = rootRoute.addChildren([home]);

const router = new Router({ routeTree });

window.navigate = router.navigate;

export const App = () => (
  <AppContainer>
    <GlobalStyle />
    <Label>LABEL</Label>
    <RouterProvider router={router} />
  </AppContainer>
);

const AppContainer = styled.div`
  height: 100%;
`;

declare global {
  interface Window {
    navigate: typeof router.navigate;
  }
}

declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}
