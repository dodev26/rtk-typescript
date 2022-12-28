import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchDashboardData,
  fetchDashboardDataSuccess,
  setHighestStudentList,
  setLowestStudentList,
  setRankingByCityList,
  setStatistics,
} from './dashboardSlice';
import { ListResponse } from '../../models/common';
import { Student } from '../../models/student';
import studentApi from 'apis/studentApi';
import { City } from '../../models/city';
import cityApi from 'apis/cityApi';

function* fetchStatistics() {
  const responseList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);
  const statisticsList = responseList.map((x) => x.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticsList;
  yield put(setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount }));
}
function* fetchHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });
  yield put(setHighestStudentList(data));
}
function* fetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });
  yield put(setLowestStudentList(data));
}
function* fetchRankingByCityList() {
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);
  const callList = cityList.map((x) =>
    call(studentApi.getAll, { _page: 1, _limit: 5, _sort: 'mark', _order: 'desc', city: x.code })
  );
  const responseList: Array<ListResponse<Student>> = yield all(callList);
  const rankingByCityList = responseList.map((x, index) => ({
    cityId: cityList[index].code,
    rankingList: x.data,
  }));
  yield put(setRankingByCityList(rankingByCityList));
}
function* fetchDashBoardDataStart() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCityList),
    ]);
    yield put(fetchDashboardDataSuccess());
  } catch (error) {
    console.log('Failed to fetch dashboard data', error);
  }
}
export default function* dashboardSaga() {
  yield takeLatest(fetchDashboardData.type, fetchDashBoardDataStart);
}
