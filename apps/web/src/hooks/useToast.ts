import { useCallback, useMemo } from 'react';

import { type UseToastOptions, useToast as useToastChakra } from '@/ui';

type UseToastProps = { title: string; description?: string; options?: UseToastOptions };

export const useToast = () => {
  const toast = useToastChakra();

  const success = useCallback(
    ({ title, description, options }: UseToastProps) =>
      toast({
        title,
        description,
        status: 'success',
        isClosable: true,
        duration: 3000,
        ...options,
      }),
    [toast],
  );
  const error = useCallback(
    ({ title, description, options }: UseToastProps) =>
      toast({
        title,
        description,
        status: 'error',
        isClosable: true,
        duration: 3000,
        ...options,
      }),
    [toast],
  );

  return useMemo(
    () => ({
      success,
      error,
    }),
    [error, success],
  );
};
