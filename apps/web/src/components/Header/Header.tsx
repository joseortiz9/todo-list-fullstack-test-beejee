import { Link } from '@tanstack/react-router';

import { Box, Button, Container, HStack, MoonIcon, SunIcon, Text, useColorMode, useColorModeValue } from '@/ui';

import { useAuthSession, useToast } from '@/hooks';
import { trpc } from '@/lib/trpc';

export const Header = () => {
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
    <Box as="header" position="sticky" boxShadow="lg" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Container centerContent maxW="5xl" py={4}>
        <HStack w="full" justifyContent="space-between">
          <Text fontWeight="700">ToDo List Test</Text>
          <HStack spacing={3}>
            <Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
            <Link to="/" search={{ page: 1 }}>
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
