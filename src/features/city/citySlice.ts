import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, ListResponse } from 'models';

export interface CityState {
  list: City[];
  loading: boolean;
}
const initialState: CityState = {
  list: [],
  loading: false,
};
const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList: (state) => {
      state.loading = true;
    },
    fetchCityListSuccess: (state, action: PayloadAction<ListResponse<City>>) => {
      console.log(action.payload);
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCityListFailed: (state) => {
      state.loading = false;
    },
  },
});
export const selectCityList = (state: any) => state.city.list;
export const cityOptions = createSelector(selectCityList, (cityList) => {
  return cityList.map((city: any) => ({
    label: city.name,
    value: city.code,
  }));
});
export const { fetchCityList, fetchCityListSuccess, fetchCityListFailed } = citySlice.actions;
const cityReducer = citySlice.reducer;
export default cityReducer;
