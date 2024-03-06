import { Link } from '@tanstack/react-router';
import { type PropsWithChildren } from 'react';

import { useAuthSession, useToast } from '@/hooks';
import { trpc } from '@/lib/trpc';
import { Box, Button, Container, Flex, HStack, Text, useColorMode, useColorModeValue } from '@/ui';

const Header = () => {
  const { logout } = useAuthSession();
  const hasActiveSession = useAuthSession((state) => !!state.session);
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const { mutate: mutateLogout } = trpc.auth.logout.useMutation({
    onSuccess: () => {
      logout();
    },
    onError: (error) => {
      toast.error({
        title: 'Failed to logout',
        description: error.message,
      });
    },
  });
  return (
    <Box as="header" position="sticky" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Container centerContent maxW="5xl" py={4}>
        <HStack w="full" justifyContent="space-between">
          <Text fontWeight="700">ToDo List Test</Text>
          <HStack spacing={3}>
            <Button onClick={toggleColorMode}>{colorMode === 'light' ? 'D' : 'L'}</Button>
            <Link to="/">
              <Button>Home</Button>
            </Link>
            {hasActiveSession ? (
              <Button onClick={() => mutateLogout()}>Logout</Button>
            ) : (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )}
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex flexDir="column" minH="full">
      <Header />
      <Flex flex={1} flexDir="column" as="main">
        <Container mt={10} centerContent maxW="5xl">
          {children}
        </Container>
      </Flex>
    </Flex>
  );
};
