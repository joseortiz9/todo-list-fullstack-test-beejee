import { ChakraProvider, type ThemeConfig, extendTheme } from '@chakra-ui/react';
import { type PropsWithChildren } from 'react';

export * from '@chakra-ui/react';
export * from '@chakra-ui/icons';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export const ThemeProvider = (props: PropsWithChildren) => <ChakraProvider theme={theme} {...props} />;
