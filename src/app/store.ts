import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import cityReducer from 'features/city/citySlice';

import dashboardReducer from 'features/dashboard/dashboardSlice';
import studentReducer from 'features/student/studentSlice';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  student: studentReducer,
  city: cityReducer,
});
export const store = configureStore({
  reducer,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
