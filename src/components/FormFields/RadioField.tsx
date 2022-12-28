import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: any[];
}
export const RadioField = ({ name, control, label, disabled, options }: RadioFieldProps) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  console.log(error);
  return (
    <FormControl disabled={disabled} margin="normal" component="fieldset" error={invalid}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup {...field} name={name}>
        {options.map((option) => (
          <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
        ))}
      </RadioGroup>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};
