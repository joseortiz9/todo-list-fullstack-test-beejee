import { createTRPCProxyClient, httpLink } from '@trpc/client';

import { type AppRouter } from '@/routers/root';
import { HttpService } from '@/services';

export const client = createTRPCProxyClient<AppRouter>({
  // Recommendation by the TRPC team, but there is a bug in this library
  // with ES modules exports, https://github.com/blitz-js/superjson/issues/268
  // transformer: superjson,
  links: [httpLink({ url: `${HttpService.serverUrl}/trpc` })],
});
