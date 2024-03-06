import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { type PropsWithChildren } from 'react';

export * from '@chakra-ui/react';

const theme = extendTheme({});

export const ThemeProvider = (props: PropsWithChildren) => <ChakraProvider theme={theme} {...props} />;
