import { type PropsWithChildren } from 'react';

import { ThemeProvider } from '@/ui';

import { ModalContextProvider } from './ModalContext';
import { TRPCReactProvider } from './TRPCReactProvider';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider>
        <ModalContextProvider>{children}</ModalContextProvider>
      </ThemeProvider>
    </TRPCReactProvider>
  );
};
