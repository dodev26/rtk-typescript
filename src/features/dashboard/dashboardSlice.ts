import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from 'models';

export interface DashBoardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}
export interface DashBoardState {
  loading: boolean;
  statistics: DashBoardStatistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: RankingByCity[];
}
export interface RankingByCity {
  cityId: string;
  rankingList: Student[];
}
const initialState: DashBoardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
};
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboardData: (state) => {
      state.loading = true;
    },
    fetchDashboardDataSuccess: (state) => {
      state.loading = false;
    },
    fetchDashboardDataFailed: (state, action) => {
      state.loading = false;
    },
    setStatistics: (state, action: PayloadAction<DashBoardStatistics>) => {
      state.statistics = action.payload;
    },
    setHighestStudentList: (state, action: PayloadAction<Student[]>) => {
      state.highestStudentList = action.payload;
    },
    setLowestStudentList: (state, action: PayloadAction<Student[]>) => {
      state.lowestStudentList = action.payload;
    },
    setRankingByCityList: (state, action: PayloadAction<RankingByCity[]>) => {
      state.rankingByCityList = action.payload;
    },
  },
});
export const {
  fetchDashboardData,
  fetchDashboardDataSuccess,
  fetchDashboardDataFailed,
  setStatistics,
  setHighestStudentList,
  setLowestStudentList,
  setRankingByCityList,
} = dashboardSlice.actions;
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
