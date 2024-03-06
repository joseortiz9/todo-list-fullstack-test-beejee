import { trpc } from '@/lib/trpc';
import { Flex, Text } from '@/ui';

export const Home = () => {
  // const { data } = trpc.auth.whoami.useQuery();

  return (
    <Flex minH="100%">
      <Text>Home</Text>
    </Flex>
  );
};
