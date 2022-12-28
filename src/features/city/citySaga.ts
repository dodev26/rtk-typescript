import cityApi from 'apis/cityApi';
import { City, ListResponse } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchCityList, fetchCityListFailed, fetchCityListSuccess } from './citySlice';

function* fetchCityListSaga() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll);
    yield put(fetchCityListSuccess(response));
  } catch (error) {
    yield put(fetchCityListFailed());
  }
}
export default function* citySaga() {
  yield takeLatest(fetchCityList.type, fetchCityListSaga);
}
