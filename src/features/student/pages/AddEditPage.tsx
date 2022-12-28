import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@mui/icons-material';
import studentApi from 'apis/studentApi';
import { Student } from 'models';
import React, { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';

const AddEditPage = () => {
  const { studentId } = useParams<{ studentId: string }>();

  const [student, setStudent] = React.useState<Student>();
  const isEdit = Boolean(studentId);
  const history = useHistory();
  useEffect(() => {
    if (!studentId) return;
    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);

        setStudent(data);
      } catch (error) {
        console.log('failed to fetch');
      }
    })();
  }, [studentId]);

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;
  const handleFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }
    throw new Error('failed to add student');

    history.push('/admin/students');
  };
  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>
      <Typography variant="h6" style={{ display: 'flex', alignItems: 'center' }}>
        Add new student
      </Typography>
      {!isEdit || Boolean(student) ? (
        <StudentForm initialValues={initialValues} onSubmit={handleFormSubmit} />
      ) : null}
    </Box>
  );
};

export default AddEditPage;
