import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models/user';

export interface AuthState {
  isLoggedIn?: boolean;
  logging?: boolean;
  currentUser?: User;
}
const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};
export interface LoginPayload {
  username: string;
  password: string;
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.logging = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.logging = false;
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.logging = false;
    },
    logout: (state) => {
      state.logging = false;
      state.currentUser = undefined;
      state.isLoggedIn = false;
    },
  },
});
//action
//useSelector
//reducer
export const { login, loginSuccess, loginFailed, logout } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
