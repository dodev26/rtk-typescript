import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import PeopleIcon from '@mui/icons-material/People';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { ListItemIcon } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: 'black',
    '&.active > div': {
      color: 'white',
      backgroundColor: '#1976d2',
    },
  },
}));
export default function Sidebar() {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <NavLink to="/admin/dashboard" className={classes.link}>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </NavLink>

      <NavLink to="/admin/students" className={classes.link}>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItemButton>
      </NavLink>
    </List>
  );
}
