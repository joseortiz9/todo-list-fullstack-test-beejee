import { createFileRoute } from '@tanstack/react-router';

import { Login } from '@/features';

export const LoginRoute = () => {
  return <Login />;
};

export const Route = createFileRoute('/login')({ component: LoginRoute });
