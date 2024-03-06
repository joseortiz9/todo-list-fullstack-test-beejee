import { type PropsWithChildren } from 'react';

import { ThemeProvider } from '@/ui';

import { TRPCReactProvider } from './TRPCReactProvider';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </TRPCReactProvider>
  );
};
