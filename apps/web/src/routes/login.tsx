import { createFileRoute, redirect } from '@tanstack/react-router';

import { Login } from '@/features';

export const LoginRoute = () => {
  return <Login />;
};

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.session) {
      throw redirect({ to: '/', search: { page: 1 } });
    }
  },
  component: LoginRoute,
});
