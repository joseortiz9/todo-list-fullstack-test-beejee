import { type PropsWithChildren } from 'react';

import { Container, Flex } from '@/ui';

import { Header } from '@/components/Header';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex flexDir="column" minH="full">
      <Header />
      <Flex flex={1} py={10} h="full" flexDir="column" as="main">
        <Container centerContent maxW="5xl">
          {children}
        </Container>
      </Flex>
    </Flex>
  );
};
