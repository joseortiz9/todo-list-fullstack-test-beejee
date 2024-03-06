import { createTRPCProxyClient, httpLink } from '@trpc/client';
import superjson from 'superjson';

import { type AppRouter } from '@/routers/_app';
import { HttpService } from '@/services';

export const client = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [httpLink({ url: `${HttpService.serverUrl}/trpc` })],
});
