import styled from 'styled-components';

import { trpc } from '@/trpc';
import { Label } from '@/ui/index';

export const Home = () => {
  const { data } = trpc.auth.whoami.useQuery();

  return (
    <HomeContainer>
      <Label>Current role: {data?.id}</Label>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to right, #434343, #000000);
`;
