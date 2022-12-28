import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';
export interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: [
    {
      label: string;
      value: any;
    }
  ];
}
export const SelectField = ({
  name,
  control,
  label,
  disabled,
  options,
  ...inputProps
}: SelectFieldProps) => {
  const {
    field,
    fieldState: { invalid, isTouched, error, isDirty },
  } = useController({
    name,
    control,
  });
  console.log(invalid);
  return (
    <FormControl
      fullWidth
      variant="outlined"
      margin="normal"
      size="small"
      disabled={disabled}
      error={invalid}
    >
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        {...field}
        labelId={`${name}_label`}
        name={name}
        id="demo-simple-select"
        label={label}
        error={invalid}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};
