import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Student } from '../../../models/student';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { capitalizeString, getMarkColor } from '../../../utils/common';
import { City } from 'models';
import { useHistory, useRouteMatch } from 'react-router-dom';

export interface StudentTableProps {
  studentList: Student[] | undefined;
  loading?: boolean;
  cityMap: {
    [key: string]: City;
  };
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}
export default function StudentTable({
  studentList = [],
  loading,
  onEdit,
  onRemove,
  cityMap,
}: StudentTableProps) {
  const [open, setOpen] = React.useState(false);
  const match = useRouteMatch();
  const history = useHistory();
  const [student, setStudent] = React.useState<Student>();
  console.log(student);
  const handleSelectStudent = (student: Student) => {
    setOpen(true);
    setStudent(student);
  };
  const handleRemoveStudent = (student: Student) => {
    setOpen(false);
    onRemove?.(student);
  };
  const handleEditStudent = (student: Student) => {
    history.push(`${match.url}/${student.id}`);
  };
  return (
    <>
      <TableContainer component={Paper}>
        {loading ? <LinearProgress /> : null}
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {studentList.map((student, index) => (
              <TableRow key={student.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{capitalizeString(student.gender)}</TableCell>
                <TableCell>
                  <Box style={{ color: `${getMarkColor(student.mark)}` }}>{student.mark}</Box>
                </TableCell>
                <TableCell>{cityMap[`${student.city}`]?.name}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleSelectStudent?.(student)}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditStudent?.(student)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={() => setOpen((prev) => !prev)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}
            id="alert-dialog-description"
          >
            Do you want remove{' '}
            <Typography color="secondary" variant="h6">
              {student?.name}{' '}
            </Typography>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen((prev) => !prev)}>Disagree</Button>
          <Button onClick={() => handleRemoveStudent(student as Student)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
