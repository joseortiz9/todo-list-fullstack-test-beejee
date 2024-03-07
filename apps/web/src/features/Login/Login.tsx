import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { type ZodType, z } from 'zod';

import { Button, Stack } from '@/ui';

import { CardContainer } from '@/components/CardContainer';
import { FormFieldControl } from '@/components/FormField';
import { useAuthSession, useToast } from '@/hooks';
import { trpc } from '@/lib/trpc';

type FormValues = {
  username: string;
  password: string;
};

export const Login = () => {
  const { setSession } = useAuthSession();
  const toast = useToast();
  const navigate = useNavigate();
  const { mutate, isLoading } = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      setSession(data.session, data.token);
      toast.success({ title: 'Login successful' });
      navigate({ to: '/', search: { page: 1 } });
    },
    onError: (error) => {
      toast.error({ title: error.message });
    },
  });

  const schema: ZodType<FormValues> = useMemo(
    () =>
      z.object({
        username: z.string().min(3),
        password: z.string().min(3),
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
    <CardContainer minW={{ base: 'full', sm: 'lg' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormFieldControl name="username" control={control} label="Username" type="text" />
          <FormFieldControl name="password" control={control} label="Password" type="password" />
          <Button type="submit" isLoading={isLoading}>
            Sign in
          </Button>
        </Stack>
      </form>
    </CardContainer>
  );
};
