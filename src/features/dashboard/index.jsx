import {
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import StatisticItem from './components/StatisticItem';
import { fetchDashboardData } from './dashboardSlice';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Widget from './components/Widget';
import StudentRankingList from './components/StudentRankingList';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));
export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { loading, statistics, highestStudentList, lowestStudentList, rankingByCityList } =
    useAppSelector((state) => state.dashboard);
  const classes = useStyles();
  console.log(rankingByCityList);
  React.useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);
  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            loading={loading}
            icon={<ManIcon />}
            label="male"
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            loading={loading}
            icon={<WomanIcon />}
            label="female"
            value={statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            loading={loading}
            icon={<TrendingUpIcon />}
            label="highMarkCount"
            value={statistics.highMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            loading={loading}
            icon={<TrendingDownIcon />}
            label="lowMarkCount"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography variant="h5">All students</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Widget title="Student with highest mark">
              <StudentRankingList loading={loading} studentList={highestStudentList} />
            </Widget>
          </Grid>
          <Grid item xs={12} md={6}>
            <Widget title="Student with lowest mark">
              <StudentRankingList loading={loading} studentList={lowestStudentList} />
            </Widget>
          </Grid>
        </Grid>
      </Box>
      <Box mt={4}>
        <Grid container spacing={3}>
          {loading ? (
            <CircularProgress />
          ) : (
            rankingByCityList.length > 0 &&
            rankingByCityList.map((item) => (
              <Grid item xs={3}>
                <Widget title={item.cityId}>
                  <StudentRankingList loading={loading} studentList={item.rankingList} />
                </Widget>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
}
