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

import { FormFieldControl } from '@/components/FormField';
import { useToast } from '@/hooks';
import { trpc, useTRPCContext } from '@/lib/trpc';

type CreateTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = {
  username: string;
  email: string;
  content: string;
};

export const CreateTaskModal = ({ isOpen, onClose }: CreateTaskModalProps) => {
  const utils = useTRPCContext();
  const toast = useToast();
  const { mutate, isLoading } = trpc.tasks.create.useMutation({
    onSuccess: async () => {
      await utils.tasks.all.invalidate();
      toast.success({ title: 'Task created' });
      onClose();
    },
    onError: (error) => {
      toast.error({ title: 'Failed to create', description: error.message });
    },
  });

  const schema: ZodType<FormValues> = useMemo(
    () =>
      z.object({
        username: z.string().min(3),
        email: z.string().email(),
        content: z.string().min(3),
      }),
    [],
  );

  const { handleSubmit, control } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: FormValues) => {
    mutate(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormFieldControl name="username" control={control} label="username" type="text" />
              <FormFieldControl name="email" control={control} label="Email" type="email" />
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
