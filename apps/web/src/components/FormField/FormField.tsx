import { forwardRef } from 'react';

import { FormControl, FormErrorMessage, FormLabel, Input, type InputProps } from '@/ui';

export type FormFieldProps = {
  id: string;
  label: string;
  errorText?: string;
} & Omit<InputProps, 'ref'>;

export const FormField = forwardRef<'input', FormFieldProps>((props, ref) => {
  const { id, label, errorText, ...inputProps } = props;
  return (
    <FormControl id={id} isInvalid={!!errorText}>
      <FormLabel>{label}</FormLabel>
      <Input ref={ref} {...inputProps} />
      <FormErrorMessage>{errorText}</FormErrorMessage>
    </FormControl>
  );
});
FormField.displayName = 'FormField';
