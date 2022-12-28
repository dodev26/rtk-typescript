import { Box, Paper, Typography, makeStyles } from '@material-ui/core';
import { LinearProgress } from '@mui/material';

import React from 'react';

interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  loading?: boolean;
  value: string | number;
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  loading: {
    width: '100%',
  },
}));
const StatisticItem = ({ loading, icon, label, value }: StatisticItemProps) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align="right">
          {loading ? <LinearProgress className={classes.loading} /> : value}
        </Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
};

export default StatisticItem;
