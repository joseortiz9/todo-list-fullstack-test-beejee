import { Button, Flex, Stack, Text } from '@/ui';

import { CardContainer } from '@/components/CardContainer';
import { CreateTaskModal } from '@/components/CreateTaskModal';
import { TasksTable, TasksTableControls } from '@/components/TasksTable';
import { useAllTasksFilters, useModal } from '@/hooks';
import { trpc } from '@/lib/trpc';
import { type SearchParamsSchema } from '@/utils/filtersHelper';

type HomeProps = {
  searchParams: SearchParamsSchema;
};

export const Home = ({ searchParams }: HomeProps) => {
  const { openModal } = useModal();
  const { page, sortType, sortOrder, onChangeSortType, onChangeSortOrder, onPrevPageClick, onNextPageClick } =
    useAllTasksFilters({ searchParams });
  const { data } = trpc.tasks.all.useQuery({ page, sortType, sortOrder });

  const handleCreateTask = () => {
    openModal(CreateTaskModal, {});
  };

  return (
    <>
      <CardContainer minW={{ base: 'full', xl: '4xl' }}>
        <Stack w="full" mb={4} direction={{ base: 'column', lg: 'row' }} justifyContent={{ lg: 'space-between' }}>
          <Flex alignItems="center" gap={4} justifyContent={{ base: 'space-between', lg: 'flex-start' }}>
            <Text fontWeight="700" fontSize="xl">
              ToDo List
            </Text>
            <Button onClick={handleCreateTask}>+ Add</Button>
          </Flex>
          <TasksTableControls
            sortType={sortType}
            sortOrder={sortOrder}
            onChangeSortOrder={onChangeSortOrder}
            onChangeSortType={onChangeSortType}
            currentPage={data?.meta.currentPage}
            totalPages={data?.meta.lastPage}
            onPrevPage={data?.meta.prev ? onPrevPageClick : undefined}
            onNextPage={data?.meta.next ? onNextPageClick : undefined}
          />
        </Stack>
        <TasksTable data={data?.data || []} />
      </CardContainer>
    </>
  );
};
