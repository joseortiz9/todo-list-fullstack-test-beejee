import { type Control, Controller, type FieldPath, type FieldValues } from 'react-hook-form';

import { FormField, type FormFieldProps } from './FormField';

type FormFieldControlProps<T extends FieldValues> = Omit<FormFieldProps, 'id' | 'selected' | 'onChange'> & {
  name: FieldPath<T>;
  control: Control<T>;
};

export const FormFieldControl = <T extends FieldValues>({ name, control, ...inputProps }: FormFieldControlProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormField {...field} id={name} errorText={error?.message} {...inputProps} />
      )}
    />
  );
};
