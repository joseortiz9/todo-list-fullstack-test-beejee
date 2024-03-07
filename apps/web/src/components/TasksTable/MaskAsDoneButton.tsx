import { Button, type ButtonProps, CheckIcon, Tooltip } from '@/ui';

import { type Task } from '@/sharedTypes';

import { useToast } from '@/hooks';
import { trpc, useTRPCContext } from '@/lib/trpc';

type MaskAsDoneButtonProps = Omit<ButtonProps, 'onClick' | 'isLoading'> & {
  task: Task;
};

export const MaskAsDoneButton = ({ task, ...buttonProps }: MaskAsDoneButtonProps) => {
  const utils = useTRPCContext();
  const toast = useToast();
  const { mutate, isLoading } = trpc.tasks.markAsDone.useMutation({
    onSuccess: async () => {
      await utils.tasks.all.invalidate();
      toast.success({ title: 'Task marked as Completed' });
    },
    onError: (error) => {
      toast.error({ title: 'Failed to update', description: error.message });
    },
  });

  return (
    <Tooltip label={task.completed ? 'Task was completed' : 'Mark as done'} hasArrow>
      <Button
        isDisabled={task.completed}
        isLoading={isLoading}
        onClick={() => mutate({ id: task.id })}
        {...buttonProps}
      >
        <CheckIcon />
      </Button>
    </Tooltip>
  );
};
