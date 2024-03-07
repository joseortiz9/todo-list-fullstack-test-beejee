import { Button, Flex, HStack, Select, Text } from '@/ui';

import { CardContainer } from '@/components/CardContainer';
import { CreateTaskModal } from '@/components/CreateTaskModal';
import { TasksTable } from '@/components/TasksTable';
import { useAllTasksFilters, useModal } from '@/hooks';
import { trpc } from '@/lib/trpc';
import { type SearchParamsSchema, sortingDirectionItems, sortingItems } from '@/utils/filtersHelper';

type HomeProps = {
  searchParams: SearchParamsSchema;
};

export const Home = ({ searchParams }: HomeProps) => {
  const { openModal } = useModal();

  const { sortType, sortOrder, onChangeSortType, onChangeSortOrder } = useAllTasksFilters({ searchParams });
  const { data } = trpc.tasks.all.useQuery({ sortType, sortOrder });

  return (
    <>
      <CardContainer minW={{ base: 'full', xl: '4xl' }}>
        <HStack mb={4} justifyContent="space-between" w="full">
          <Flex alignItems="center" gap={4}>
            <Text fontWeight="700" fontSize="xl">
              ToDo List
            </Text>
            <Button onClick={() => openModal(CreateTaskModal, {})}>+ Add</Button>
          </Flex>
          <Flex gap={4}>
            <Select placeholder="Sort By" value={sortType} onChange={onChangeSortType}>
              {sortingItems.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
            <Select placeholder="Sort Order" value={sortOrder} onChange={onChangeSortOrder}>
              {sortingDirectionItems.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
          </Flex>
        </HStack>
        <TasksTable data={data?.data || []} />
      </CardContainer>
    </>
  );
};
