import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';

interface WidgetProps {
  title: string;
  children: React.ReactNode;
}

const Widget = ({ title, children }: WidgetProps) => {
  return (
    <Paper>
      <Typography variant="button">{title}</Typography>
      <Box mt={2}>{children}</Box>
    </Paper>
  );
};

export default Widget;
