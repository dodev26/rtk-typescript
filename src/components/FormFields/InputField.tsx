import { TextField } from '@material-ui/core';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';
export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
}
export const InputField = ({
  name,
  control,
  label,
  disabled = false,
  ...inputProps
}: InputFieldProps) => {
  const {
    field: { ref, ...field },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      {...field}
      id={name}
      name={name}
      disabled={disabled}
      fullWidth
      margin="normal"
      label={label}
      variant="outlined"
      inputProps={inputProps}
      inputRef={ref}
      helperText={error?.message}
      error={invalid}
    />
  );
};
