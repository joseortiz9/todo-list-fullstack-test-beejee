import { QueryClientProvider } from '@tanstack/react-query';
import { httpLink } from '@trpc/client/links/httpLink';
import { type PropsWithChildren, useState } from 'react';

import { queryClient } from '@/lib/query-client';
import { trpc } from '@/lib/trpc';

export const TRPCReactProvider = ({ children }: PropsWithChildren) => {
  const [trpcClient] = useState(() => trpc.createClient({ links: [httpLink({ url: '/trpc' })] }));
  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </trpc.Provider>
    </QueryClientProvider>
  );
};
