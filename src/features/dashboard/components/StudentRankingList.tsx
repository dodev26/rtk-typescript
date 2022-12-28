import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Student } from '../../../models/student';
import { LinearProgress } from '@material-ui/core';

export interface StudentRankingListProps {
  studentList: Student[];
  loading?: boolean;
}
export default function StudentRankingList({ studentList = [], loading }: StudentRankingListProps) {
  return (
    <TableContainer component={Paper}>
      {loading ? <LinearProgress /> : null}
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Mark</TableCell>
          </TableRow>
        </TableHead>
        {!loading ? (
          <TableBody>
            {studentList.map((student, index) => (
              <TableRow key={student.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="left">{student.name}</TableCell>
                <TableCell align="right">{student.mark}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>
    </TableContainer>
  );
}
