import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { login, LoginPayload, loginSuccess, logout } from './authSlice';

function* hanldeLogin(payload: LoginPayload) {
  yield delay(1000);
  yield console.log('handle login', payload);

  localStorage.setItem('access_token', '2620');
  yield put(loginSuccess({ id: new Date().getTime(), name: 'do' }));
}
function* handleLogout() {
  yield delay(1000);

  localStorage.removeItem('access_token');
}
function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(login.type);
      yield fork(hanldeLogin, action.payload);
    }
    yield take(logout.type);
    yield call(handleLogout);
  }
}
export default function* authSaga() {
  yield fork(watchLoginFlow);
}
