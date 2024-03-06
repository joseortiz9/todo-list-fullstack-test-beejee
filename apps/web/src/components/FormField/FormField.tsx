import { FormControl, FormErrorMessage, FormLabel, Input, type InputProps } from '@/ui';

export type FormFieldProps = {
  id: string;
  label: string;
  errorText?: string;
} & InputProps;

export const FormField = ({ id, label, errorText, ...inputProps }: FormFieldProps) => {
  return (
    <FormControl id={id} isInvalid={!!errorText}>
      <FormLabel>{label}</FormLabel>
      <Input {...inputProps} />
      <FormErrorMessage>{errorText}</FormErrorMessage>
    </FormControl>
  );
};
