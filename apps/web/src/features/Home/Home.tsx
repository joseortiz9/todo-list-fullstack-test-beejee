import { Button, HStack, Text, useDisclosure } from '@/ui';

import { CardContainer } from '@/components/CardContainer';
import { CreateTaskModal } from '@/components/CreateTaskModal';
import { TasksTable } from '@/components/TasksTable';

export const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <CardContainer minW={{ base: 'full', xl: '4xl' }}>
        <HStack mb={4} justifyContent="space-between" w="full">
          <Text fontWeight="700" fontSize="xl">
            ToDo List
          </Text>
          <Button onClick={onOpen}>+ Add</Button>
        </HStack>
        <TasksTable />
      </CardContainer>
      <CreateTaskModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
