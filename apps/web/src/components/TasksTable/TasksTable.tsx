import moment from 'moment';

import { Button, EditIcon, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@/ui';

import { type Task } from '@/sharedTypes';

import { EditTaskModal } from '@/components/EditTaskModal';
import { useIsAdmin, useModal } from '@/hooks';

import { MaskAsDoneButton } from './MaskAsDoneButton';

type TasksTableProps = {
  data: Task[];
};

export const TasksTable = ({ data }: TasksTableProps) => {
  const isAdmin = useIsAdmin();
  const { openModal } = useModal();

  const handleEdit = (task: Task) => {
    openModal(EditTaskModal, { task });
  };

  return (
    <TableContainer>
      <Table variant="simple" sx={{ '& td': { whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: 'sm' } }}>
        <Thead>
          <Tr>
            {isAdmin && <Th>Actions</Th>}
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Content</Th>
            <Th>Updated</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((task) => (
            <Tr opacity={task.completed ? 0.5 : 1} key={task.id}>
              {isAdmin && (
                <Td maxW="80px">
                  <Flex gap={2}>
                    <Button size="sm" onClick={() => handleEdit(task)}>
                      <EditIcon />
                    </Button>
                    <MaskAsDoneButton size="sm" task={task} />
                  </Flex>
                </Td>
              )}
              <Td w="10%">{task.username}</Td>
              <Td w="20%">{task.email}</Td>
              <Td maxW="200px" minW="50%">
                {task.content}
              </Td>
              <Td w="15%">{task.updated ? `Updated by admin ${moment(task.updatedAt).fromNow()}.` : 'Not Updated.'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
