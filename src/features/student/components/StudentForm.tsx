import { Box, Button } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioField, SelectField } from 'components/FormFields';
import { cityOptions } from 'features/city/citySlice';

import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@material-ui/lab';
import { Student } from 'models';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useState } from 'react';

export interface StudentFormProps {
  initialValues: Student;
  onSubmit?: (formValues: Student) => void;
}
const schema = yup.object().shape({
  name: yup.string().required('Please enter name'),
  age: yup
    .number()
    .positive('Please enter a positive number')
    .min(18, 'min 18')
    .max(60, 'max 60')
    .required('Please enter age')
    .integer('please enter a number')
    .typeError('please enter a number'),
  mark: yup.number().required('Please enter mark').positive().integer(),
  city: yup.string().required('Please enter city'),
});
export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const cityListOptions = useAppSelector(cityOptions);
  const [error, setError] = useState<string>('');
  const {
    control,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const handleFormSubmit = async (formValues: Student) => {
    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField control={control} name={'name'} label="Fullname" />
        <InputField control={control} name={'age'} type="number" label="Age" />
        <InputField control={control} name={'mark'} type="number" label="Mark" />

        <RadioField
          control={control}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
          name={'gender'}
          label="Gender"
        />
        <SelectField control={control} name={'city'} label={'city'} options={cityListOptions} />
        {error && <Alert severity="error">{error}</Alert>}

        <Button color="primary" variant="contained" type="submit" disabled={isSubmitting}>
          {!!isSubmitting ? 'loading' : 'save'}
        </Button>
      </form>
    </Box>
  );
}
