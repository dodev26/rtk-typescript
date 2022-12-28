import * as React from 'react';
import { Paper, makeStyles, Button, Box, Typography, CircularProgress } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { login, AuthState } from '../authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row  nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: theme.spacing(3),
  },
}));
export default function LoginPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const handleLoginClick = () => {
    dispatch(login({ username: 'abcd', password: '123' }));
  };
  const { logging } = useAppSelector((state: any) => state.auth);
  console.log('logging', logging);
  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>
        <Box pt={2}>
          <Button onClick={handleLoginClick} variant="contained" color="primary" fullWidth>
            {logging && <CircularProgress size={20} color="secondary" />} &nbsp; FAKE LOGIN
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
