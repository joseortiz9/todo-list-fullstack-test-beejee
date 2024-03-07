import { QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { type PropsWithChildren, useState } from 'react';

import { MODE } from '@/env';
import { useAuthSession } from '@/hooks';
import { queryClient } from '@/lib/query-client';
import { customLink, trpc } from '@/lib/trpc';

export const TRPCReactProvider = ({ children }: PropsWithChildren) => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        customLink,
        loggerLink({
          enabled: (op) =>
            (MODE === 'development' && typeof window !== 'undefined') ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        httpBatchLink({
          url: '/trpc',
          headers: () => {
            const sessionToken = useAuthSession.getState().token;
            return sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {};
          },
        }),
      ],
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </trpc.Provider>
    </QueryClientProvider>
  );
};
