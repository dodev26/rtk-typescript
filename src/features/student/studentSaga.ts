import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'apis/studentApi';
import { ListParams } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import {
  fetchStudentList,
  fetchStudentListSuccess,
  fetchStudentListFailed,
  setFilterWithDebounce,
  setFilter,
} from './studentSlice';
import { ListResponse } from '../../models/common';
import { Student } from '../../models/student';

function* fetchStudentListStart(action: PayloadAction<ListParams>) {
  console.log('fetchStudentList: ', action.payload);
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list: ', error);
    yield put(fetchStudentListFailed(error));
  }
}
function* setFilterWithDebounceSaga(action: PayloadAction<ListParams>) {
  console.log(action.payload);
  yield put(setFilter(action.payload));
}
export default function* studentSaga() {
  yield takeLatest(fetchStudentList.type, fetchStudentListStart);
  yield debounce(500, setFilterWithDebounce.type, setFilterWithDebounceSaga);
}
