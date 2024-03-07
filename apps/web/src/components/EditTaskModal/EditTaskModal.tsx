import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { type ZodType, z } from 'zod';

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@/ui';

import { type Task } from '@/sharedTypes';

import { FormFieldControl } from '@/components/FormField';
import { useToast } from '@/hooks';
import { trpc, useTRPCContext } from '@/lib/trpc';

type EditTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
};

type FormValues = {
  content: string;
};

export const EditTaskModal = ({ isOpen, onClose, task }: EditTaskModalProps) => {
  const utils = useTRPCContext();
  const toast = useToast();
  const { mutate, isLoading } = trpc.tasks.edit.useMutation({
    onSuccess: async () => {
      await utils.tasks.all.invalidate();
      toast.success({ title: 'Task updated' });
      onClose();
    },
    onError: (error) => {
      toast.error({ title: 'Failed to update', description: error.message });
    },
  });

  const schema: ZodType<FormValues> = useMemo(() => z.object({ content: z.string().min(3) }), []);

  const { handleSubmit, control } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: { content: task.content },
  });

  const onSubmit = (values: FormValues) => {
    mutate({ id: task.id, content: values.content });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormFieldControl name="content" control={control} label="Content" type="text" />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" isLoading={isLoading}>
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
