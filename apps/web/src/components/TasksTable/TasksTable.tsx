import { Button, CheckIcon, EditIcon, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@/ui';

import { useIsAdmin } from '@/hooks';
import { trpc } from '@/lib/trpc';

export const TasksTable = () => {
  const isAdmin = useIsAdmin();
  const { data } = trpc.tasks.all.useQuery();
  return (
    <TableContainer>
      <Table variant="simple" sx={{ '& td': { whiteSpace: 'pre-wrap', wordBreak: 'break-word' } }}>
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Content</Th>
            {isAdmin && <Th>Actions</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((task) => (
            <Tr key={task.id}>
              <Td w="20%">{task.username}</Td>
              <Td w="30%">{task.email}</Td>
              <Td maxW="200px" minW="50%">
                {task.content}
              </Td>
              {isAdmin && (
                <Td maxW="80px">
                  <Flex gap={2}>
                    <Button>
                      <EditIcon />
                    </Button>
                    <Button>
                      <CheckIcon />
                    </Button>
                  </Flex>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
