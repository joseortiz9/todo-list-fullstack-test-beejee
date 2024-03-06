import { QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import { useTrpc } from '@/hooks';
import { theme } from '@/styles';
import '@/styles/index.scss';
import { trpc } from '@/trpc';

export const Providers = ({ children }: PropsWithChildren) => {
  const { trpcQueryClient, trpcClient } = useTrpc();

  return (
    <trpc.Provider client={trpcClient} queryClient={trpcQueryClient}>
      <QueryClientProvider client={trpcQueryClient}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};
